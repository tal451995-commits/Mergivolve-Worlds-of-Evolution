/*
 * Terra-inspired grass renderer for Mergivolve.
 *
 * This adaptation follows the rendering concepts in Terra by Mike Linkovich:
 * curved multi-segment blades, per-vertex two-sided lighting, base occlusion,
 * subtle specular response, irregular height variation, and wind animation.
 * The MIT-licensed Terra grass implementation and shader are credited here:
 * https://github.com/spacejack/terra
 * Copyright (c) 2016-2017 Mike Linkovich (MIT-licensed source portions).
 *
 * This file is an adaptation for Three.js r170 and Mergivolve's Y-up world.
 *
 * MIT License notice for the adapted MIT-licensed Terra source portions:
 * Copyright (c) 2016-2017 Mike Linkovich
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const BLADE_SEGMENTS = 3;
const VERTS_PER_SIDE = (BLADE_SEGMENTS + 1) * 2; // two vertices per segment row
const VERTS_PER_BLADE = VERTS_PER_SIDE * 2;      // front and back
const INDICES_PER_BLADE = BLADE_SEGMENTS * 12;
const BLADES_PER_TUFT = 3;

const GRASS_PALETTE = [
  0x5f9f3a,
  0x6cac42,
  0x77b947,
  0x83c64e,
  0x6fae3c,
  0x8bc957,
  0x589637,
  0x79bf49,
  0x69a83c
];

/** Stable random generator so the field does not reshuffle on every reload. */
function makeRandom(seed) {
  let state = seed >>> 0;
  return function random() {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createGroundTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available for the grass texture.');

  const random = makeRandom(0x4D455247);
  ctx.fillStyle = '#78b84a';
  ctx.fillRect(0, 0, 512, 512);

  // Fine, overlapping color flecks become a seamless-looking grass carpet
  // when repeated under the geometry. They are deliberately low contrast.
  const fleckColors = [
    'rgba(48,104,31,0.18)',
    'rgba(61,125,35,0.15)',
    'rgba(156,205,81,0.20)',
    'rgba(187,218,103,0.12)',
    'rgba(88,151,43,0.16)',
    'rgba(226,231,137,0.07)'
  ];

  for (let i = 0; i < 12500; i++) {
    const x = random() * 512;
    const y = random() * 512;
    const length = 1 + random() * 5.5;
    const width = 0.5 + random() * 1.8;
    const angle = random() * Math.PI;
    const color = fleckColors[Math.floor(random() * fleckColors.length)];
    const copiesX = [0];
    const copiesY = [0];
    if (x < 7) copiesX.push(512);
    if (x > 505) copiesX.push(-512);
    if (y < 7) copiesY.push(512);
    if (y > 505) copiesY.push(-512);
    for (const dx of copiesX) {
      for (const dy of copiesY) {
        ctx.save();
        ctx.translate(x + dx, y + dy);
        ctx.rotate(angle);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, length, width, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Very subtle noise prevents large, flat color areas without using an image asset.
  for (let i = 0; i < 3200; i++) {
    const x = random() * 512;
    const y = random() * 512;
    const color = random() > 0.5
      ? 'rgba(34,83,24,0.06)'
      : 'rgba(225,239,151,0.05)';
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    if (x > 511) ctx.fillRect(x - 512, y, 1, 1);
    if (y > 511) ctx.fillRect(x, y - 512, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 18);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

const VERTEX_SHADER = /* glsl */ `
precision highp float;

#define BLADE_SEGMENTS 3.0
#define VERTS_PER_SIDE ((BLADE_SEGMENTS + 1.0) * 2.0)

attribute float aVertexIndex;
attribute float aBladeIndex;
attribute vec4 aTuftOffset; // world X, world Z, stable random seed, wind phase
attribute vec3 aTuftColor;

uniform float uTime;
uniform float uGroundY;
uniform float uPatchSize;
uniform vec2 uDrawPosition;
uniform vec3 uLightDirection;

varying vec3 vBladeColor;
varying vec3 vBladeNormal;
varying vec3 vWorldPosition;
varying float vHeightAlongBlade;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

// Smooth coherent value noise makes irregular height clumps, rather than a
// repeating sinusoidal pattern. Coordinates are world-space and stay stable
// as the grass patch wraps around the player.
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(cell);
  float b = hash21(cell + vec2(1.0, 0.0));
  float c = hash21(cell + vec2(0.0, 1.0));
  float d = hash21(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  float vertexInBlade = mod(aVertexIndex, float(VERTS_PER_SIDE));
  float row = floor(vertexInBlade / 2.0);
  float heightPct = row / float(BLADE_SEGMENTS);
  float side = floor(aVertexIndex / float(VERTS_PER_SIDE));
  float edge = mod(vertexInBlade, 2.0);

  float seed = aTuftOffset.z * 71.73 + aBladeIndex * 19.19;
  float localX = (hash11(seed + 1.7) - 0.5) * 0.19;
  float localZ = (hash11(seed + 3.1) - 0.5) * 0.19;
  // Recycle a square grass patch around the moving monster, as Terra does,
  // so density stays useful without filling the entire world with millions of blades.
  vec2 patchOffset = floor((uDrawPosition - aTuftOffset.xy) / uPatchSize)
                   * uPatchSize + uPatchSize * 0.5;
  vec2 baseXZ = aTuftOffset.xy + patchOffset + vec2(localX, localZ);
  float edgeDistance = max(abs(baseXZ.x), abs(baseXZ.y));
  float worldEdgeFade = 1.0 - smoothstep(53.5, 57.0, edgeDistance);

  // Natural density variation: leave irregular patches of visible ground.
  float densityNoise = valueNoise(baseXZ * 0.31 + vec2(17.0, -9.0));
  if (densityNoise < 0.22) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Keep a small, clear area around the moving monster's feet.
  float playerDistance = length(baseXZ - uDrawPosition);
  float footClear = smoothstep(0.55, 1.15, playerDistance);
  if (footClear < 0.04) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  float clumpWave = smoothstep(0.20, 0.82, valueNoise(baseXZ * 0.24));
  float clumpHeight = mix(0.82, 1.10, clumpWave);
  
  float bladeHeight = mix(0.17, 0.36, pow(hash11(seed + 5.4), 1.35)) * clumpHeight * worldEdgeFade * footClear;
  float bladeWidth = mix(0.027, 0.047, hash11(seed + 7.2)) * worldEdgeFade * footClear;

  
  float yaw = hash11(seed + 9.9) * 6.28318530718;
  float lean = mix(0.025, 0.075, hash11(seed + 11.6));
  float curve = mix(0.055, 0.135, hash11(seed + 13.8));

  // A shared, directional wave plus a smaller irregular oscillation.
  float phase = aTuftOffset.w + hash11(seed + 15.2) * 6.28318530718;
  float broadWind = sin(uTime * 1.22 + baseXZ.x * 0.105 + baseXZ.y * 0.072 + phase) * 0.075;
  float fineWind = sin(uTime * 2.15 + baseXZ.y * 0.31 + phase * 1.7) * 0.022;
  float windBend = broadWind + fineWind;

  // Terra-style tapered, segmented blade. The vertical axis is Y in Mergivolve.
  float taper = 1.0 - pow(heightPct, 2.8);
  float widthX = bladeWidth * (edge - 0.5) * taper;
  float bend = lean * heightPct + (curve + windBend) * heightPct * heightPct;
  float bendSlope = lean + 2.0 * (curve + windBend) * heightPct;

  float c = cos(yaw);
  float s = sin(yaw);
  vec2 bladeXZ = vec2(
    widthX * c + bend * s,
    -widthX * s + bend * c
  );

  vec3 worldPosition = vec3(
    baseXZ.x + bladeXZ.x,
    uGroundY + bladeHeight * heightPct,
    baseXZ.y + bladeXZ.y
  );

  // Simulates the translucent response of thin grass blades: both faces keep
  // some light, while the base receives gentle occlusion instead of black shade.
  vec3 bladeNormal = normalize(vec3(s, -bendSlope, c));
  if (side > 0.5) bladeNormal = -bladeNormal;

  float instanceTint = 0.91 + hash11(seed + 21.0) * 0.15;
  float bladeTint = 0.94 + hash11(seed + 27.0) * 0.12;
  vBladeColor = aTuftColor * instanceTint * bladeTint;
  vBladeNormal = bladeNormal;
  vWorldPosition = worldPosition;
  vHeightAlongBlade = heightPct;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform float uSunStrength;

varying vec3 vBladeColor;
varying vec3 vBladeNormal;
varying vec3 vWorldPosition;
varying float vHeightAlongBlade;

void main() {
  vec3 normal = normalize(vBladeNormal);
  vec3 lightDir = normalize(uLightDirection);
  vec3 viewDir = normalize(uCameraPosition - vWorldPosition);

  // Absolute diffuse term is intentional: thin leaves transmit light through
  // their back faces instead of going almost black when the camera rotates.
  float diffuse = 0.64 + 0.36 * abs(dot(normal, lightDir));
  float baseOcclusion = mix(0.76, 1.0, smoothstep(0.0, 0.72, vHeightAlongBlade));
  float daylight = 0.78 + 0.22 * clamp(uSunStrength, 0.0, 1.0);

  vec3 halfVector = normalize(lightDir + viewDir);
  float specular = pow(max(dot(normal, halfVector), 0.0), 18.0) * 0.045;

  float tipLight = mix(0.90, 1.08, smoothstep(0.04, 1.0, vHeightAlongBlade));
  vec3 color = vBladeColor * diffuse * baseOcclusion * daylight * tipLight;
  color += vec3(0.24, 0.30, 0.10) * specular;

  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/**
 * Add a textured grass-covered ground and Terra-inspired curved grass blades.
 * This is an adaptation for the current flat, Y-up Mergivolve world, not the
 * full Terra terrain renderer. The caller should invoke update() each frame.
 */
export function createTerraGrass(THREE, { scene, isSmallScreen = false }) {
  if (!THREE || !scene) {
    throw new TypeError('createTerraGrass requires THREE and scene.');
  }

  const groundY = -0.08;
  const random = makeRandom(isSmallScreen ? 0x4D4F4249 : 0x54455252);
  const groundTexture = createGroundTexture(THREE);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    color: 0xffffff,
    roughness: 0.98,
    metalness: 0,
    side: THREE.FrontSide
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(116, 116), groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = groundY;
  // Do not cast hard, isolated tree shadows on a surface whose individual
  // blades use shader lighting; keeping this layer shadow-free avoids a mismatch.
  ground.receiveShadow = false;
  ground.userData.mergivolveGrassGround = true;
  scene.add(ground);

  // Keep the phone preset close to Terra's light/mobile budgets.
  // Three blades per tuft balance a natural clumped look with draw cost.
  const tuftCount = isSmallScreen ? 16000 : 32000;
  const patchRadius = 35;
  const patchSize = patchRadius * 2;
  const vertexCount = BLADES_PER_TUFT * VERTS_PER_BLADE;
  const vertexIndices = new Float32Array(vertexCount);
  const bladeIndices = new Float32Array(vertexCount);
  const indexArray = new Uint16Array(BLADES_PER_TUFT * INDICES_PER_BLADE);

  let writeIndex = 0;
  for (let blade = 0; blade < BLADES_PER_TUFT; blade++) {
    const vertexBase = blade * VERTS_PER_BLADE;
    for (let v = 0; v < VERTS_PER_BLADE; v++) {
      vertexIndices[vertexBase + v] = v;
      bladeIndices[vertexBase + v] = blade;
    }

    for (let side = 0; side < 2; side++) {
      for (let segment = 0; segment < BLADE_SEGMENTS; segment++) {
        const a = vertexBase + side * VERTS_PER_SIDE + segment * 2;
        if (side === 0) {
          indexArray[writeIndex++] = a;
          indexArray[writeIndex++] = a + 1;
          indexArray[writeIndex++] = a + 2;
          indexArray[writeIndex++] = a + 2;
          indexArray[writeIndex++] = a + 1;
          indexArray[writeIndex++] = a + 3;
        } else {
          indexArray[writeIndex++] = a + 2;
          indexArray[writeIndex++] = a + 1;
          indexArray[writeIndex++] = a;
          indexArray[writeIndex++] = a + 3;
          indexArray[writeIndex++] = a + 1;
          indexArray[writeIndex++] = a + 2;
        }
      }
    }
  }

  const tuftOffsets = new Float32Array(tuftCount * 4);
  const tuftColors = new Float32Array(tuftCount * 3);
  const columnCount = Math.ceil(Math.sqrt(tuftCount));
  const spacing = patchSize / columnCount;

  const paletteColors = GRASS_PALETTE.map(hex => new THREE.Color(hex));
  for (let i = 0; i < tuftCount; i++) {
    const column = i % columnCount;
    const row = Math.floor(i / columnCount);
    const x = -patchRadius + (column + 0.12 + random() * 0.76) * spacing;
    const z = -patchRadius + (row + 0.12 + random() * 0.76) * spacing;
    tuftOffsets[i * 4] = x;
    tuftOffsets[i * 4 + 1] = z;
    tuftOffsets[i * 4 + 2] = random();
    tuftOffsets[i * 4 + 3] = random() * Math.PI * 2;

    const selected = paletteColors[Math.floor(random() * paletteColors.length)];
    tuftColors[i * 3] = selected.r;
    tuftColors[i * 3 + 1] = selected.g;
    tuftColors[i * 3 + 2] = selected.b;
  }

  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('aVertexIndex', new THREE.BufferAttribute(vertexIndices, 1));
  geometry.setAttribute('aBladeIndex', new THREE.BufferAttribute(bladeIndices, 1));
  geometry.setAttribute('aTuftOffset', new THREE.InstancedBufferAttribute(tuftOffsets, 4));
  geometry.setAttribute('aTuftColor', new THREE.InstancedBufferAttribute(tuftColors, 3));
  geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));
  geometry.instanceCount = tuftCount;
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1000);

  const uniforms = {
    uTime: { value: 0 },
    uGroundY: { value: groundY + 0.006 },
    uPatchSize: { value: patchSize },
    uDrawPosition: { value: new THREE.Vector2(0, 0) },
    uLightDirection: { value: new THREE.Vector3(-22, 38, 18).normalize() },
    uCameraPosition: { value: new THREE.Vector3(0, 5.5, 11.5) },
    uSunStrength: { value: 1 }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    side: THREE.FrontSide,
    depthWrite: true,
    depthTest: true,
    transparent: false,
    toneMapped: true
  });

  const grass = new THREE.Mesh(geometry, material);
  grass.frustumCulled = false;
  grass.castShadow = false;
  grass.receiveShadow = false;
  grass.userData.mergivolveTerraGrass = true;
  scene.add(grass);

  return {
    ground,
    grass,
    update(time, sunIntensity = 2.1, cameraPosition, playerPosition, lightPosition) {
      uniforms.uTime.value = time;
      uniforms.uSunStrength.value = Math.min(1, Math.max(0, sunIntensity / 2.1));
      if (cameraPosition) uniforms.uCameraPosition.value.copy(cameraPosition);
      if (playerPosition) uniforms.uDrawPosition.value.set(playerPosition.x, playerPosition.z);
      if (lightPosition) uniforms.uLightDirection.value.copy(lightPosition).normalize();
    }
  };
}

export const TERRA_GRASS_ATTRIBUTION =
  'Grass rendering concepts adapted from Terra by Mike Linkovich: https://github.com/spacejack/terra. MIT-licensed source portions are credited in this file.';
