/* Mergivolve evolution layer — PURE logic (no DOM, no game globals). NOT wired into the live game yet.
   Works with the REAL catalog fields: id, familyId, rarity, category, evolutionStages[], stageNamesHe/En, origin, sourceType. */
(function(root,f){if(typeof module==='object'&&module.exports)module.exports=f();else root.MergivolveEvolution=f()})(typeof self!=='undefined'?self:this,function(){'use strict';
const RARITIES=['common','uncommon','rare','epic','legendary','mythic']; // 'mythic' = NEW tier, unused by the catalog
const GRADE_DEFS={S:1,SS:2,SSS:3};   // NEW axis, separate from rarity and from stage. Meaning must be defined by you.
const GRADE_OVERRIDES={};            // speciesId -> 'S'|'SS'|'SSS'. Empty on purpose: no grades are invented for existing species.
const POLICIES={
 legacy:{id:'legacy',assignAt:7,maxLevel:8,ascension:false,eggAtAssign:false},   // = current live behaviour
 proposedA:{id:'proposedA',assignAt:6,maxLevel:8,ascension:true,eggAtAssign:true} // approved for dev copy only
};
/* Stage of an item. Species-specific: chains that already start with 'egg' (forest/fire/crystal dragon) use the egg AS stage 1,
   so their hatched form is stage 2 at the same level. Other species: egg is a pre-state, hatched form = stage 1. */
function stageFor(sp,level,p,hatched){const n=stageCount(sp);let s;
 if(p.id==='legacy')s=level-5;else if(hasEggStage(sp))s=hatched?level-4:1;else s=level-5;
 return Math.min(n,Math.max(1,s))}
const REWARD={common:20,uncommon:40,rare:70,epic:120,legendary:200,mythic:300};          // PROPOSED numbers (same as prototype)
const MILESTONES=[{n:10,coins:100},{n:25,coins:250},{n:50,coins:600},{n:100,coins:1500},{n:142,coins:4000}];
function buildIndex(raw){const byId={},errors=[],ids=Object.keys(raw||{}),names={};
 ids.forEach(k=>{const s=raw[k];byId[k]=s;
  if(s.id!==k)errors.push(k+': id!=key');if(!s.familyId)errors.push(k+': no familyId');
  if(!Array.isArray(s.evolutionStages)||s.evolutionStages.length<3)errors.push(k+': <3 stages');
  else if(new Set(s.evolutionStages).size!==s.evolutionStages.length)errors.push(k+': duplicate stage ids');
  if(!RARITIES.includes(s.rarity))errors.push(k+': unknown rarity '+s.rarity);
  if(names[s.nameEn])errors.push(k+': duplicate nameEn');names[s.nameEn]=1});
 return{byId,ids,errors,count:ids.length}}
const stageCount=s=>s.evolutionStages.length;
const hasEggStage=s=>s.evolutionStages[0]==='egg';
function stageInfo(s,n){const i=Math.min(Math.max(1,n),stageCount(s))-1;return{n:i+1,id:s.evolutionStages[i],he:(s.stageNamesHe||[])[i]||null,en:(s.stageNamesEn||[])[i]||null}}
const gradeOf=s=>GRADE_OVERRIDES[s.id]||null;
function pickSpecies(rng,idx,weights){const ids=idx.ids;if(!weights)return ids[Math.floor(rng()*ids.length)];
 const w=ids.map(i=>weights[idx.byId[i].rarity]??1),t=w.reduce((a,b)=>a+b,0);let r=rng()*t;for(let i=0;i<ids.length;i++){if((r-=w[i])<0)return ids[i]}return ids[ids.length-1]}
/* Same rule the game already uses in mergeAt (type, level, speciesId AND familyId) + species must exist + same stage + no unhatched eggs. */
function canMerge(a,b,idx){if(!a||!b||a.type!==b.type||a.level!==b.level)return false;
 if(a.type!=='wild')return true;
 if(a.egg||b.egg)return false;
 if((a.speciesId||null)!==(b.speciesId||null)||(a.familyId||null)!==(b.familyId||null))return false;
 if(a.speciesId&&!idx.byId[a.speciesId])return false;
 if(a.speciesId&&(a.evolutionStage||0)!==(b.evolutionStage||0))return false;return true}
/* Result of merging two equal items. Species never changes. Returns {item,event}. */
function mergeResult(a,idx,p,rng){if(a.type!=='wild')return{item:{...a,level:a.level+1},event:'level'};
 if(a.egg)return{item:a,event:'blocked'};
 const next={...a};let sp=a.speciesId?idx.byId[a.speciesId]:null;
 if(a.level>=p.maxLevel){const cur=a.evolutionStage||1;if(!sp||!p.ascension||cur>=stageCount(sp))return{item:next,event:'maxed'};next.evolutionStage=cur+1;return{item:next,event:'ascend'}}
 next.level=a.level+1;
 if(!sp&&next.level===p.assignAt&&idx.count){const id=pickSpecies(rng,idx);sp=idx.byId[id];next.speciesId=id;next.familyId=sp.familyId;
  if(p.eggAtAssign){next.egg=true;next.evolutionStage=1;return{item:next,event:'egg'}}}
 if(sp)next.evolutionStage=stageFor(sp,next.level,p,true);
 return{item:next,event:'level'}}
function hatch(item,idx,p){p=p||POLICIES.proposedA;const sp=item&&idx.byId[item.speciesId];if(!sp||!item.egg)return null;const n={...item};delete n.egg;n.evolutionStage=stageFor(sp,n.level,p,true);return n}
/* Load/migration normaliser (replaces the game's normalizeBoardItem). Never lowers an ascended stage; never drops an unknown species. */
function normalizeItem(item,idx,p){if(!item||typeof item!=='object')return item;const n={...item};
 if(n.type!=='wild'){delete n.speciesId;delete n.familyId;delete n.evolutionStage;delete n.egg;return n}
 if(typeof n.speciesId!=='string'||!n.speciesId){delete n.speciesId;delete n.familyId;delete n.evolutionStage;delete n.egg;return n}
 const sp=idx.byId[n.speciesId];if(!sp)return n;                       // catalog missing/unknown: leave untouched (no data loss)
 n.familyId=n.familyId||sp.familyId;
 if(n.egg&&p.eggAtAssign){n.evolutionStage=1;return n}delete n.egg;
 n.evolutionStage=Math.min(stageCount(sp),Math.max(stageFor(sp,Number(n.level),p,true),n.evolutionStage|0));return n}
/* Safe replacement for the game's findMergePair (which ignores species and can pick a pair mergeAt will refuse). */
function findMergePairSafe(board,idx,p){for(let i=0;i<board.length;i++){const a=board[i];if(!a)continue;
 for(let j=i+1;j<board.length;j++){const b=board[j];if(b&&canMerge(a,b,idx)&&!(a.level>=p.maxLevel&&a.type!=='wild'))return[i,j]}}return null}
/* ---- album/discovery: ADDITIVE field `album` inside the existing save object ---- */
const ALBUM_V=1;
const emptyAlbum=()=>({v:ALBUM_V,species:{},claimed:{},events:{}});
function migrateSave(save,idx,now,noBackfill){const s=JSON.parse(JSON.stringify(save||{}));if(!s.album||s.album.v!==ALBUM_V)s.album={...emptyAlbum(),...(s.album||{}),v:ALBUM_V};
 if(!noBackfill)(Array.isArray(s.board)?s.board:[]).forEach(b=>{if(b&&typeof b==='object'&&!b.egg&&typeof b.speciesId==='string'&&idx.byId[b.speciesId]){
  const e=s.album.species[b.speciesId]||(s.album.species[b.speciesId]={src:'backfill',at:now||0,maxStage:1});e.maxStage=Math.max(e.maxStage||1,(b.evolutionStage|0)||1)}});return s}
function recordDiscovery(save,speciesId,stage,eventId,idx,now){const s=migrateSave(save,idx,now,true),A=s.album,out=[];
 if(!idx.byId[speciesId])return{save:s,events:out};
 if(eventId&&A.events[eventId])return{save:s,events:out};            // same real event never counts twice
 if(eventId){A.events[eventId]=1;const k=Object.keys(A.events);if(k.length>300)k.slice(0,k.length-300).forEach(x=>delete A.events[x])}
 const e=A.species[speciesId];if(!e){A.species[speciesId]={src:'game',at:now||0,maxStage:stage||1};out.push('new_species')}
 else if((stage||1)>e.maxStage){e.maxStage=stage;out.push('new_stage')}return{save:s,events:out}}
function claimReward(save,key,idx){const s=JSON.parse(JSON.stringify(save)),A=s.album;if(!A||A.claimed[key])return{save:s,ok:false,amount:0};
 let amt=0;const m=key.match(/^species:(.+)$/),ms=key.match(/^milestone:(\d+)$/);
 if(m){const sp=idx.byId[m[1]];if(!sp||!A.species[m[1]])return{save:s,ok:false,amount:0};amt=REWARD[sp.rarity]||0}
 else if(ms){const d=MILESTONES.find(x=>x.n==ms[1]);if(!d||Object.keys(A.species).length<d.n)return{save:s,ok:false,amount:0};amt=d.coins}else return{save:s,ok:false,amount:0};
 A.claimed[key]=1;return{save:s,ok:true,amount:amt}}   // caller decides how to pay (no economy change made here)
/* Give a species to a wild item >= assignAt that has none (old saves, starter eggs). L6 -> egg; L7/L8 -> hatched at the stage for its level. Deterministic via the caller's seeded rng. */
function assignMissing(item,idx,p,rng){if(!item||item.type!=='wild'||item.speciesId||!(item.level>=p.assignAt)||!idx.count)return item;
 const id=pickSpecies(rng,idx),sp=idx.byId[id],n={...item,speciesId:id,familyId:sp.familyId};
 if(item.level===p.assignAt&&p.eggAtAssign){n.egg=true;n.evolutionStage=1}else n.evolutionStage=stageFor(sp,item.level,p,true);return n}
return{assignMissing,stageFor,normalizeItem,RARITIES,GRADE_DEFS,GRADE_OVERRIDES,POLICIES,REWARD,MILESTONES,buildIndex,stageCount,hasEggStage,stageInfo,gradeOf,pickSpecies,canMerge,mergeResult,hatch,findMergePairSafe,migrateSave,recordDiscovery,claimReward,emptyAlbum}});
