/* Mergivolve storage environment. Default (no ?dev=1) = LIVE: exactly the original save key, behaviour unchanged.
   Dev mode (?dev=1, window.MERGIVOLVE_ENV==='dev', or any page served under /preview/): separate save key, and a hard guard that blocks ANY write/remove of the live key.
   Same origin (github.io) means localStorage is shared by all pages, so isolation is done by KEY, and enforced by the guard. */
(function(){'use strict';var LIVE='mergivolve-merge-prototype-v1',DEV='mergivolve-dev-merge-v1';
 var dev=false;try{dev=new URLSearchParams(location.search).get('dev')==='1'||window.MERGIVOLVE_ENV==='dev'||/\/preview(\/|$)/.test(location.pathname)}catch(e){}
 var E={dev:dev,LIVE_KEY:LIVE,DEV_KEY:DEV,SAVE_KEY:dev?DEV:LIVE,blocked:[]};
 if(dev&&window.Storage){var P=Storage.prototype,ss=P.setItem,rm=P.removeItem,cl=P.clear;
  P.setItem=function(k){if(String(k)===LIVE){E.blocked.push('set');try{console.warn('[dev] blocked write to the LIVE save key')}catch(e){}return}return ss.apply(this,arguments)};
  P.removeItem=function(k){if(String(k)===LIVE){E.blocked.push('remove');return}return rm.apply(this,arguments)};
  P.clear=function(){if(this===window.localStorage){E.blocked.push('clear');Object.keys(localStorage).filter(function(k){return k.indexOf('mergivolve-dev')===0}).forEach(function(k){rm.call(localStorage,k)});return}return cl.apply(this,arguments)}}
 /* Read-only import: reads the live save (getItem only), validates, copies into the DEV key (after backing up any existing dev save). Never writes the live key. */
 E.importLive=function(){try{var raw=localStorage.getItem(LIVE);if(!raw)return{ok:false,msg:'no live save found in this browser'};var s=JSON.parse(raw);
   if(!s||!Array.isArray(s.board)||s.board.length!==25)return{ok:false,msg:'live save has an unexpected format'};
   var old=localStorage.getItem(DEV);if(old)localStorage.setItem('mergivolve-dev-backup-'+Date.now(),old);
   localStorage.setItem(DEV,raw);return{ok:true,msg:'copied '+s.board.filter(Boolean).length+' board items',items:s.board.filter(Boolean).length,hadDev:!!old}}catch(e){return{ok:false,msg:String(e)}}};
 window.MergivolveEnv=E;
 if(dev)document.addEventListener('DOMContentLoaded',function(){var d=document.createElement('div');d.textContent='DEV SAVE · separate from the live game';d.style.cssText='position:fixed;left:6px;bottom:4px;font:10px system-ui;color:#ffe29a;background:#000a;border-radius:6px;padding:2px 6px;z-index:99999;pointer-events:none';document.body.appendChild(d)})})();
