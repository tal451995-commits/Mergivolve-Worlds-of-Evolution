/* DEV COPY UI glue: draws eggs + stage chips on board items, provides the board hatch cinematic. Uses MergivolveFX + MergivolveEvolution. */
(function(){'use strict';if(!(window.MergivolveEnv&&window.MergivolveEnv.dev))return;const FX=window.MergivolveFX,E=window.MergivolveEvolution;if(!FX||!E||!window.MERGIVOLVE_SPECIES)return;
const idx=E.buildIndex(window.MERGIVOLVE_SPECIES),POL=E.POLICIES.proposedA,H=s=>[...s].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7),he=()=>(document.documentElement.lang||'he')==='he';
const nm=sp=>he()?sp.nameHe:sp.nameEn;
function stageLabel(sp,n){const i=E.stageInfo(sp,n);return(he()?i.he:i.en)||i.id}
function decorate(){document.querySelectorAll('.board-item[data-type="wild"][data-species]').forEach(n=>{const sp=idx.byId[n.dataset.species];if(!sp)return;
 if(n.dataset.egg){if(n.dataset.fxEgg)return;n.dataset.fxEgg='1';const old=n.querySelector('svg,img'),IM=window.MERGIVOLVE_SPECIES_IMAGES&&window.MERGIVOLVE_SPECIES_IMAGES[sp.id];if(old)old.outerHTML=(IM&&IM.egg)?'<img class="board-egg species-egg" alt="" draggable="false" style="width:100%;height:100%;object-fit:contain" src="./'+IM.egg+'">':FX.eggSVG({rarity:sp.rarity,seed:H(sp.id)}).replace('mfx-egg-svg','mfx-egg-svg board-egg');n.title=(he()?'ביצה — לחצו כדי לבקוע':'Egg — tap to hatch')}
 else if(!n.querySelector('.stage-chip')){const c=document.createElement('span');c.className='stage-chip';c.textContent=n.dataset.stage+'/'+E.stageCount(sp);n.append(c);n.title=nm(sp)+' · '+stageLabel(sp,+n.dataset.stage)}})}
const b=document.getElementById('board');if(b){new MutationObserver(decorate).observe(b,{childList:true,subtree:true});decorate()}
FX.hatchOnBoard=function(node,done){const sp=idx.byId[node.dataset.species],lvl=+node.dataset.level,ix=node.dataset.index;
 FX.hatch({eggSrc:(window.MERGIVOLVE_SPECIES_IMAGES&&window.MERGIVOLVE_SPECIES_IMAGES[sp.id]||{}).egg,rarity:sp.rarity,seed:H(sp.id),title:nm(sp),sub:stageLabel(sp,E.stageFor(sp,lvl,POL,true)),hint:he()?'נבקע…':'Hatching…',doneHint:he()?'לחצו להמשך':'Tap to continue',onReveal:done,
  creature:()=>{const a=document.querySelector('.board-item[data-index="'+ix+'"] img,.board-item[data-index="'+ix+'"] svg:not(.mfx-egg-svg)');return a?a.cloneNode(true):null}})};
})();
