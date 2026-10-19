
import * as THREE from 'three';
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
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xa6eaff, 0.55);
  fill.position.set(18, 12, -20);
  scene.add(fill);

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

  const grassMat = toon(0x77d86b);
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

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(116, 116, 1, 1),
    grassMat
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.08;
  scene.add(ground);

  const worldDecor = new THREE.Group();
  scene.add(worldDecor);

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

  function makeTreeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 320;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 256, 320);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#28543c';
    ctx.lineWidth = 9;

    ctx.beginPath();
    ctx.moveTo(128, 296);
    ctx.lineTo(128, 177);
    ctx.stroke();

    ctx.fillStyle = '#875d43';
    ctx.beginPath();
    ctx.moveTo(112, 296);
    ctx.lineTo(113, 206);
    ctx.quadraticCurveTo(128, 194, 143, 206);
    ctx.lineTo(145, 296);
    ctx.closePath();
    ctx.fill();

    const tiers = [
      { x: 128, y: 58, r: 63, c: '#2e8656', edge: '#245e43' },
      { x: 91, y: 105, r: 62, c: '#43a65e', edge: '#2c7c4d' },
      { x: 164, y: 109, r: 61, c: '#50b769', edge: '#2c7c4d' },
      { x: 128, y: 151, r: 72, c: '#348e55', edge: '#245e43' },
      { x: 77, y: 155, r: 42, c: '#61c971', edge: '#347f4b' },
      { x: 178, y: 157, r: 43, c: '#5dc56b', edge: '#347f4b' }
    ];

    for (const t of tiers) {
      ctx.fillStyle = t.c;
      ctx.strokeStyle = t.edge;
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#d0f39a99';
      ctx.beginPath();
      ctx.ellipse(
        t.x - t.r * 0.23,
        t.y - t.r * 0.3,
        t.r * 0.25,
        t.r * 0.12,
        -0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  const treeTexture = makeTreeTexture();
  treeTexture.colorSpace = THREE.SRGBColorSpace;

  const treeMaterial = new THREE.SpriteMaterial({
    map: treeTexture,
    transparent: true,
    alphaTest: 0.04,
    depthWrite: false
  });

  const randomRange = (min, max) => min + Math.random() * (max - min);
  const trees = [];

  for (let i = 0; i < 36; i++) {
    const sprite = new THREE.Sprite(treeMaterial);
    let x = 0;
    let z = 0;

    do {
      x = randomRange(-43, 43);
      z = randomRange(-43, 42);
    } while (Math.hypot(x, z) < 7.5);

    sprite.position.set(x, 0.02, z);
    sprite.center.set(0.5, 0);

    const size = randomRange(2.9, 5.4);
    sprite.scale.set(size * 0.82, size, 1);
    sprite.material = treeMaterial;

    scene.add(sprite);
    trees.push(sprite);
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
  const worldUp = new THREE.Vector3();

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

    for (let i = 0; i < clouds.length; i++) {
      const cloud = clouds[i];

      cloud.position.x += dt * (0.22 + (i % 4) * 0.075);

      if (cloud.position.x > 58) {
        cloud.position.x = -58;
      }

      cloud.position.y += Math.sin(elapsed * 0.35 + i) * dt * 0.04;
    }

    controls.update();
    composer.render();
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
