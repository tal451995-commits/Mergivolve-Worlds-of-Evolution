/* Name fixes (overlay, loaded AFTER species-catalog-expansion.js). Original catalog files stay untouched; ids never change.
   Each fix is documented in catalog_audit.csv. Hebrew fixes marked needs_review cannot be verified offline. */
(function(){var S=window.MERGIVOLVE_SPECIES;if(!S)return;
 var F={
  umibozu:{nameEn:'Umibōzu'},                                  // was '海坊主 / Umibōzu' (Japanese script inside the English display name)
  ghoul:{nameHe:'גהול — אוכל הגופות'},                         // was 'ע׳ול — ג׳ול' (duplicated, confusing transliteration)
  ifrit:{nameHe:'עפריט — שד האש'},                              // was 'עִפְרִית' (= 'sulfur' in Hebrew)
  roc:{nameHe:'רוק — ציפור הענק'}                              // was 'רוח — ציפור הרוק' ('רוח' = wind/spirit)
 };
 Object.keys(F).forEach(function(id){if(S[id])Object.assign(S[id],F[id])});
 window.MERGIVOLVE_NAME_FIXES=F;})();
