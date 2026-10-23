
import * as THREE from 'three';
import { createTerraGrass } from './terra-inspired-grass.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

(() => {
  'use strict';

  const mount = document.getElementById('scene-root');
  const statusEl = document.getElementById('status');
  const joystick = document.getElementById('joystick');
  const stick = document.getElementById('stick');
  if (!mount) return;

  const isSmallScreen = window.matchMedia('(max-width: 700px)').matches;
  const scene = new THREE.Scene();
  const skyColor = new THREE.Color(0x78d4f2);
  scene.background = skyColor;
  scene.fog = new THREE.Fog(skyColor, 48, 118);

  const camera = new THREE.PerspectiveCamera(57, window.innerWidth / window.innerHeight, 0.1, 220);
  camera.position.set(0, 5.5, 11.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: !isSmallScreen,
    powerPreference: 'high-performance'
  });

  const pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    isSmallScreen ? 1.25 : 1.7
  );

  renderer.setPixelRatio(pixelRatio);
  renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute(
    'aria-label',
    'תצוגת עולם תלת־ממדי. השתמשו במקלדת או בג׳ויסטיק כדי לזוז.'
  );
  mount.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.minDistance = 6.5;
  controls.maxDistance = 18;
  controls.minPolarAngle = 0.28;
  controls.maxPolarAngle = Math.PI / 2.05;
  controls.target.set(0, 1.1, 0);
  controls.update();

  scene.add(new THREE.HemisphereLight(0xf4fcff, 0x60905a, 1.7));
   const sun = new THREE.DirectionalLight(0xfff3d5, 2.1);
sun.position.set(-22, 38, 18);
sun.castShadow = true;
sun.shadow.mapSize.set(isSmallScreen ? 512 : 1024, isSmallScreen ? 512 : 1024);
sun.shadow.camera.left = -55;
sun.shadow.camera.right = 55;
sun.shadow.camera.top = 55;
sun.shadow.camera.bottom = -55;
sun.shadow.bias = -0.0002;
sun.shadow.normalBias = 0.03;
sun.shadow.radius = 4;
scene.add(sun);                                   
  const fill = new THREE.DirectionalLight(0xa6eaff, 0.55);
  fill.position.set(18, 12, -20);
  scene.add(fill);

  // Visible sun, moon and stars for the evolving sky.
  const sunDisc = new THREE.Mesh(
    new THREE.SphereGeometry(3.2, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xffe6a0 })
  );
  sunDisc.position.copy(sun.position).normalize().multiplyScalar(78);
  scene.add(sunDisc);

  const moonDisc = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xe4edff })
  );
  moonDisc.position.copy(sunDisc.position).negate();
  scene.add(moonDisc);

  const starCount = isSmallScreen ? 180 : 420;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    starPositions[i * 3] = Math.cos(angle) * 75;
    starPositions[i * 3 + 1] = 25 + Math.random() * 48;
    starPositions[i * 3 + 2] = Math.sin(angle) * 75;
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(starPositions, 3)
  );

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.42,
    transparent: true,
    opacity: 0,
    sizeAttenuation: false
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const daySky = new THREE.Color(0x78d4f2);
  const nightSky = new THREE.Color(0x101a3d);

  const rampTexture = new THREE.DataTexture(
    new Uint8Array([72, 150, 255]),
    3,
    1,
    THREE.RedFormat
  );
  rampTexture.magFilter = THREE.NearestFilter;
  rampTexture.minFilter = THREE.NearestFilter;
  rampTexture.generateMipmaps = false;
  rampTexture.colorSpace = THREE.NoColorSpace;
  rampTexture.needsUpdate = true;

  const toon = (color) =>
    new THREE.MeshToonMaterial({ color, gradientMap: rampTexture });

  
  const hillMat = toon(0x58b966);
  const hillLightMat = toon(0x9ddc79);
  const rockMat = toon(0x7eafc2);
  const mountainMat = toon(0x6b97b4);
  const snowMat = toon(0xe9f5e9);

  const flowerMats = [
    toon(0xffe18d),
    toon(0xff9ab1),
    toon(0xc2a6ff),
    toon(0xfff7da)
  ];

  

  const worldDecor = new THREE.Group();
  scene.add(worldDecor);

  

  
  const grassSystem = createTerraGrass(THREE, { scene, isSmallScreen });




  const sphereGeo = new THREE.SphereGeometry(1, 22, 15);

  const hillSpecs = [
    [-22, -4.1, -23, 1.9, 0.85, 1.35, hillMat],
    [20, -4.7, -29, 2.0, 1.25, 1.55, hillLightMat],
    [34, -5.1, -4, 1.5, 0.95, 1.2, hillMat],
    [-38, -5.5, -3, 1.75, 1.0, 1.35, hillLightMat],
    [-7, -5.1, -42, 2.8, 1.05, 1.0, hillMat]
  ];

  for (const spec of hillSpecs) {
    const hill = new THREE.Mesh(sphereGeo, spec[6]);
    hill.position.set(spec[0], spec[1], spec[2]);
    hill.scale.set(spec[3], spec[4], spec[5]);
    worldDecor.add(hill);
  }

  const mountainSpecs = [
    [-43, -36, 19, 10, mountainMat],
    [-29, -45, 24, 13, rockMat],
    [-12, -48, 18, 10, mountainMat],
    [8, -47, 23, 13, rockMat],
    [28, -40, 20, 11, mountainMat],
    [45, -30, 18, 10, rockMat]
  ];

  for (let i = 0; i < mountainSpecs.length; i++) {
    const m = mountainSpecs[i];

    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(m[3] * 0.48, m[3] * 1.55, 7),
      m[4]
    );

    mountain.position.set(m[0], m[3] * 0.72 - 0.1, m[1]);
    mountain.rotation.y = i * 0.37;
    worldDecor.add(mountain);

    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(m[3] * 0.18, m[3] * 0.44, 7),
      snowMat
    );

    cap.position.set(m[0] - 0.15, m[3] * 1.28, m[1] + 0.08);
    cap.rotation.y = mountain.rotation.y;
    worldDecor.add(cap);
  }

  
  const randomRange = (min, max) => min + Math.random() * (max - min);
  const trees = [];

    const barkTexture = (() => {
    
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Warm, natural bark base.
    ctx.fillStyle = '#987653';
    ctx.fillRect(0, 0, 256, 512);

    // Broad, irregular strips of bark.
    for (let i = 0; i < 75; i++) {
      const x = Math.random() * 256;
      const width = 2 + Math.random() * 12;

      ctx.strokeStyle = i % 3 === 0
        ? 'rgba(218,177,126,0.30)'
        : 'rgba(65,42,25,0.22)';
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(
        x - 12 + Math.random() * 24, 150,
        x - 10 + Math.random() * 20, 350,
        x + (Math.random() - 0.5) * 12, 512
      );
      ctx.stroke();
    }

    // Fine vertical bark grooves.
    for (let i = 0; i < 190; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 512;
      const length = 12 + Math.random() * 100;

      ctx.strokeStyle = i % 2 === 0
        ? 'rgba(48,31,20,0.42)'
        : 'rgba(231,193,145,0.32)';
      ctx.lineWidth = 0.5 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + (Math.random() - 0.5) * 7,
        Math.min(512, y + length)
      );
      ctx.stroke();
    }

    // Small irregular cracks across the bark.
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 512;

      ctx.strokeStyle = 'rgba(45,30,20,0.28)';
      ctx.lineWidth = 0.7 + Math.random();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2 + Math.random() * 5, y + 3 + Math.random() * 12);
      ctx.lineTo(x - 1 + Math.random() * 5, y + 8 + Math.random() * 16);
      ctx.stroke();
    }


    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  })();

  const trunkMaterial = new THREE.MeshStandardMaterial({
    map: barkTexture,
    color: 0xc4a080,
    roughness: 0.96
  });

  const trunkLightMaterial = new THREE.MeshStandardMaterial({
    map: barkTexture,
    color: 0x9a7656,
    roughness: 0.98
  });

  const foliageMaterials = [
    0x244d2b, 0x2f6034, 0x39743b, 0x477f40, 0x568d49
  ].map(color => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.94
  }));

    
  function makeTree(size) {
    const tree = new THREE.Group();

    // ProcTree creates the trunk and branching structure.
    const height = size * (1.25 + Math.random() * 0.18);

    if (typeof window.Tree !== 'function') {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(
      size * 0.09,
      size * 0.14,
      height * 0.58,
      8
    ),
    trunkMaterial
  );

  trunk.position.y = height * 0.29;
  trunk.castShadow = true;
  tree.add(trunk);

  const leafColors = [0x39743b, 0x477f40, 0x568d49];

  for (let i = 0; i < 3; i++) {
    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(
        size * (0.48 - i * 0.07),
        height * 0.42,
        8
      ),
      new THREE.MeshStandardMaterial({
        color: leafColors[i],
        roughness: 0.92
      })
    );

    crown.position.y = height * (0.52 + i * 0.17);
    crown.castShadow = true;
    tree.add(crown);
  }

  return tree;
}

    const seed = Math.floor(Math.random() * 100000);

    const proceduralTree = new window.Tree({
      seed,
      segments: 7,
      levels: 4,
      treeSteps: 3,
      vMultiplier: 0.22,
      twigScale: 0.24,
      initalBranchLength: 0.82,
      lengthFalloffFactor: 0.78,
      lengthFalloffPower: 1.1,
      clumpMax: 0.52,
      clumpMin: 0.32,
      branchFactor: 2.2,
      dropAmount: 0.08,
      growAmount: 0.08,
      sweepAmount: 0.12,
      maxRadius: 0.22,
      climbRate: 0.72,
      trunkKink: 0.08,
      taperRate: 0.94,
      radiusFalloffRate: 0.72,
      twistRate: 10,
      trunkLength: 2.5
    });

    const scaleX = size * 0.42;
    const scaleY = height / 2.5;
    const scaleZ = size * 0.42;

    function buildGeometry(vertices, faces, uvs) {
      const geometry = new THREE.BufferGeometry();

      const positions = [];
      for (const vertex of vertices) {
        positions.push(
          vertex[0] * scaleX,
          vertex[1] * scaleY,
          vertex[2] * scaleZ
        );
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );

      geometry.setIndex(window.Tree.flattenArray(faces));

      if (uvs && uvs.length === vertices.length) {
        const uvValues = [];
        for (const uv of uvs) {
          uvValues.push(uv[0], uv[1]);
        }

        geometry.setAttribute(
          'uv',
          new THREE.Float32BufferAttribute(uvValues, 2)
        );
      }

      geometry.computeVertexNormals();
      geometry.computeBoundingSphere();
      return geometry;
    }

    const trunkGeometry = buildGeometry(
      proceduralTree.verts,
      proceduralTree.faces,
      proceduralTree.UV
    );

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    // Create a leaf-shaped alpha texture for the procedural twig cards.
    const leafCanvas = document.createElement('canvas');
    leafCanvas.width = 64;
    leafCanvas.height = 64;

    const leafContext = leafCanvas.getContext('2d');
    leafContext.clearRect(0, 0, 64, 64);

    leafContext.save();
    leafContext.translate(32, 32);
    leafContext.rotate(-0.35);

    const leafGradient = leafContext.createLinearGradient(-20, 0, 20, 0);
    leafGradient.addColorStop(0, '#285b2e');
    leafGradient.addColorStop(0.48, '#548d43');
    leafGradient.addColorStop(1, '#8eb95b');

    leafContext.fillStyle = leafGradient;
    leafContext.beginPath();
    leafContext.moveTo(-25, 0);
    leafContext.quadraticCurveTo(-9, -17, 22, -3);
    leafContext.quadraticCurveTo(29, 0, 22, 3);
    leafContext.quadraticCurveTo(-9, 17, -25, 0);
    leafContext.fill();

    leafContext.strokeStyle = 'rgba(218,224,151,0.8)';
    leafContext.lineWidth = 1.2;
    leafContext.beginPath();
    leafContext.moveTo(-23, 0);
    leafContext.lineTo(24, 0);
    leafContext.stroke();

    leafContext.restore();

    const leafTexture = new THREE.CanvasTexture(leafCanvas);
    leafTexture.colorSpace = THREE.SRGBColorSpace;
    leafTexture.needsUpdate = true;

    const leafMaterial = new THREE.MeshStandardMaterial({
      map: leafTexture,
      color: 0xffffff,
      roughness: 0.9,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.35,
      depthWrite: true
    });

    const twigGeometry = buildGeometry(
      proceduralTree.vertsTwig,
      proceduralTree.facesTwig,
      proceduralTree.uvsTwig
    );

    const foliage = new THREE.Mesh(twigGeometry, leafMaterial);
    foliage.castShadow = true;
    foliage.receiveShadow = true;
    tree.add(foliage);

    return tree;
  }


  for (let i = 0; i < 36; i++) {
    let x = 0;
    let z = 0;

    do {
      x = randomRange(-43, 43);
      z = randomRange(-43, 42);
    } while (Math.hypot(x, z) < 7.5);

    const size = randomRange(2.9, 5.4);
    const tree = makeTree(size);

    tree.position.set(x, 0, z);
    tree.rotation.y = randomRange(0, Math.PI * 2);
tree.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});
    scene.add(tree);
    trees.push(tree);
  }


  for (let i = 0; i < 25; i++) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(randomRange(0.18, 0.42), 0),
      rockMat
    );

    let x = randomRange(-42, 42);
    let z = randomRange(-40, 40);

    if (Math.hypot(x, z) < 5.5) {
      x += x < 0 ? -9 : 9;
    }

    rock.position.set(x, -0.01, z);
    rock.scale.set(1.25, 0.65, 0.9);
    rock.rotation.set(
      randomRange(0, 0.5),
      randomRange(0, 6),
      randomRange(0, 0.4)
    );

    worldDecor.add(rock);
  }

  const stemMat = new THREE.MeshToonMaterial({ color: 0x2e9450 });

  for (let i = 0; i < 35; i++) {
    let x = randomRange(-40, 40);
    let z = randomRange(-38, 38);

    if (Math.hypot(x, z) < 4.8) continue;

    const flower = new THREE.Group();

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.035, 0.32, 5),
      stemMat
    );
    stem.position.y = 0.16;
    flower.add(stem);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 10, 8),
      flowerMats[i % flowerMats.length]
    );
    head.position.y = 0.34;
    head.scale.set(1.05, 0.8, 0.7);
    flower.add(head);

    flower.position.set(x, 0, z);
    flower.rotation.y = randomRange(0, Math.PI * 2);
    worldDecor.add(flower);
  }

  const cloudsGroup = new THREE.Group();
  scene.add(cloudsGroup);

  const cloudMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });

  const cloudGeo = new THREE.SphereGeometry(1, 14, 10);
  const clouds = [];

  for (let c = 0; c < 8; c++) {
    const cloud = new THREE.Group();
    const puffs = 4 + Math.floor(Math.random() * 3);

    for (let p = 0; p < puffs; p++) {
      const puff = new THREE.Mesh(cloudGeo, cloudMaterial);

      puff.position.set(
        (p - (puffs - 1) / 2) * 1.25,
        randomRange(-0.18, 0.25),
        randomRange(-0.15, 0.15)
      );

      const s = randomRange(0.8, 1.45);
      puff.scale.set(s * 1.35, s * 0.68, s * 0.62);
      cloud.add(puff);
    }

    cloud.position.set(
      randomRange(-50, 50),
      randomRange(12, 19),
      randomRange(-48, -10)
    );

    cloud.scale.setScalar(randomRange(0.85, 1.35));
    cloudsGroup.add(cloud);
    clouds.push(cloud);
  }

  
  // Readable birds with bodies, heads, beaks and flapping wings.
  const birds = [];
  const birdMaterial = new THREE.MeshStandardMaterial({
    color: 0x374b5d,
    roughness: 0.85
  });
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x718b9a,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const beakMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0b34f
  });

  const birdCount = isSmallScreen ? 12 : 20;

  for (let i = 0; i < birdCount; i++) {
    const bird = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 10, 8),
      birdMaterial
    );
    body.scale.set(1.35, 0.65, 0.7);
    bird.add(body);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 8),
      birdMaterial
    );
    head.position.set(0.23, 0.09, 0);
    bird.add(head);

    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.065, 0.2, 5),
      beakMaterial
    );
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.39, 0.08, 0);
    bird.add(beak);

    const wingGeometry = new THREE.ConeGeometry(0.07, 0.23, 5);

    const leftWing = new THREE.Group();
    leftWing.position.set(0, 0.1, -0.07);

    const leftFeather = new THREE.Mesh(
      wingGeometry,
      wingMaterial
    );
    leftFeather.rotation.x = -Math.PI / 2;
    leftFeather.rotation.z = -0.12;
    leftWing.add(leftFeather);
    bird.add(leftWing);

    const rightWing = new THREE.Group();
    rightWing.position.set(0, 0.1, 0.07);

    const rightFeather = new THREE.Mesh(
      wingGeometry,
      wingMaterial
    );
    rightFeather.rotation.x = Math.PI / 2;
    rightFeather.rotation.z = -0.12;
    rightWing.add(rightFeather);
    bird.add(rightWing);


    bird.position.set(
      -30 + Math.random() * 60,
      13 + Math.random() * 7,
      -18 - Math.random() * 22
    );
    bird.scale.setScalar(0.85 + Math.random() * 0.35);
    scene.add(bird);

    birds.push({
      bird,
      leftWing,
      rightWing,
      phase: Math.random() * Math.PI * 2,
      speed: 1.7 + Math.random() * 2,
      baseY: bird.position.y
    });
  }


  const monsterRoot = new THREE.Group();
  const creature = new THREE.Group();
  monsterRoot.add(creature);
  scene.add(monsterRoot);

  const bodyMat = toon(0x66d6b1);
  const bellyMat = toon(0xfff1c9);
  const leafMat = toon(0x87d95d);
  const leafDarkMat = toon(0x31965f);
  const hornMat = toon(0xffd76b);

  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xfffdf5 });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x183f46 });
  const shineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cheekMat = toon(0xff9db2);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x28534b });

  const outlineParts = [];

  function addMonsterMesh(geometry, material, position, scale, rotation) {
    const mesh = new THREE.Mesh(geometry, material);

    if (position) mesh.position.set(position[0], position[1], position[2]);
    if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
    if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);

    creature.add(mesh);
    outlineParts.push(mesh);
    return mesh;
  }

  const body = addMonsterMesh(
    new THREE.SphereGeometry(0.83, 30, 22),
    bodyMat,
    [0, 1.04, 0],
    [1.0, 1.15, 0.82]
  );

  addMonsterMesh(
    new THREE.SphereGeometry(0.48, 24, 18),
    bellyMat,
    [0, 0.87, 0.59],
    [0.94, 1.02, 0.24]
  );

  const leftFoot = addMonsterMesh(
    new THREE.SphereGeometry(0.26, 18, 12),
    leafDarkMat,
    [-0.36, 0.17, 0.18],
    [1.12, 0.64, 1.25]
  );

  const rightFoot = addMonsterMesh(
    new THREE.SphereGeometry(0.26, 18, 12),
    leafDarkMat,
    [0.36, 0.17, 0.18],
    [1.12, 0.64, 1.25]
  );

  const leftArm = addMonsterMesh(
    new THREE.SphereGeometry(0.23, 18, 12),
    bodyMat,
    [-0.73, 0.94, 0.02],
    [0.8, 1.28, 0.82],
    [0, 0, 0.52]
  );

  const rightArm = addMonsterMesh(
    new THREE.SphereGeometry(0.23, 18, 12),
    bodyMat,
    [0.73, 0.94, 0.02],
    [0.8, 1.28, 0.82],
    [0, 0, -0.52]
  );

  addMonsterMesh(
    new THREE.ConeGeometry(0.22, 0.52, 7),
    leafMat,
    [-0.49, 1.77, 0.03],
    [1, 1, 0.7],
    [0, 0, 0.34]
  );

  addMonsterMesh(
    new THREE.ConeGeometry(0.22, 0.52, 7),
    leafMat,
    [0.49, 1.77, 0.03],
    [1, 1, 0.7],
    [0, 0, -0.34]
  );

  addMonsterMesh(
    new THREE.ConeGeometry(0.095, 0.22, 7),
    hornMat,
    [-0.48, 2.02, 0.05],
    [1, 1, 0.85],
    [0, 0, 0.34]
  );

  addMonsterMesh(
    new THREE.ConeGeometry(0.095, 0.22, 7),
    hornMat,
    [0.48, 2.02, 0.05],
    [1, 1, 0.85],
    [0, 0, -0.34]
  );

  const eyeGeo = new THREE.SphereGeometry(0.175, 18, 14);

  addMonsterMesh(eyeGeo, eyeWhiteMat, [-0.29, 1.31, 0.66], [0.9, 1.25, 0.55]);
  addMonsterMesh(eyeGeo, eyeWhiteMat, [0.29, 1.31, 0.66], [0.9, 1.25, 0.55]);

  const pupilGeo = new THREE.SphereGeometry(0.087, 14, 10);

  addMonsterMesh(pupilGeo, pupilMat, [-0.265, 1.30, 0.755], [1, 1.08, 0.65]);
  addMonsterMesh(pupilGeo, pupilMat, [0.315, 1.30, 0.755], [1, 1.08, 0.65]);

  const shineGeo = new THREE.SphereGeometry(0.033, 10, 8);

  addMonsterMesh(shineGeo, shineMat, [-0.29, 1.35, 0.80], [1, 1, 0.5]);
  addMonsterMesh(shineGeo, shineMat, [0.29, 1.35, 0.80], [1, 1, 0.5]);

  addMonsterMesh(
    new THREE.SphereGeometry(0.115, 14, 10),
    cheekMat,
    [-0.53, 1.04, 0.60],
    [1.15, 0.63, 0.42]
  );

  addMonsterMesh(
    new THREE.SphereGeometry(0.115, 14, 10),
    cheekMat,
    [0.53, 1.04, 0.60],
    [1.15, 0.63, 0.42]
  );

  const mouthCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.09, 0.98, 0.805),
    new THREE.Vector3(0, 0.92, 0.825),
    new THREE.Vector3(0.09, 0.98, 0.805)
  ]);

  addMonsterMesh(
    new THREE.TubeGeometry(mouthCurve, 10, 0.018, 6, false),
    mouthMat,
    null,
    null,
    null
  );

  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.53, 0.72, -0.35),
    new THREE.Vector3(0.87, 0.73, -0.70),
    new THREE.Vector3(0.82, 1.02, -1.04)
  ]);

  addMonsterMesh(
    new THREE.TubeGeometry(tailCurve, 18, 0.075, 7, false),
    leafDarkMat,
    null,
    null,
    null
  );

  addMonsterMesh(
    new THREE.SphereGeometry(0.18, 16, 12),
    leafMat,
    [0.82, 1.05, -1.06],
    [0.72, 1.42, 0.38],
    [0, 0, -0.48]
  );

  const initialPosition = new THREE.Vector3(0, 0, 0);
  monsterRoot.position.copy(initialPosition);

  const moveSpeed = 6.1;
  const keys = new Set();
  const joystickState = { active: false, x: 0, y: 0, pointerId: null };

  const vectorForward = new THREE.Vector3();
  const vectorRight = new THREE.Vector3();
  const movement = new THREE.Vector3();
  const target = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);

  const clock = new THREE.Clock();
  let elapsed = 0;

  function keyName(key) {
    return String(key || '').toLowerCase();
  }

  const moveKeys = new Set([
    'w', 'a', 's', 'd',
    'arrowup', 'arrowdown', 'arrowleft', 'arrowright'
  ]);

  window.addEventListener('keydown', (event) => {
    const k = keyName(event.key);

    if (moveKeys.has(k)) {
      keys.add(k);
      event.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('keyup', (event) => keys.delete(keyName(event.key)));
  window.addEventListener('blur', () => keys.clear());

  function resetStick() {
    joystickState.active = false;
    joystickState.pointerId = null;
    joystickState.x = 0;
    joystickState.y = 0;
    stick.style.transform = 'translate(-50%,-50%)';
  }

  function updateStick(event) {
    const rect = joystick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const max = rect.width * 0.31;

    let dx = event.clientX - cx;
    let dy = event.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist > max) {
      dx = dx / dist * max;
      dy = dy / dist * max;
    }

    joystickState.x = THREE.MathUtils.clamp(dx / max, -1, 1);
    joystickState.y = THREE.MathUtils.clamp(dy / max, -1, 1);

    stick.style.transform =
      'translate(calc(-50% + ' + dx + 'px),calc(-50% + ' + dy + 'px))';
  }

  joystick.addEventListener('pointerdown', (event) => {
    joystickState.active = true;
    joystickState.pointerId = event.pointerId;
    joystick.setPointerCapture(event.pointerId);
    updateStick(event);
    event.preventDefault();
  });

  joystick.addEventListener('pointermove', (event) => {
    if (joystickState.active && event.pointerId === joystickState.pointerId) {
      updateStick(event);
    }
  });

  joystick.addEventListener('pointerup', (event) => {
    if (event.pointerId === joystickState.pointerId) resetStick();
  });

  joystick.addEventListener('pointercancel', resetStick);
  joystick.addEventListener('lostpointercapture', resetStick);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  );

  outlinePass.edgeStrength = 2.2;
  outlinePass.edgeGlow = 0.12;
  outlinePass.edgeThickness = 1.1;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set('#204e42');
  outlinePass.hiddenEdgeColor.set('#2f6a55');
  outlinePass.selectedObjects = [monsterRoot];
  composer.addPass(outlinePass);

  const fxaa = new ShaderPass(FXAAShader);

  fxaa.uniforms.resolution.value.set(
    1 / (window.innerWidth * pixelRatio),
    1 / (window.innerHeight * pixelRatio)
  );

  composer.addPass(fxaa);

  function updateMovement(dt) {
    const forwardInput =
      (keys.has('w') || keys.has('arrowup') ? 1 : 0) -
      (keys.has('s') || keys.has('arrowdown') ? 1 : 0) -
      joystickState.y;

    const sideInput =
      (keys.has('d') || keys.has('arrowright') ? 1 : 0) -
      (keys.has('a') || keys.has('arrowleft') ? 1 : 0) +
      joystickState.x;

    camera.getWorldDirection(vectorForward);
    vectorForward.y = 0;

    if (vectorForward.lengthSq() < 0.0001) {
      vectorForward.set(0, 0, -1);
    }

    vectorForward.normalize();
    vectorRight.crossVectors(vectorForward, worldUp).normalize();

    movement.set(0, 0, 0)
      .addScaledVector(vectorForward, forwardInput)
      .addScaledVector(vectorRight, sideInput);

    if (movement.lengthSq() > 1) movement.normalize();

    const isMoving = movement.lengthSq() > 0.001;

    if (isMoving) {
      monsterRoot.position.addScaledVector(movement, moveSpeed * dt);

      monsterRoot.position.x = THREE.MathUtils.clamp(
        monsterRoot.position.x, -48, 48
      );

      monsterRoot.position.z = THREE.MathUtils.clamp(
        monsterRoot.position.z, -48, 45
      );

      const desiredYaw = Math.atan2(movement.x, movement.z);

      const yawDelta = Math.atan2(
        Math.sin(desiredYaw - creature.rotation.y),
        Math.cos(desiredYaw - creature.rotation.y)
      );

      creature.rotation.y += yawDelta * (1 - Math.exp(-9 * dt));
    }

    const walk = elapsed * 12;

    creature.position.y = isMoving
      ? 0.025 + Math.abs(Math.sin(walk)) * 0.09
      : 0.035 + Math.sin(elapsed * 2.4) * 0.045;

    body.scale.y =
      1.15 * (1 + Math.sin(elapsed * (isMoving ? 10 : 3)) *
      (isMoving ? 0.035 : 0.025));

    leftFoot.rotation.x = isMoving
      ? Math.sin(walk) * 0.30
      : Math.sin(elapsed * 2) * 0.035;

    rightFoot.rotation.x = isMoving
      ? -Math.sin(walk) * 0.30
      : -Math.sin(elapsed * 2) * 0.035;

    leftArm.rotation.z = 0.52 +
      (isMoving ? Math.sin(walk) * 0.12 : Math.sin(elapsed * 2) * 0.025);

    rightArm.rotation.z = -0.52 -
      (isMoving ? Math.sin(walk) * 0.12 : Math.sin(elapsed * 2) * 0.025);

    target.set(
      monsterRoot.position.x,
      monsterRoot.position.y + 1.1,
      monsterRoot.position.z
    );

    controls.target.lerp(target, 1 - Math.exp(-5.5 * dt));
  }

  function animate() {
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.04);
    elapsed += dt;

    updateMovement(dt);

    // Smooth day-night cycle.
    const cycle = (elapsed % 240) / 240;
    const night = (1 - Math.cos(cycle * Math.PI * 2)) / 2;

    skyColor.copy(daySky).lerp(nightSky, night);
    scene.fog.color.copy(skyColor);

    sun.intensity = 2.1 * (1 - night * 0.92);
    fill.intensity = 0.55 * (1 - night * 0.65);

    sunDisc.position.set(
      Math.cos(cycle * Math.PI * 2) * 65,
      18 + Math.sin(cycle * Math.PI * 2) * 38,
      18
    );

    moonDisc.position.copy(sunDisc.position).negate();
    starMaterial.opacity = night * 0.95;

    
    // Animate birds flying across the sky.
    for (const item of birds) {
      item.bird.position.x += dt * item.speed;

      if (item.bird.position.x > 45) {
        item.bird.position.x = -45;
      }

      const flap = Math.sin(elapsed * 8 + item.phase);

      item.leftWing.rotation.x = flap * 0.8;
      item.rightWing.rotation.x = -flap * 0.8;

      item.bird.position.y =
        item.baseY + Math.sin(elapsed * 2 + item.phase) * 0.45;
    }

    for (let i = 0; i < clouds.length; i++) {
      const cloud = clouds[i];

      cloud.position.x += dt * (0.22 + (i % 4) * 0.075);

      if (cloud.position.x > 58) {
        cloud.position.x = -58;
      }

      cloud.position.y += Math.sin(elapsed * 0.35 + i) * dt * 0.04;
    }

    controls.update();
    grassSystem.update(elapsed, sun.intensity, camera.position, monsterRoot.position, sun.position);
    renderer.render(scene, camera);
  }

  function resize() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);

    fxaa.uniforms.resolution.value.set(
      1 / (width * pixelRatio),
      1 / (height * pixelRatio)
    );
  }

  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) clock.getDelta();
  });

  if (statusEl) {
    statusEl.textContent = 'העולם מוכן · זוזו, הסתובבו וגלו את היער';
  }

  animate();
})();
