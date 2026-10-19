import * as THREE from 'three';

const { WORLDS, buildWorld } = (() => {
const WORLDS = {
  verdant: { name:'Verdant Wilds', sky:0x9dbeb0, fog:0x8da99a, ground:0x496d56, groundLight:0x6c8e61, stone:0x687e70, stoneLight:0x9aac8b, accent:0xcaf28b, water:0x71d4df, ambient:0xdaf6e6, sun:0xffe3b6, mood:'A hidden sanctuary where young creatures first awaken.' },
  tidal: { name:'Tidal Kingdom', sky:0x5d9da9, fog:0x528995, ground:0x176a7d, groundLight:0x45b4bd, stone:0x427f8d, stoneLight:0x85ced1, accent:0x9cf4ed, water:0x59d8ed, ambient:0xc7f8ff, sun:0xb8f9ff, mood:'A luminous realm of ancient reefs and ocean spirits.' },
  crystal: { name:'Crystal Dunes', sky:0xe7ad87, fog:0xc98e77, ground:0xb77e56, groundLight:0xe6bd7b, stone:0xa46c64, stoneLight:0xf2d3a0, accent:0x91fff0, water:0x63b9d5, ambient:0xffdfc1, sun:0xffc17b, mood:'Sunlit dunes hide the memory of crystal giants.' },
  sky: { name:'Skybound Isles', sky:0x92c6e5, fog:0x9fc8dc, ground:0x568c93, groundLight:0x9ac6a9, stone:0x718e9b, stoneLight:0xc9e2d5, accent:0xf7efa6, water:0x8ce4e9, ambient:0xe1f4ff, sun:0xfff0c6, mood:'Floating gardens drift between clouds and ancient ruins.' },
  ancient: { name:'Ancient Lumina', sky:0x8c91b8, fog:0x7b7b9a, ground:0x474961, groundLight:0x7a7692, stone:0x6b6c84, stoneLight:0xc0ac9b, accent:0xe5c3ff, water:0x87d6d1, ambient:0xdad4ff, sun:0xffdab5, mood:'A forgotten city hums with old magic and sleeping guardians.' }
};

const mat = (color, roughness=0.86, metalness=0) => new THREE.MeshStandardMaterial({color, roughness, metalness});
function makeMesh(geo, material, parent, pos, scale, rot){
  const m = new THREE.Mesh(geo, material); if(pos) m.position.set(...pos); if(scale) m.scale.set(...scale); if(rot) m.rotation.set(...rot); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function torus(parent, radius, tube, material, y, sx=1, sz=1){return makeMesh(new THREE.TorusGeometry(radius,tube,10,96),material,parent,[0,y,0],[sx,1,sz],[Math.PI/2,0,0]);}
function addTree(g, x,z, s, world, idx){
  const trunk=mat(world.id==='tidal'?0x4d8791:world.id==='crystal'?0x8a5b45:world.id==='ancient'?0x55516d:0x735b43);
  const foliage=mat(world.id==='tidal'?[0x3fbdc8,0x56d9d1,0x66abbc][idx%3]:world.id==='crystal'?[0x799f8a,0x9bb58e,0xc0ab85][idx%3]:world.id==='ancient'?[0x596b85,0x6c789b,0x777a9d][idx%3]:[0x477e5c,0x609967,0x8cba78][idx%3]);
  const t=makeMesh(new THREE.CylinderGeometry(.12*s,.22*s,1.15*s,9),trunk,g,[x,.53*s,z],[1,1,1],[0,0,0]);
  t.rotation.z=(idx%2?-.1:.08);
  for(let k=0;k<5;k++){const a=(k/5)*Math.PI*2;const r=(.25+(k%2)*.08)*s;makeMesh(new THREE.IcosahedronGeometry(.46*s,2),foliage,g,[x+Math.cos(a)*r,1.2*s+(k%3)*.13*s,z+Math.sin(a)*r],[1.05,.95,1],null);}
  makeMesh(new THREE.IcosahedronGeometry(.5*s,2),foliage,g,[x,1.55*s,z],[1.1,1.05,1.05],null);
}
function addCrystal(g,x,y,z,s,color){
  const c=mat(color,.28,.16); const core=makeMesh(new THREE.OctahedronGeometry(s,1),c,g,[x,y,z],[.72,1.55,.72],[0,.2,Math.random()*.25]);
  const shard=makeMesh(new THREE.OctahedronGeometry(s*.62,0),mat(0xdafcf0,.25,.18),g,[x+s*.42,y+s*.4,z+s*.1],[.48,1.15,.5],[.2,0,-.3]);
  core.userData.floatOffset=Math.random()*6; core.userData.floatBaseY=y; shard.userData.floatOffset=Math.random()*6; shard.userData.floatBaseY=y+s*.4;
}
function addRuins(g, world){
  const stone=mat(world.stoneLight,.87,.03); const accent=mat(world.accent,.38,.15);
  for(let i=0;i<7;i++){
    const a=(i/7)*Math.PI*2, r=3.8+(i%2)*.35, h=1.15+(i%3)*.32;
    const x=Math.cos(a)*r,z=Math.sin(a)*r;
    makeMesh(new THREE.CylinderGeometry(.24,.32,h,8),stone,g,[x,h/2-.05,z],null,[0,a*.2,0]);
    makeMesh(new THREE.CylinderGeometry(.34,.34,.12,8),accent,g,[x,h-.03,z],null,[0,a*.2,0]);
    if(i%2===0)makeMesh(new THREE.BoxGeometry(.8,.14,.22),stone,g,[x, h+.1,z],[1,1,1],[0,a,0]);
  }
}
function addWorldDetails(g, world){
  const id=world.id;
  if(id==='verdant'){
    for(let i=0;i<13;i++){const a=i*2.399, r=3.6+(i%4)*.42; addTree(g,Math.cos(a)*r,Math.sin(a)*r,.68+(i%4)*.12,world,i);}
    const mushroom=mat(0xff8f94,.72); const stem=mat(0xf1e9cf,.8);
    for(let i=0;i<9;i++){const a=i*2.4,r=2.8+(i%3)*.45,x=Math.cos(a)*r,z=Math.sin(a)*r;makeMesh(new THREE.CylinderGeometry(.035,.05,.18,8),stem,g,[x,.12,z]);makeMesh(new THREE.SphereGeometry(.14,16,10,0,Math.PI*2,0,Math.PI/2),mushroom,g,[x,.22,z],[1.2,.75,1.2]);}
    for(let i=0;i<5;i++) addCrystal(g, -3.3+i*.25,.45,-1.7-i*.2, .22,world.accent);
  } else if(id==='tidal'){
    for(let i=0;i<15;i++){const a=i*2.4,r=3.3+(i%3)*.65,x=Math.cos(a)*r,z=Math.sin(a)*r;makeMesh(new THREE.ConeGeometry(.23+(i%3)*.05,.95+(i%4)*.2,7),mat([0x3e9f9e,0x57c2be,0x527ca7][i%3]),g,[x,.48,z],[1,1,1],[0,a,0]);}
    for(let i=0;i<7;i++)addCrystal(g,Math.cos(i*2.1)*3.5,.5,Math.sin(i*2.1)*3.5,.27,world.accent);
    const bubbles=new THREE.Group();g.add(bubbles); for(let i=0;i<32;i++)makeMesh(new THREE.SphereGeometry(.025+(i%3)*.018,8,6),new THREE.MeshBasicMaterial({color:0xc8ffff,transparent:true,opacity:.65}),bubbles,[(Math.random()-.5)*10,.2+Math.random()*3,(Math.random()-.5)*10]);bubbles.userData.bubbles=true;
  } else if(id==='crystal'){
    for(let i=0;i<15;i++){const a=i*2.399,r=3.5+(i%4)*.35;addCrystal(g,Math.cos(a)*r,.6+Math.random()*.3,Math.sin(a)*r,.27+(i%4)*.07,[0x67e8d9,0xb3a0ff,0xf6ba84][i%3]);}
    for(let i=0;i<8;i++){const a=i*1.8,r=4+(i%2)*.5;makeMesh(new THREE.SphereGeometry(.8,20,12),mat(i%2?0xe5b36e:0xc98f6d),g,[Math.cos(a)*r,-.1,Math.sin(a)*r],[1.6,.45,.75],[0,a,0]);}
  } else if(id==='sky'){
    for(let i=0;i<11;i++){const a=i*2.4,r=3.7+(i%3)*.4;addTree(g,Math.cos(a)*r,Math.sin(a)*r,.56+(i%3)*.14,world,i);}
    for(let i=0;i<8;i++){const a=i*2.31,r=4.4+(i%2)*.7;makeMesh(new THREE.IcosahedronGeometry(.5+(i%3)*.15,1),mat(world.groundLight),g,[Math.cos(a)*r,-1.5+(i%3)*.2,Math.sin(a)*r],[1.6,.65,1.35],[0,a,.1]);}
    addRuins(g,world);
  } else {
    addRuins(g,world);
    for(let i=0;i<8;i++){const a=i*2.5,r=4.4;addCrystal(g,Math.cos(a)*r,.9,Math.sin(a)*r,.28,world.accent);}
    for(let i=0;i<9;i++){const a=i*2.38,r=3.7+(i%2)*.5;makeMesh(new THREE.BoxGeometry(.42,.8+(i%3)*.25,.42),mat(0x77738e),g,[Math.cos(a)*r,.45,Math.sin(a)*r],[1,1,1],[0,a,0]);}
  }
}
function buildWorld(scene, worldId){
  const world={...WORLDS[worldId],id:worldId};
  const g=new THREE.Group();g.name='world-'+worldId;scene.add(g);
  const floor=makeMesh(new THREE.CircleGeometry(18,96),mat(world.ground,.96),g,[0,-.18,0],null,[-Math.PI/2,0,0]);floor.receiveShadow=true;
  makeMesh(new THREE.CylinderGeometry(5.8,6.3,.28,96),mat(world.groundLight),g,[0,-.03,0]);
  makeMesh(new THREE.CylinderGeometry(4.65,4.9,.2,96),mat(world.stone),g,[0,.12,0]);
  makeMesh(new THREE.CylinderGeometry(3.8,4.0,.17,96),mat(world.stoneLight),g,[0,.235,0]);
  makeMesh(new THREE.CylinderGeometry(3.28,3.36,.12,96),mat(world.groundLight),g,[0,.32,0]);
  torus(g,4.32,.035,mat(world.accent,.4,.24),.24,1,1);
  torus(g,3.36,.028,mat(world.accent,.4,.24),.39,1,1);
  makeMesh(new THREE.CylinderGeometry(2.95,3.05,.02,96),new THREE.MeshStandardMaterial({color:world.accent,roughness:.4,transparent:true,opacity:.28,emissive:world.accent,emissiveIntensity:.22}),g,[0,.4,0]);
  const rune=mat(world.accent,.35,.28);
  for(let i=0;i<18;i++){const a=i*Math.PI*2/18,r=3.68;makeMesh(new THREE.BoxGeometry(.16,.025,.045),rune,g,[Math.cos(a)*r,.405,Math.sin(a)*r],[1,1,1],[0,-a,0]);}
  addWorldDetails(g,world);
  const rock=mat(world.stone,.95);for(let i=0;i<11;i++){const a=i*2.4,r=6.5+(i%3)*.6;makeMesh(new THREE.DodecahedronGeometry(.28+(i%3)*.12,1),rock,g,[Math.cos(a)*r,-.02,Math.sin(a)*r],[1.35,.55,1],[Math.random()*.2, a,Math.random()*.2]);}
  const waterMat=new THREE.MeshStandardMaterial({color:world.water,roughness:.21,metalness:.12,transparent:true,opacity:.78,emissive:world.water,emissiveIntensity:.12,side:THREE.DoubleSide});
  const waterfall=makeMesh(new THREE.PlaneGeometry(1.05,2.3,1,12),waterMat,g,[0,1.85,-4.25],null,[0,0,0]);waterfall.userData.waterfall=true;waterfall.userData.baseX=0;
  makeMesh(new THREE.TorusGeometry(.74,.15,10,48),mat(world.stoneLight),g,[0,.15,-4.1],[1,1,.8],[Math.PI/2,0,0]);
  const sideLight1=new THREE.PointLight(world.accent,1.0,7);sideLight1.position.set(-3,2.2,1);g.add(sideLight1);
  const sideLight2=new THREE.PointLight(world.water,.8,6);sideLight2.position.set(3,1.8,-2.4);g.add(sideLight2);
  g.userData.worldId=worldId;
  return {group:g,world};
}
  return { WORLDS, buildWorld };
})();

const { CREATURES, buildCreature, getStageName } = (() => {
const CREATURES={
  emberkin:{name:'Emberling',family:'EMBERKIN · DRAGON',desc:'A tiny spark with a brave heart.',colors:[0x42a88b,0x247465],belly:0xf5d4a0,accent:0xffa45e,eye:0xffd35c,rarity:'#ffbd71',kind:'dragon'},
  tideling:{name:'Tidelet',family:'TIDELING · AQUATIC',desc:'A curious little guardian of hidden reefs.',colors:[0x51cbd0,0x278da7],belly:0xb7f3e9,accent:0x8cf4f0,eye:0xffda81,rarity:'#86eaff',kind:'water'},
  mossling:{name:'Mossbit',family:'MOSSLING · NATURE',desc:'A gentle sprout carrying the old forest’s magic.',colors:[0x8ec765,0x498d55],belly:0xe1e6a8,accent:0xffb9a2,eye:0xffe283,rarity:'#b9ef8f',kind:'nature'},
  voltkit:{name:'Voltkit',family:'VOLTKIT · SPARK',desc:'A playful storm that never sits still.',colors:[0xffbd55,0xed7e4d],belly:0xffeac1,accent:0xf8e46e,eye:0x8aebff,rarity:'#f7df77',kind:'electric'},
  crystalis:{name:'Prismite',family:'CRYSTALIS · CRYSTAL',desc:'A shy little gem with a universe inside.',colors:[0xb99aff,0x7766c5],belly:0xe9dcff,accent:0x9ef5ee,eye:0xffd8f3,rarity:'#c5a8ff',kind:'crystal'},
  umbrawisp:{name:'Duskleaf',family:'UMBRAWISP · MYSTIC',desc:'A moonlit wanderer from forgotten places.',colors:[0x7778b9,0x3c477f],belly:0xcac9f4,accent:0xf0b6e9,eye:0xffd9a2,rarity:'#c2bfff',kind:'shadow'}
};
const mat=(color,roughness=.52,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
function mesh(geo,m,parent,pos,scale,rot){const o=new THREE.Mesh(geo,m);if(pos)o.position.set(...pos);if(scale)o.scale.set(...scale);if(rot)o.rotation.set(...rot);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function sphere(parent,m,pos,scale,geo){return mesh(geo||new THREE.SphereGeometry(1,32,24),m,parent,pos,scale);}
function tube(parent,points,radius,material,segments=24){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,segments,radius,8,false),material,parent);}
function wing(parent,sign,membrane,bone,scale){
  const root=new THREE.Group();root.position.set(sign*.42,1.48,-.16);parent.add(root);root.scale.set(scale,scale,scale);
  const sh=new THREE.Shape();sh.moveTo(0,0);sh.quadraticCurveTo(.18,.54,.72,.87);sh.quadraticCurveTo(.65,.58,1.05,.57);sh.quadraticCurveTo(.79,.41,.83,.12);sh.quadraticCurveTo(.51,.29,.3,-.06);sh.quadraticCurveTo(.15,-.04,0,0);
  const geo=new THREE.ExtrudeGeometry(sh,{depth:.045,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.018,bevelThickness:.016,curveSegments:8});const wm=mesh(geo,membrane,root,[0,0,0],[sign,1,1]);wm.material.side=THREE.DoubleSide;
  const bones=new THREE.Group();bones.scale.x=sign;root.add(bones);
  tube(bones,[[0,0,.05],[.22,.3,.06],[.72,.87,.06]],.035,bone);tube(bones,[[.19,.03,.05],[.52,.23,.06],[.83,.12,.06]],.024,bone);tube(bones,[[.18,.04,.05],[.49,.4,.06],[1.05,.57,.06]],.024,bone);
  return root;
}
function horn(parent,x,y,z,size,color,lean=0){
  const pts=[[x,y,z],[x+lean*.25,y+size*.42,z],[x+lean,y+size,z-.025]];
  tube(parent,pts,.085*size,color,14);sphere(parent,color,[x,y,z],[.09*size,.09*size,.09*size]);
}
function eyes(parent,def,stage){
  const whites=mat(0xfffbf0,.22), iris=mat(def.eye,.2), pupil=mat(0x18252f,.16), glint=new THREE.MeshBasicMaterial({color:0xffffff});
  for(const s of [-1,1]){
    sphere(parent,mat(def.colors[1],.62),[s*.235,1.95,.43],[.17,.2,.095]);
    sphere(parent,whites,[s*.205,1.98,.485],[.115,.145,.065]);
    sphere(parent,iris,[s*.19,1.98,.54],[.073,.095,.042]);
    sphere(parent,pupil,[s*.183,1.976,.57],[.035,.059,.023]);
    sphere(parent,glint,[s*.207,2.022,.59],[.024,.027,.013]);
    const cheek=mat(def.kind==='shadow'?0xb58de4:def.kind==='water'?0x86eff0:def.kind==='electric'?0xff9b82:0xff9b9b,.8);
    sphere(parent,cheek,[s*.34,1.78,.46],[.09,.045,.018]);
    tube(parent,[[s*.31,2.12,.48],[s*.22,2.17,.5],[s*.12,2.12,.49]],.022,mat(def.colors[1],.7),12);
  }
  sphere(parent,mat(def.belly,.62),[0,1.73,.51],[.22,.14,.16]);
  sphere(parent,mat(def.colors[1],.35),[0,1.77,.65],[.045,.032,.025]);
  tube(parent,[[-.07,1.66,.60],[0,1.63,.615],[.07,1.66,.60]],.012,mat(def.colors[1]),10);
}
function addSpeciesDetails(root,def,stage,body,head){
  const c1=mat(def.colors[0],.4,.02), c2=mat(def.colors[1],.46,.04), accent=mat(def.accent,.3,.05), belly=mat(def.belly,.72);
  if(def.kind==='dragon'){
    const wingScale=stage===0?.63:stage===1?.86:1.1;
    const w1=wing(root,-1,mat(def.colors[1],.53),accent,wingScale),w2=wing(root,1,mat(def.colors[1],.53),accent,wingScale);w1.userData.wingSign=-1;w2.userData.wingSign=1;root.userData.wings=[w1,w2];
    horn(root,-.24,2.25,.02,.42+(stage*.17),accent,-.12);horn(root,.24,2.25,.02,.42+(stage*.17),accent,.12);
    if(stage>=1){for(let i=0;i<5;i++)mesh(new THREE.ConeGeometry(.1,.26,7),accent,root,[(i-2)*.17,1.55+Math.sin(i*.7)*.05,-.43],[.75,1,1],[0,0,Math.PI]);}
    const tail=new THREE.Group();tail.position.set(0,.95,-.42);root.add(tail);for(let i=0;i<5;i++){const p=i/4;sphere(tail,i<3?c2:c1,[Math.sin(p*1.4)*.12,-p*.13,-p*.3],[.19*(1-p*.77),.18*(1-p*.73),.23*(1-p*.75)]);}mesh(new THREE.ConeGeometry(.16,.35,7),accent,tail,[.12,-.62,-1.23],[1,1,1],[Math.PI*.5,0,-.35]);root.userData.tail=tail;
  } else if(def.kind==='water'){
    for(const s of [-1,1]){const fin=mesh(new THREE.SphereGeometry(1,24,16),accent,root,[s*.48,2.13,-.01],[.26,.42,.09],[0,0,s*-.45]);fin.scale.x*=s;for(let i=0;i<3;i++)tube(root,[[s*.35,1.4,-.3],[s*(.62+i*.1),1.6+i*.12,-.42],[s*(.95+i*.1),1.75+i*.15,-.5]],.025,accent,12);}
    const tail=new THREE.Group();tail.position.set(0,.9,-.42);root.add(tail);for(let i=0;i<5;i++){const p=i/4;sphere(tail,c2,[0,-p*.08,-p*.34],[.2*(1-p*.8),.18*(1-p*.7),.24*(1-p*.78)]);}mesh(new THREE.SphereGeometry(1,20,14),accent,tail,[0,-.35,-1.3],[.24,.13,.34],[.3,0,0]);root.userData.tail=tail;
    for(let s of [-1,1])for(let i=0;i<3;i++)sphere(root,accent,[s*.47,1.68+i*.12,-.08],[.065,.05,.045]);
  } else if(def.kind==='nature'){
    for(let i=0;i<5;i++){const a=-Math.PI*.85+i*Math.PI*.42;const leaf=mesh(new THREE.SphereGeometry(1,18,12),i%2?accent:mat(0xaee07c,.62),root,[Math.sin(a)*.32,2.29+Math.cos(a)*.1,.08],[.12,.32,.065],[0,0,-a*.5]);}
    for(let i=0;i<4;i++)sphere(root,mat(0x5e9a51),[(i-1.5)*.18,1.49,-.4],[.11,.17,.1]);
    sphere(root,mat(0xff9c9c),[.05,2.47,.05],[.1,.1,.06]);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;sphere(root,mat(0xffd2df),[.05+Math.cos(a)*.12,2.47+Math.sin(a)*.12,.05],[.08,.08,.04]);}
    const tail=new THREE.Group();tail.position.set(.1,.85,-.42);root.add(tail);tube(tail,[[0,0,0],[.15,-.16,-.34],[.34,-.05,-.62]],.08,c2,18);sphere(tail,accent,[.38,-.03,-.68],[.24,.12,.15]);root.userData.tail=tail;
  } else if(def.kind==='electric'){
    for(const s of [-1,1]){
      mesh(new THREE.ConeGeometry(.18,.6,8),c2,root,[s*.25,2.29,.02],[1,1,1],[0,0,-s*.28]);
      sphere(root,accent,[s*.23,2.08,.1],[.09,.19,.055]);
    }
    const tail=new THREE.Group();tail.position.set(0,.9,-.4);root.add(tail);tube(tail,[[0,0,0],[.2,-.12,-.25],[-.03,.1,-.52],[.24,.17,-.75]],.075,c2,20);tube(tail,[[.22,.17,-.75],[.48,.22,-.88],[.27,.52,-.96]],.052,accent,10);root.userData.tail=tail;
    for(let s of [-1,1])sphere(root,accent,[s*.38,1.47,.1],[.11,.06,.07]);
  } else if(def.kind==='crystal'){
    for(let i=0;i<7;i++){const a=i*2.4,r=.28+(i%3)*.04;mesh(new THREE.OctahedronGeometry(.17+(stage*.035),1),i%2?accent:mat(0xddcaff,.3,.15),root,[Math.cos(a)*r,1.55+(i%3)*.18,Math.sin(a)*.2-.4],[.75,1.4,.6],[0,a,.2]);}
    horn(root,-.22,2.22,.01,.45+stage*.13,accent,-.2);horn(root,.22,2.22,.01,.45+stage*.13,accent,.2);
    const tail=new THREE.Group();tail.position.set(0,.9,-.42);root.add(tail);for(let i=0;i<4;i++)mesh(new THREE.OctahedronGeometry(.17-i*.025,1),accent,tail,[0,-i*.07,-i*.28],[1,1.2,1],[0,i*.4,0]);root.userData.tail=tail;
  } else {
    for(const s of [-1,1]){horn(root,s*.25,2.2,0,.48+stage*.12,accent,s*.32);mesh(new THREE.SphereGeometry(1,20,14),c2,root,[s*.44,2.04,-.02],[.18,.32,.12],[0,0,s*.35]);}
    const tail=new THREE.Group();tail.position.set(0,.95,-.42);root.add(tail);tube(tail,[[0,0,0],[.22,-.05,-.3],[.04,.08,-.62],[-.12,.25,-.9]],.09,c2,20);sphere(tail,accent,[-.12,.25,-.9],[.18,.18,.18]);root.userData.tail=tail;
    if(stage>=1){const w1=wing(root,-1,mat(0x625eaa,.6),accent,.75),w2=wing(root,1,mat(0x625eaa,.6),accent,.75);root.userData.wings=[w1,w2];}
  }
  if(stage>=1){for(let i=0;i<3+stage;i++){const a=i*2.4,r=.76;const crystal=mesh(new THREE.OctahedronGeometry(.11+stage*.025,1),mat(def.accent,.27,.2),root,[Math.cos(a)*r,1.1+(i%3)*.28,Math.sin(a)*r],[.65,1.4,.65],[0,a,.2]);crystal.userData.orbit=true;crystal.userData.baseY=crystal.position.y;}}
  if(stage===2){const crown=mesh(new THREE.TorusGeometry(.4,.035,8,40),mat(def.accent,.28,.15),root,[0,2.38,.04],[1,1,.7],[Math.PI/2,0,0]);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;mesh(new THREE.OctahedronGeometry(.10,1),mat(def.accent,.22,.22),root,[Math.cos(a)*.4,2.42,Math.sin(a)*.3],[.7,1.2,.7],[0,a,0]);}root.userData.crown=crown;}
}
function buildCreature(creatureId,stage=0){
  const def=CREATURES[creatureId]||CREATURES.emberkin;const root=new THREE.Group();root.name=creatureId+'-stage-'+stage;
  const scale=[.82,1,1.18][stage];root.scale.setScalar(scale);
  const main=mat(def.colors[0],.45,.015), secondary=mat(def.colors[1],.52,.02), belly=mat(def.belly,.73), accent=mat(def.accent,.35,.03);
  const body=sphere(root,main,[0,1.13,0],[.62,.68,.52]);body.rotation.x=-.12;
  sphere(root,belly,[0,.99,.438],[.405,.455,.14]);
  const head=sphere(root,main,[0,1.88,.11],[.52,.46,.44]);
  sphere(root,main,[-.38,1.77,.08],[.16,.17,.19]);sphere(root,main,[.38,1.77,.08],[.16,.17,.19]);
  for(const s of [-1,1])for(const z of [-.26,.28]){sphere(root,secondary,[s*.39,.58,z],[.2,.22,.22]);sphere(root,main,[s*.39,.48,z+.04],[.21,.13,.24]);for(let j=0;j<2;j++)mesh(new THREE.ConeGeometry(.035,.09,7),accent,root,[s*.39+(j-.5)*.1,.43,z+.22],[1,1,1],[Math.PI/2,0,0]);}
  eyes(root,def,stage);
  addSpeciesDetails(root,def,stage,body,head);
  for(let i=0;i<6;i++){const x=(i-2.5)*.12;const y=1.52+Math.cos(i*.65)*.06;const pebble=sphere(root,secondary,[x,y,-.43],[.07,.11,.055]);pebble.rotation.z=x*.7;}
  const auraMaterial=new THREE.MeshBasicMaterial({color:def.accent,transparent:true,opacity:.11,side:THREE.DoubleSide,depthWrite:false});
  const aura=mesh(new THREE.SphereGeometry(1.16,28,24),auraMaterial,root,[0,1.25,-.03],[.78,1.02,.7]);root.userData.aura=aura;
  const moteGroup=new THREE.Group();root.add(moteGroup);for(let i=0;i<9;i++){const mote=mesh(new THREE.SphereGeometry(.025+(i%3)*.008,8,8),new THREE.MeshBasicMaterial({color:i%2?def.accent:0xffffff}),moteGroup,[Math.cos(i*.7)*(.86+(i%3)*.06),1.05+(i%4)*.3,Math.sin(i*.7)*.62]);mote.userData.orbitAngle=i*.7;moteGroup.userData.motes=true;}root.userData.moteGroup=moteGroup;
  root.userData.definition=def;root.userData.stage=stage;root.userData.scaleTarget=scale;
  return root;
}
function getStageName(stage){return ['SPROUT','AWAKENED','MYTHIC'][stage]||'SPROUT';}
  return { CREATURES, buildCreature, getStageName };
})();

const { updateCreature, updateWorld } = (() => {
function updateCreature(root,t){
  if(!root)return;
  root.position.y=.23+Math.sin(t*1.65)*.055;
  root.rotation.y=Math.sin(t*.42)*.14;
  if(root.userData.wings){root.userData.wings.forEach((w,i)=>{const sign=w.userData.wingSign|| (i===0?-1:1);w.rotation.z=sign*(.18+Math.sin(t*4.2+(i*.22))* .24);w.rotation.x=Math.sin(t*4.2+i*.4)*.07;});}
  if(root.userData.tail){root.userData.tail.rotation.y=Math.sin(t*2.1)*.16;root.userData.tail.rotation.x=Math.sin(t*1.3)*.05;}
  if(root.userData.aura){root.userData.aura.material.opacity=.07+(.04*(.5+.5*Math.sin(t*2)));root.userData.aura.scale.set(.78+Math.sin(t*1.5)*.025,1.02+Math.sin(t*1.5)*.04,.7+Math.sin(t*1.5)*.025);}
  if(root.userData.moteGroup){root.userData.moteGroup.rotation.y=t*.45;root.userData.moteGroup.children.forEach((m,i)=>{const a=(m.userData.orbitAngle||i)*1+t*.7;const r=.86+(i%3)*.055;m.position.x=Math.cos(a)*r;m.position.z=Math.sin(a)*.68;m.position.y=1.05+(i%4)*.3+Math.sin(t*2+i)*.06;});}
  root.children.forEach((child,i)=>{if(child.userData.orbit){child.rotation.y=t*.8+i;child.position.y=(child.userData.baseY||child.position.y)+Math.sin(t*2+i)*.035;}});
}
function updateWorld(group,t){
  if(!group)return;
  group.children.forEach((o,i)=>{
    if(o.userData.waterfall){o.material.opacity=.67+.08*Math.sin(t*3);o.position.x=(o.userData.baseX||0)+Math.sin(t*2)*.025;}
    if(o.userData.bubbles){o.children.forEach((b,j)=>{b.position.y=.3+((t*.32+j*.29)%3.8);b.position.x+=Math.sin(t+j)*.0004;});}
    if(o.geometry&&o.geometry.type==='OctahedronGeometry'&&o.userData.floatOffset!==undefined){o.position.y=(o.userData.floatBaseY||0)+Math.sin(t+o.userData.floatOffset)*.035;}
  });
}
  return { updateCreature, updateWorld };
})();

const canvas=document.querySelector('#scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=new THREE.Color(WORLDS.verdant.sky);scene.fog=new THREE.Fog(WORLDS.verdant.fog,9,24);
const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(8.7,6.4,10.8);camera.lookAt(0,1.35,0);
const hemi=new THREE.HemisphereLight(0xe8f5eb,0x344b45,2.1);scene.add(hemi);
const key=new THREE.DirectionalLight(0xffe2bd,3.2);key.position.set(-4,9,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-10;key.shadow.camera.right=10;key.shadow.camera.top=10;key.shadow.camera.bottom=-10;key.shadow.bias=-.0005;scene.add(key);
const rim=new THREE.DirectionalLight(0x7be6e7,1.7);rim.position.set(4,4,-5);scene.add(rim);
const fill=new THREE.PointLight(0xd3f79d,1.2,14);fill.position.set(0,3,3);scene.add(fill);
const clock=new THREE.Clock();let worldGroup=null,creatureGroup=null,worldId='verdant',creatureId='emberkin',stage=0;let time=0;let intro=0;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stageInfo=[{name:'SPROUT',evolve:'Reach next form'},{name:'AWAKENED',evolve:'Unlock mythic form'},{name:'MYTHIC',evolve:'Restart evolution'}];
const labels={verdant:'01 / 05',tidal:'02 / 05',crystal:'03 / 05',sky:'04 / 05',ancient:'05 / 05'};
function updateWorldButtons(){document.querySelectorAll('.world-tab').forEach(b=>{b.classList.toggle('active',b.dataset.world===worldId);});const n=document.querySelector('.world-panel .muted');if(n)n.textContent=labels[worldId];}
function updateCreatureButtons(){document.querySelectorAll('.creature-tab').forEach(b=>b.classList.toggle('active',b.dataset.creature===creatureId));}
function updateCaption(){const d=CREATURES[creatureId];document.querySelector('#creature-family').textContent=d.family;document.querySelector('#creature-name').textContent=stage===0?d.name:stage===1?evolvedName(d.name,1):evolvedName(d.name,2);document.querySelector('#creature-description').textContent=stage===0?d.desc:stage===1?evolvedDesc(d.kind,1):evolvedDesc(d.kind,2);document.querySelector('#rarity-dot').style.background=d.rarity;document.querySelector('#rarity-dot').style.boxShadow=`0 0 11px ${d.rarity}`;document.querySelector('#stage-label').textContent=`STAGE ${stage+1} · ${getStageName(stage)}`;document.querySelectorAll('.stage-step').forEach((el,i)=>el.classList.toggle('current',i<=stage));document.querySelector('#evolve-subtitle').textContent=stageInfo[stage].evolve;}
function evolvedName(base,s){const names={'Emberling':['Emberguard','Solflare'],'Tidelet':['Tidewarden','Abyssal Crown'],'Mossbit':['Grovekeeper','Worldroot'],'Voltkit':['Stormpelt','Thunderheart'],'Prismite':['Prismancer','Astral Prism'],'Duskleaf':['Nightbloom','Eclipse Warden']};return (names[base]||[base+' Evolved',base+' Mythic'])[s-1];}
function evolvedDesc(kind,s){if(s===1)return `A stronger ${kind} spirit, newly awakened to its power.`;return `A mythic ${kind} guardian radiating ancient magic.`;}
function disposeGroup(group){if(!group)return;group.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});scene.remove(group);}
function changeWorld(id){if(!WORLDS[id])return;worldId=id;disposeGroup(worldGroup);const built=buildWorld(scene,worldId);worldGroup=built.group;const w=built.world;scene.background.setHex(w.sky);scene.fog.color.setHex(w.fog);hemi.color.setHex(w.ambient);hemi.groundColor.setHex(w.ground);key.color.setHex(w.sun);rim.color.setHex(w.water);fill.color.setHex(w.accent);updateWorldButtons();showToast(w.mood);}
function changeCreature(id){if(!CREATURES[id])return;creatureId=id;stage=0;disposeGroup(creatureGroup);creatureGroup=buildCreature(creatureId,stage);scene.add(creatureGroup);updateCreatureButtons();updateCaption();}
function evolve(){stage=(stage+1)%3;disposeGroup(creatureGroup);creatureGroup=buildCreature(creatureId,stage);creatureGroup.scale.multiplyScalar(.02);scene.add(creatureGroup);intro=0;updateCaption();showToast(stage===0?'Evolution cycle restarted.':`Evolution complete: ${getStageName(stage).toLowerCase()} form unlocked.`);}
let toastTimer;function showToast(msg){const toast=document.querySelector('#toast');toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}
document.querySelectorAll('.world-tab').forEach(b=>b.addEventListener('click',()=>changeWorld(b.dataset.world)));
document.querySelectorAll('.creature-tab').forEach(b=>b.addEventListener('click',()=>changeCreature(b.dataset.creature)));
document.querySelector('#evolve-button').addEventListener('click',evolve);
let pointerDown=null;canvas.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};});canvas.addEventListener('pointerup',e=>{if(!pointerDown)return;const dx=e.clientX-pointerDown.x,dy=e.clientY-pointerDown.y;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)){const ids=Object.keys(CREATURES),idx=ids.indexOf(creatureId);changeCreature(ids[(idx+(dx<0?1:-1)+ids.length)%ids.length]);}pointerDown=null;});
function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<700?37:32;camera.position.set(w<700?8.4:9.8,w<700?6.35:6.8,w<700?10.8:11.2);camera.updateProjectionMatrix();camera.lookAt(0,1.32,0);}
window.addEventListener('resize',resize,{passive:true});resize();changeWorld('verdant');changeCreature('emberkin');
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);time+=reducedMotion?dt*.22:dt;if(creatureGroup){if(intro<1){intro=Math.min(1,intro+dt*1.8);const s=[.82,1,1.18][stage];creatureGroup.scale.setScalar(s*(.02+.98*(1-Math.pow(1-intro,3))));}updateCreature(creatureGroup,time);}updateWorld(worldGroup,time);renderer.render(scene,camera);}
animate();
