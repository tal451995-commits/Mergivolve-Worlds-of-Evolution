/*
 * Mergivolve — Expanded Species Catalog (data only)
 * Adds new entries to the original species catalog without replacing its first 10 entries.
 * The stage IDs and game rarities are game-design scaffolding, not claims from the source traditions.
 * This file intentionally does not change the board, merge logic, saves, or creature images.
 */
(function () {
  "use strict";
  const catalog = window.MERGIVOLVE_SPECIES || (window.MERGIVOLVE_SPECIES = {});
  const additions = {
  "oni": {
    "id": "oni",
    "familyId": "oni",
    "nameHe": "שד אוני",
    "nameEn": "Oni",
    "category": "yokai",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "oni_stage_1",
      "oni_stage_2",
      "oni_stage_3",
      "oni_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tengu": {
    "id": "tengu",
    "familyId": "tengu",
    "nameHe": "טנגו",
    "nameEn": "Tengu",
    "category": "yokai",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "tengu_stage_1",
      "tengu_stage_2",
      "tengu_stage_3",
      "tengu_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kappa": {
    "id": "kappa",
    "familyId": "kappa",
    "nameHe": "קאפה",
    "nameEn": "Kappa",
    "category": "water_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "kappa_stage_1",
      "kappa_stage_2",
      "kappa_stage_3",
      "kappa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tanuki": {
    "id": "tanuki",
    "familyId": "tanuki",
    "nameHe": "טאנוקי קסום",
    "nameEn": "Tanuki",
    "category": "shapeshifter",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "tanuki_stage_1",
      "tanuki_stage_2",
      "tanuki_stage_3",
      "tanuki_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "yuki_onna": {
    "id": "yuki_onna",
    "familyId": "yuki_onna",
    "nameHe": "אשת השלג",
    "nameEn": "Yuki-onna",
    "category": "ice_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "yuki_onna_stage_1",
      "yuki_onna_stage_2",
      "yuki_onna_stage_3",
      "yuki_onna_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "jorogumo": {
    "id": "jorogumo",
    "familyId": "jorogumo",
    "nameHe": "ג׳ורוגומו — אשת העכביש",
    "nameEn": "Jorōgumo",
    "category": "spider_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "jorogumo_stage_1",
      "jorogumo_stage_2",
      "jorogumo_stage_3",
      "jorogumo_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nekomata": {
    "id": "nekomata",
    "familyId": "nekomata",
    "nameHe": "נקומטה — חתול דו־זנבי",
    "nameEn": "Nekomata",
    "category": "cat_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "nekomata_stage_1",
      "nekomata_stage_2",
      "nekomata_stage_3",
      "nekomata_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bakeneko": {
    "id": "bakeneko",
    "familyId": "bakeneko",
    "nameHe": "באקנקו — חתול קסום",
    "nameEn": "Bakeneko",
    "category": "cat_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "bakeneko_stage_1",
      "bakeneko_stage_2",
      "bakeneko_stage_3",
      "bakeneko_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nurarihyon": {
    "id": "nurarihyon",
    "familyId": "nurarihyon",
    "nameHe": "נוראריהיון",
    "nameEn": "Nurarihyon",
    "category": "yokai",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "nurarihyon_stage_1",
      "nurarihyon_stage_2",
      "nurarihyon_stage_3",
      "nurarihyon_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "rokurokubi": {
    "id": "rokurokubi",
    "familyId": "rokurokubi",
    "nameHe": "רוקורוקובי — ארוך־צוואר",
    "nameEn": "Rokurokubi",
    "category": "shapeshifter",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "rokurokubi_stage_1",
      "rokurokubi_stage_2",
      "rokurokubi_stage_3",
      "rokurokubi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "gashadokuro": {
    "id": "gashadokuro",
    "familyId": "gashadokuro",
    "nameHe": "גאשאדוקורו — שלד ענק",
    "nameEn": "Gashadokuro",
    "category": "undead",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "gashadokuro_stage_1",
      "gashadokuro_stage_2",
      "gashadokuro_stage_3",
      "gashadokuro_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tsuchigumo": {
    "id": "tsuchigumo",
    "familyId": "tsuchigumo",
    "nameHe": "צוצ׳יגומו — עכביש האדמה",
    "nameEn": "Tsuchigumo",
    "category": "spider_beast",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "tsuchigumo_stage_1",
      "tsuchigumo_stage_2",
      "tsuchigumo_stage_3",
      "tsuchigumo_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kamaitachi": {
    "id": "kamaitachi",
    "familyId": "kamaitachi",
    "nameHe": "קמאיטאצ׳י — סמור הרוח",
    "nameEn": "Kamaitachi",
    "category": "wind_beast",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "kamaitachi_stage_1",
      "kamaitachi_stage_2",
      "kamaitachi_stage_3",
      "kamaitachi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ubume": {
    "id": "ubume",
    "familyId": "ubume",
    "nameHe": "אובומה — רוח האם",
    "nameEn": "Ubume",
    "category": "ghost",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "ubume_stage_1",
      "ubume_stage_2",
      "ubume_stage_3",
      "ubume_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "yurei": {
    "id": "yurei",
    "familyId": "yurei",
    "nameHe": "יוריי — רוח רפאים",
    "nameEn": "Yūrei",
    "category": "ghost",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "yurei_stage_1",
      "yurei_stage_2",
      "yurei_stage_3",
      "yurei_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "umibozu": {
    "id": "umibozu",
    "familyId": "umibozu",
    "nameHe": "אומיבוזו — נזיר הים",
    "nameEn": "海坊主 / Umibōzu",
    "category": "sea_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "umibozu_stage_1",
      "umibozu_stage_2",
      "umibozu_stage_3",
      "umibozu_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nue": {
    "id": "nue",
    "familyId": "nue",
    "nameHe": "נואה — יצור הכלאיים",
    "nameEn": "Nue",
    "category": "chimera",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "nue_stage_1",
      "nue_stage_2",
      "nue_stage_3",
      "nue_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "zashiki_warashi": {
    "id": "zashiki_warashi",
    "familyId": "zashiki_warashi",
    "nameHe": "זאשיקי־וואראשי — רוח הבית",
    "nameEn": "Zashiki-warashi",
    "category": "house_spirit",
    "origin": "Japan — Japanese folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "zashiki_warashi_stage_1",
      "zashiki_warashi_stage_2",
      "zashiki_warashi_stage_3",
      "zashiki_warashi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "qilin": {
    "id": "qilin",
    "familyId": "qilin",
    "nameHe": "קילין",
    "nameEn": "Qilin",
    "category": "mythical_beast",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "qilin_stage_1",
      "qilin_stage_2",
      "qilin_stage_3",
      "qilin_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "jiangshi": {
    "id": "jiangshi",
    "familyId": "jiangshi",
    "nameHe": "ג׳יאנגשי — ערפד קופץ",
    "nameEn": "Jiangshi",
    "category": "undead",
    "origin": "China — Chinese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "jiangshi_stage_1",
      "jiangshi_stage_2",
      "jiangshi_stage_3",
      "jiangshi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "huli_jing": {
    "id": "huli_jing",
    "familyId": "huli_jing",
    "nameHe": "הולי ג׳ינג — רוח השועל",
    "nameEn": "Huli jing",
    "category": "fox_spirit",
    "origin": "China — Chinese folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "huli_jing_stage_1",
      "huli_jing_stage_2",
      "huli_jing_stage_3",
      "huli_jing_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "taotie": {
    "id": "taotie",
    "familyId": "taotie",
    "nameHe": "טאוטיה — המפלצת הרעבתנית",
    "nameEn": "Taotie",
    "category": "mythical_beast",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "taotie_stage_1",
      "taotie_stage_2",
      "taotie_stage_3",
      "taotie_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nian": {
    "id": "nian",
    "familyId": "nian",
    "nameHe": "ניאן — מפלצת השנה החדשה",
    "nameEn": "Nian",
    "category": "beast",
    "origin": "China — Chinese folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "nian_stage_1",
      "nian_stage_2",
      "nian_stage_3",
      "nian_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bai_ze": {
    "id": "bai_ze",
    "familyId": "bai_ze",
    "nameHe": "באי דזה — חיית החוכמה",
    "nameEn": "Bai Ze",
    "category": "mythical_beast",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "bai_ze_stage_1",
      "bai_ze_stage_2",
      "bai_ze_stage_3",
      "bai_ze_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "zhulong": {
    "id": "zhulong",
    "familyId": "zhulong",
    "nameHe": "ג׳ולונג — דרקון הלפיד",
    "nameEn": "Zhulong",
    "category": "dragon",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "zhulong_stage_1",
      "zhulong_stage_2",
      "zhulong_stage_3",
      "zhulong_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ao_dragon_turtle": {
    "id": "ao_dragon_turtle",
    "familyId": "ao_dragon_turtle",
    "nameHe": "או — צב־הדרקון",
    "nameEn": "Ao (dragon turtle)",
    "category": "dragon_turtle",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "ao_dragon_turtle_stage_1",
      "ao_dragon_turtle_stage_2",
      "ao_dragon_turtle_stage_3",
      "ao_dragon_turtle_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "longma": {
    "id": "longma",
    "familyId": "longma",
    "nameHe": "לונגמה — סוס־הדרקון",
    "nameEn": "Longma",
    "category": "hybrid_beast",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "longma_stage_1",
      "longma_stage_2",
      "longma_stage_3",
      "longma_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "peng_bird": {
    "id": "peng_bird",
    "familyId": "peng_bird",
    "nameHe": "פֶּנְג — ציפור ענקית",
    "nameEn": "Peng",
    "category": "giant_bird",
    "origin": "China — Chinese mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "peng_bird_stage_1",
      "peng_bird_stage_2",
      "peng_bird_stage_3",
      "peng_bird_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "dokkaebi": {
    "id": "dokkaebi",
    "familyId": "dokkaebi",
    "nameHe": "דוקֶבּי — רוח קוריאנית",
    "nameEn": "Dokkaebi",
    "category": "goblin",
    "origin": "Korea — Korean folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "dokkaebi_stage_1",
      "dokkaebi_stage_2",
      "dokkaebi_stage_3",
      "dokkaebi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bulgasari": {
    "id": "bulgasari",
    "familyId": "bulgasari",
    "nameHe": "בולגסארי — אוכל המתכת",
    "nameEn": "Bulgasari",
    "category": "metal_eater",
    "origin": "Korea — Korean folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "bulgasari_stage_1",
      "bulgasari_stage_2",
      "bulgasari_stage_3",
      "bulgasari_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "gumiho": {
    "id": "gumiho",
    "familyId": "gumiho",
    "nameHe": "גומיהו — שועל תשעת הזנבות הקוריאני",
    "nameEn": "Gumiho",
    "category": "fox_spirit",
    "origin": "Korea — Korean folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "gumiho_stage_1",
      "gumiho_stage_2",
      "gumiho_stage_3",
      "gumiho_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "imugi": {
    "id": "imugi",
    "familyId": "imugi",
    "nameHe": "אימוגי — נחש־דרקון",
    "nameEn": "Imugi",
    "category": "serpent_dragon",
    "origin": "Korea — Korean folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "imugi_stage_1",
      "imugi_stage_2",
      "imugi_stage_3",
      "imugi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "cerberus": {
    "id": "cerberus",
    "familyId": "cerberus",
    "nameHe": "קרברוס — כלב שלושת הראשים",
    "nameEn": "Cerberus",
    "category": "hellhound",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "cerberus_stage_1",
      "cerberus_stage_2",
      "cerberus_stage_3",
      "cerberus_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "hydra": {
    "id": "hydra",
    "familyId": "hydra",
    "nameHe": "ההידרה",
    "nameEn": "Hydra",
    "category": "multiheaded_serpent",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "hydra_stage_1",
      "hydra_stage_2",
      "hydra_stage_3",
      "hydra_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "chimera": {
    "id": "chimera",
    "familyId": "chimera",
    "nameHe": "כימרה",
    "nameEn": "Chimera",
    "category": "hybrid_beast",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "chimera_stage_1",
      "chimera_stage_2",
      "chimera_stage_3",
      "chimera_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "minotaur": {
    "id": "minotaur",
    "familyId": "minotaur",
    "nameHe": "המינוטאור",
    "nameEn": "Minotaur",
    "category": "hybrid_beast",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "minotaur_stage_1",
      "minotaur_stage_2",
      "minotaur_stage_3",
      "minotaur_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "gorgon": {
    "id": "gorgon",
    "familyId": "gorgon",
    "nameHe": "גורגונה (דמות מדוזה)",
    "nameEn": "Gorgon",
    "category": "serpent_humanoid",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "gorgon_stage_1",
      "gorgon_stage_2",
      "gorgon_stage_3",
      "gorgon_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "cyclops": {
    "id": "cyclops",
    "familyId": "cyclops",
    "nameHe": "קיקלופ",
    "nameEn": "Cyclops",
    "category": "giant",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "rare",
    "evolutionStages": [
      "cyclops_stage_1",
      "cyclops_stage_2",
      "cyclops_stage_3",
      "cyclops_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "sphinx": {
    "id": "sphinx",
    "familyId": "sphinx",
    "nameHe": "ספינקס",
    "nameEn": "Sphinx",
    "category": "guardian_beast",
    "origin": "Ancient Greece and Egypt — mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "sphinx_stage_1",
      "sphinx_stage_2",
      "sphinx_stage_3",
      "sphinx_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "harpy": {
    "id": "harpy",
    "familyId": "harpy",
    "nameHe": "הרפיה",
    "nameEn": "Harpy",
    "category": "winged_humanoid",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "rare",
    "evolutionStages": [
      "harpy_stage_1",
      "harpy_stage_2",
      "harpy_stage_3",
      "harpy_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "siren": {
    "id": "siren",
    "familyId": "siren",
    "nameHe": "סירנה",
    "nameEn": "Siren",
    "category": "enchanter",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "rare",
    "evolutionStages": [
      "siren_stage_1",
      "siren_stage_2",
      "siren_stage_3",
      "siren_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "scylla": {
    "id": "scylla",
    "familyId": "scylla",
    "nameHe": "סקילה",
    "nameEn": "Scylla",
    "category": "sea_monster",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "scylla_stage_1",
      "scylla_stage_2",
      "scylla_stage_3",
      "scylla_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "charybdis": {
    "id": "charybdis",
    "familyId": "charybdis",
    "nameHe": "כריבדיס",
    "nameEn": "Charybdis",
    "category": "sea_monster",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "charybdis_stage_1",
      "charybdis_stage_2",
      "charybdis_stage_3",
      "charybdis_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "griffin": {
    "id": "griffin",
    "familyId": "griffin",
    "nameHe": "גריפון",
    "nameEn": "Griffin",
    "category": "hybrid_beast",
    "origin": "Ancient Mediterranean and Near East — mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "griffin_stage_1",
      "griffin_stage_2",
      "griffin_stage_3",
      "griffin_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "lamia": {
    "id": "lamia",
    "familyId": "lamia",
    "nameHe": "למיה",
    "nameEn": "Lamia",
    "category": "night_demon",
    "origin": "Ancient Greek folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "lamia_stage_1",
      "lamia_stage_2",
      "lamia_stage_3",
      "lamia_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "empusa": {
    "id": "empusa",
    "familyId": "empusa",
    "nameHe": "אמפוזה",
    "nameEn": "Empusa",
    "category": "shapeshifter",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "empusa_stage_1",
      "empusa_stage_2",
      "empusa_stage_3",
      "empusa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "echidna": {
    "id": "echidna",
    "familyId": "echidna",
    "nameHe": "אכידנה — אם המפלצות",
    "nameEn": "Echidna",
    "category": "serpent_humanoid",
    "origin": "Ancient Greece — mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "echidna_stage_1",
      "echidna_stage_2",
      "echidna_stage_3",
      "echidna_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "fenrir": {
    "id": "fenrir",
    "familyId": "fenrir",
    "nameHe": "פנריר — הזאב הענק",
    "nameEn": "Fenrir",
    "category": "giant_wolf",
    "origin": "Norse mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "fenrir_stage_1",
      "fenrir_stage_2",
      "fenrir_stage_3",
      "fenrir_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "jormungandr": {
    "id": "jormungandr",
    "familyId": "jormungandr",
    "nameHe": "יורמונגנד — נחש העולם",
    "nameEn": "Jörmungandr",
    "category": "world_serpent",
    "origin": "Norse mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "jormungandr_stage_1",
      "jormungandr_stage_2",
      "jormungandr_stage_3",
      "jormungandr_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "draugr": {
    "id": "draugr",
    "familyId": "draugr",
    "nameHe": "דראוגר — מת־חי נורדי",
    "nameEn": "Draugr",
    "category": "undead",
    "origin": "Norse folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "draugr_stage_1",
      "draugr_stage_2",
      "draugr_stage_3",
      "draugr_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "troll": {
    "id": "troll",
    "familyId": "troll",
    "nameHe": "טרול",
    "nameEn": "Troll",
    "category": "giant_beast",
    "origin": "Scandinavian folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "troll_stage_1",
      "troll_stage_2",
      "troll_stage_3",
      "troll_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nokken": {
    "id": "nokken",
    "familyId": "nokken",
    "nameHe": "נוקן — רוח המים",
    "nameEn": "Nøkk / Nokken",
    "category": "water_spirit",
    "origin": "Scandinavian folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "nokken_stage_1",
      "nokken_stage_2",
      "nokken_stage_3",
      "nokken_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "hulder": {
    "id": "hulder",
    "familyId": "hulder",
    "nameHe": "הולדרה — אשת היער",
    "nameEn": "Hulder",
    "category": "forest_spirit",
    "origin": "Scandinavian folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "hulder_stage_1",
      "hulder_stage_2",
      "hulder_stage_3",
      "hulder_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mare_spirit": {
    "id": "mare_spirit",
    "familyId": "mare_spirit",
    "nameHe": "מארה — רוח הסיוטים",
    "nameEn": "Mare",
    "category": "night_spirit",
    "origin": "Germanic and Scandinavian folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "mare_spirit_stage_1",
      "mare_spirit_stage_2",
      "mare_spirit_stage_3",
      "mare_spirit_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kraken": {
    "id": "kraken",
    "familyId": "kraken",
    "nameHe": "קראקן",
    "nameEn": "Kraken",
    "category": "sea_monster",
    "origin": "Scandinavian maritime legend",
    "sourceType": "legend",
    "rarity": "legendary",
    "evolutionStages": [
      "kraken_stage_1",
      "kraken_stage_2",
      "kraken_stage_3",
      "kraken_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nidhogg": {
    "id": "nidhogg",
    "familyId": "nidhogg",
    "nameHe": "נידהוג — דרקון הכרסום",
    "nameEn": "Níðhöggr",
    "category": "dragon",
    "origin": "Norse mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "nidhogg_stage_1",
      "nidhogg_stage_2",
      "nidhogg_stage_3",
      "nidhogg_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "banshee": {
    "id": "banshee",
    "familyId": "banshee",
    "nameHe": "באנשי — מבשרת האבדון",
    "nameEn": "Banshee",
    "category": "death_spirit",
    "origin": "Irish folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "banshee_stage_1",
      "banshee_stage_2",
      "banshee_stage_3",
      "banshee_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kelpie": {
    "id": "kelpie",
    "familyId": "kelpie",
    "nameHe": "קלפי — סוס המים",
    "nameEn": "Kelpie",
    "category": "water_shapeshifter",
    "origin": "Scottish folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "kelpie_stage_1",
      "kelpie_stage_2",
      "kelpie_stage_3",
      "kelpie_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "selkie": {
    "id": "selkie",
    "familyId": "selkie",
    "nameHe": "סלקי — כלב־ים משנה־צורה",
    "nameEn": "Selkie",
    "category": "shapeshifter",
    "origin": "Scottish and Irish folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "selkie_stage_1",
      "selkie_stage_2",
      "selkie_stage_3",
      "selkie_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "dullahan": {
    "id": "dullahan",
    "familyId": "dullahan",
    "nameHe": "דולהאן — הפרש חסר הראש",
    "nameEn": "Dullahan",
    "category": "headless_rider",
    "origin": "Irish folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "dullahan_stage_1",
      "dullahan_stage_2",
      "dullahan_stage_3",
      "dullahan_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "puca": {
    "id": "puca",
    "familyId": "puca",
    "nameHe": "פּוּקָה — רוח משנה־צורה",
    "nameEn": "Púca",
    "category": "shapeshifter",
    "origin": "Irish folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "puca_stage_1",
      "puca_stage_2",
      "puca_stage_3",
      "puca_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "redcap": {
    "id": "redcap",
    "familyId": "redcap",
    "nameHe": "רדקאפ — הגובלין אדום־הכובע",
    "nameEn": "Redcap",
    "category": "goblin",
    "origin": "Scottish border folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "redcap_stage_1",
      "redcap_stage_2",
      "redcap_stage_3",
      "redcap_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "each_uisge": {
    "id": "each_uisge",
    "familyId": "each_uisge",
    "nameHe": "אֶךְ־אוּשְקֶה — סוס המים האפל",
    "nameEn": "Each-uisge",
    "category": "water_shapeshifter",
    "origin": "Scottish folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "each_uisge_stage_1",
      "each_uisge_stage_2",
      "each_uisge_stage_3",
      "each_uisge_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "cu_sith": {
    "id": "cu_sith",
    "familyId": "cu_sith",
    "nameHe": "קו־שי — כלב הפיות",
    "nameEn": "Cù-sìth",
    "category": "fae_hound",
    "origin": "Scottish Gaelic folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "cu_sith_stage_1",
      "cu_sith_stage_2",
      "cu_sith_stage_3",
      "cu_sith_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "rusalka": {
    "id": "rusalka",
    "familyId": "rusalka",
    "nameHe": "רוסאלקה — רוח המים",
    "nameEn": "Rusalka",
    "category": "water_spirit",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "rusalka_stage_1",
      "rusalka_stage_2",
      "rusalka_stage_3",
      "rusalka_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "leshy": {
    "id": "leshy",
    "familyId": "leshy",
    "nameHe": "לשי — שומר היער",
    "nameEn": "Leshy",
    "category": "forest_spirit",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "leshy_stage_1",
      "leshy_stage_2",
      "leshy_stage_3",
      "leshy_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "domovoi": {
    "id": "domovoi",
    "familyId": "domovoi",
    "nameHe": "דומובוי — רוח הבית",
    "nameEn": "Domovoi",
    "category": "house_spirit",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "uncommon",
    "evolutionStages": [
      "domovoi_stage_1",
      "domovoi_stage_2",
      "domovoi_stage_3",
      "domovoi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kikimora": {
    "id": "kikimora",
    "familyId": "kikimora",
    "nameHe": "קיקימורה",
    "nameEn": "Kikimora",
    "category": "house_spirit",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "kikimora_stage_1",
      "kikimora_stage_2",
      "kikimora_stage_3",
      "kikimora_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "vodyanoy": {
    "id": "vodyanoy",
    "familyId": "vodyanoy",
    "nameHe": "וודיאנוי — זקן המים",
    "nameEn": "Vodyanoy",
    "category": "water_spirit",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "vodyanoy_stage_1",
      "vodyanoy_stage_2",
      "vodyanoy_stage_3",
      "vodyanoy_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "baba_yaga": {
    "id": "baba_yaga",
    "familyId": "baba_yaga",
    "nameHe": "באבא יאגה",
    "nameEn": "Baba Yaga",
    "category": "witch",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "baba_yaga_stage_1",
      "baba_yaga_stage_2",
      "baba_yaga_stage_3",
      "baba_yaga_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "zmey_gorynych": {
    "id": "zmey_gorynych",
    "familyId": "zmey_gorynych",
    "nameHe": "זמיי גוריניץ׳ — הדרקון התלת־ראשי",
    "nameEn": "Zmey Gorynych",
    "category": "dragon",
    "origin": "East Slavic folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "zmey_gorynych_stage_1",
      "zmey_gorynych_stage_2",
      "zmey_gorynych_stage_3",
      "zmey_gorynych_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "koschei": {
    "id": "koschei",
    "familyId": "koschei",
    "nameHe": "קושצ׳יי בן־המוות",
    "nameEn": "Koschei the Deathless",
    "category": "undying_sorcerer",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "koschei_stage_1",
      "koschei_stage_2",
      "koschei_stage_3",
      "koschei_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "upyr": {
    "id": "upyr",
    "familyId": "upyr",
    "nameHe": "אופיר — ערפד סלאבי",
    "nameEn": "Upyr",
    "category": "vampire",
    "origin": "Slavic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "upyr_stage_1",
      "upyr_stage_2",
      "upyr_stage_3",
      "upyr_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "jinn": {
    "id": "jinn",
    "familyId": "jinn",
    "nameHe": "ג׳ין",
    "nameEn": "Jinn",
    "category": "spirit",
    "origin": "Arabian and wider Middle Eastern folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "jinn_stage_1",
      "jinn_stage_2",
      "jinn_stage_3",
      "jinn_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ghoul": {
    "id": "ghoul",
    "familyId": "ghoul",
    "nameHe": "ע׳ול — ג׳ול",
    "nameEn": "Ghoul",
    "category": "grave_demon",
    "origin": "Arabic folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "ghoul_stage_1",
      "ghoul_stage_2",
      "ghoul_stage_3",
      "ghoul_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ifrit": {
    "id": "ifrit",
    "familyId": "ifrit",
    "nameHe": "עִפְרִית",
    "nameEn": "Ifrit",
    "category": "fire_spirit",
    "origin": "Arabic and Islamic folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "ifrit_stage_1",
      "ifrit_stage_2",
      "ifrit_stage_3",
      "ifrit_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "marid": {
    "id": "marid",
    "familyId": "marid",
    "nameHe": "מאריד",
    "nameEn": "Marid",
    "category": "water_spirit",
    "origin": "Arabian folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "marid_stage_1",
      "marid_stage_2",
      "marid_stage_3",
      "marid_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "roc": {
    "id": "roc",
    "familyId": "roc",
    "nameHe": "רוח — ציפור הרוק",
    "nameEn": "Roc",
    "category": "giant_bird",
    "origin": "Middle Eastern and Persianate tales",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "roc_stage_1",
      "roc_stage_2",
      "roc_stage_3",
      "roc_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "simurgh": {
    "id": "simurgh",
    "familyId": "simurgh",
    "nameHe": "סימורג — ציפור החוכמה",
    "nameEn": "Simurgh",
    "category": "mythical_bird",
    "origin": "Persian mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "simurgh_stage_1",
      "simurgh_stage_2",
      "simurgh_stage_3",
      "simurgh_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ammit": {
    "id": "ammit",
    "familyId": "ammit",
    "nameHe": "אממית — זוללת הלבבות",
    "nameEn": "Ammit",
    "category": "underworld_beast",
    "origin": "Ancient Egyptian mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "ammit_stage_1",
      "ammit_stage_2",
      "ammit_stage_3",
      "ammit_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "apophis": {
    "id": "apophis",
    "familyId": "apophis",
    "nameHe": "אפופיס — נחש הכאוס",
    "nameEn": "Apep / Apophis",
    "category": "chaos_serpent",
    "origin": "Ancient Egyptian mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "apophis_stage_1",
      "apophis_stage_2",
      "apophis_stage_3",
      "apophis_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mami_wata": {
    "id": "mami_wata",
    "familyId": "mami_wata",
    "nameHe": "מאמי ואטה — רוח המים",
    "nameEn": "Mami Wata",
    "category": "water_spirit",
    "origin": "West and Central African and African-diasporic traditions",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "mami_wata_stage_1",
      "mami_wata_stage_2",
      "mami_wata_stage_3",
      "mami_wata_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tokoloshe": {
    "id": "tokoloshe",
    "familyId": "tokoloshe",
    "nameHe": "טוקולוש",
    "nameEn": "Tokoloshe",
    "category": "trickster_spirit",
    "origin": "Southern African folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "tokoloshe_stage_1",
      "tokoloshe_stage_2",
      "tokoloshe_stage_3",
      "tokoloshe_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "grootslang": {
    "id": "grootslang",
    "familyId": "grootslang",
    "nameHe": "גרוטסלאנג",
    "nameEn": "Grootslang",
    "category": "cave_serpent",
    "origin": "South African legend",
    "sourceType": "legend",
    "rarity": "legendary",
    "evolutionStages": [
      "grootslang_stage_1",
      "grootslang_stage_2",
      "grootslang_stage_3",
      "grootslang_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "inkanyamba": {
    "id": "inkanyamba",
    "familyId": "inkanyamba",
    "nameHe": "אינקניאמבה — נחש הסערות",
    "nameEn": "Inkanyamba",
    "category": "storm_serpent",
    "origin": "Southern African legend",
    "sourceType": "legend",
    "rarity": "legendary",
    "evolutionStages": [
      "inkanyamba_stage_1",
      "inkanyamba_stage_2",
      "inkanyamba_stage_3",
      "inkanyamba_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kongamato": {
    "id": "kongamato",
    "familyId": "kongamato",
    "nameHe": "קונגמאטו",
    "nameEn": "Kongamato",
    "category": "winged_cryptid",
    "origin": "Central African cryptid lore",
    "sourceType": "cryptid",
    "rarity": "epic",
    "evolutionStages": [
      "kongamato_stage_1",
      "kongamato_stage_2",
      "kongamato_stage_3",
      "kongamato_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "popobawa": {
    "id": "popobawa",
    "familyId": "popobawa",
    "nameHe": "פופובאווה",
    "nameEn": "Popobawa",
    "category": "shadow_beast",
    "origin": "Zanzibar folklore and urban legend",
    "sourceType": "urban_legend",
    "rarity": "epic",
    "evolutionStages": [
      "popobawa_stage_1",
      "popobawa_stage_2",
      "popobawa_stage_3",
      "popobawa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "sasabonsam": {
    "id": "sasabonsam",
    "familyId": "sasabonsam",
    "nameHe": "סאסאבונסאם",
    "nameEn": "Sasabonsam",
    "category": "forest_vampire",
    "origin": "Akan folklore, Ghana",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "sasabonsam_stage_1",
      "sasabonsam_stage_2",
      "sasabonsam_stage_3",
      "sasabonsam_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "anansi": {
    "id": "anansi",
    "familyId": "anansi",
    "nameHe": "אננסי — עכביש התחבולות",
    "nameEn": "Anansi",
    "category": "trickster_spider",
    "origin": "Akan and Ashanti folklore, Ghana",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "anansi_stage_1",
      "anansi_stage_2",
      "anansi_stage_3",
      "anansi_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "rakshasa": {
    "id": "rakshasa",
    "familyId": "rakshasa",
    "nameHe": "רקשאסה",
    "nameEn": "Rakshasa",
    "category": "demon",
    "origin": "Indian mythology and folklore",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "rakshasa_stage_1",
      "rakshasa_stage_2",
      "rakshasa_stage_3",
      "rakshasa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "naga": {
    "id": "naga",
    "familyId": "naga",
    "nameHe": "נאגה — נחש־רוח",
    "nameEn": "Nāga",
    "category": "serpent_spirit",
    "origin": "South Asian Hindu, Buddhist, and Jain traditions",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "naga_stage_1",
      "naga_stage_2",
      "naga_stage_3",
      "naga_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "vetala": {
    "id": "vetala",
    "familyId": "vetala",
    "nameHe": "וטאלה — רוח אוחזת־גופות",
    "nameEn": "Vetala",
    "category": "undead_spirit",
    "origin": "Indian folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "vetala_stage_1",
      "vetala_stage_2",
      "vetala_stage_3",
      "vetala_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "pisacha": {
    "id": "pisacha",
    "familyId": "pisacha",
    "nameHe": "פישאצ׳ה",
    "nameEn": "Pishacha",
    "category": "ghoul",
    "origin": "Indian mythology and folklore",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "pisacha_stage_1",
      "pisacha_stage_2",
      "pisacha_stage_3",
      "pisacha_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "makara": {
    "id": "makara",
    "familyId": "makara",
    "nameHe": "מקארה — יצור מים כלאיים",
    "nameEn": "Makara",
    "category": "aquatic_hybrid",
    "origin": "South Asian mythology",
    "sourceType": "mythology",
    "rarity": "epic",
    "evolutionStages": [
      "makara_stage_1",
      "makara_stage_2",
      "makara_stage_3",
      "makara_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "garuda": {
    "id": "garuda",
    "familyId": "garuda",
    "nameHe": "גרודה — עוף־המיתוס",
    "nameEn": "Garuda",
    "category": "mythical_bird",
    "origin": "South and Southeast Asian traditions",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "garuda_stage_1",
      "garuda_stage_2",
      "garuda_stage_3",
      "garuda_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "churel": {
    "id": "churel",
    "familyId": "churel",
    "nameHe": "צ׳ורייל — רוח נקמנית",
    "nameEn": "Churel",
    "category": "ghost",
    "origin": "South Asian folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "churel_stage_1",
      "churel_stage_2",
      "churel_stage_3",
      "churel_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "brahmarakshasa": {
    "id": "brahmarakshasa",
    "familyId": "brahmarakshasa",
    "nameHe": "ברהמרקשאסה",
    "nameEn": "Brahmarakshasa",
    "category": "revenant_demon",
    "origin": "Indian folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "brahmarakshasa_stage_1",
      "brahmarakshasa_stage_2",
      "brahmarakshasa_stage_3",
      "brahmarakshasa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "la_llorona": {
    "id": "la_llorona",
    "familyId": "la_llorona",
    "nameHe": "לה יורונה — האישה הבוכייה",
    "nameEn": "La Llorona",
    "category": "weeping_ghost",
    "origin": "Mexican and Latin American folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "la_llorona_stage_1",
      "la_llorona_stage_2",
      "la_llorona_stage_3",
      "la_llorona_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "chupacabra": {
    "id": "chupacabra",
    "familyId": "chupacabra",
    "nameHe": "צ׳ופקברה",
    "nameEn": "Chupacabra",
    "category": "cryptid",
    "origin": "Puerto Rican and Latin American cryptid lore",
    "sourceType": "cryptid",
    "rarity": "rare",
    "evolutionStages": [
      "chupacabra_stage_1",
      "chupacabra_stage_2",
      "chupacabra_stage_3",
      "chupacabra_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "cadejo": {
    "id": "cadejo",
    "familyId": "cadejo",
    "nameHe": "קָדֵחוֹ — כלב הצללים",
    "nameEn": "Cadejo",
    "category": "supernatural_hound",
    "origin": "Central American folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "cadejo_stage_1",
      "cadejo_stage_2",
      "cadejo_stage_3",
      "cadejo_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mapinguari": {
    "id": "mapinguari",
    "familyId": "mapinguari",
    "nameHe": "מפינגוארי",
    "nameEn": "Mapinguari",
    "category": "forest_beast",
    "origin": "Amazonian folklore and cryptid lore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "mapinguari_stage_1",
      "mapinguari_stage_2",
      "mapinguari_stage_3",
      "mapinguari_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "curupira": {
    "id": "curupira",
    "familyId": "curupira",
    "nameHe": "קורופירה — שומר היער",
    "nameEn": "Curupira",
    "category": "forest_guardian",
    "origin": "Brazilian Indigenous folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "curupira_stage_1",
      "curupira_stage_2",
      "curupira_stage_3",
      "curupira_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "boitata": {
    "id": "boitata",
    "familyId": "boitata",
    "nameHe": "בויטאטה — נחש האש",
    "nameEn": "Boitatá",
    "category": "fire_serpent",
    "origin": "Brazilian folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "boitata_stage_1",
      "boitata_stage_2",
      "boitata_stage_3",
      "boitata_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "saci": {
    "id": "saci",
    "familyId": "saci",
    "nameHe": "סאסי — רוח התחבולות",
    "nameEn": "Saci",
    "category": "trickster_spirit",
    "origin": "Brazilian folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "saci_stage_1",
      "saci_stage_2",
      "saci_stage_3",
      "saci_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "camazotz": {
    "id": "camazotz",
    "familyId": "camazotz",
    "nameHe": "קמאסוץ — עטלף המוות",
    "nameEn": "Camazotz",
    "category": "bat_being",
    "origin": "Maya mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "camazotz_stage_1",
      "camazotz_stage_2",
      "camazotz_stage_3",
      "camazotz_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bigfoot": {
    "id": "bigfoot",
    "familyId": "bigfoot",
    "nameHe": "ביגפוט / ססקוואץ׳",
    "nameEn": "Bigfoot / Sasquatch",
    "category": "cryptid",
    "origin": "North American cryptid lore",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "bigfoot_stage_1",
      "bigfoot_stage_2",
      "bigfoot_stage_3",
      "bigfoot_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mothman": {
    "id": "mothman",
    "familyId": "mothman",
    "nameHe": "איש העש",
    "nameEn": "Mothman",
    "category": "winged_cryptid",
    "origin": "West Virginia, United States — modern legend",
    "sourceType": "urban_legend",
    "rarity": "epic",
    "evolutionStages": [
      "mothman_stage_1",
      "mothman_stage_2",
      "mothman_stage_3",
      "mothman_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "jersey_devil": {
    "id": "jersey_devil",
    "familyId": "jersey_devil",
    "nameHe": "השטן מג׳רזי",
    "nameEn": "Jersey Devil",
    "category": "winged_beast",
    "origin": "New Jersey, United States — regional legend",
    "sourceType": "urban_legend",
    "rarity": "legendary",
    "evolutionStages": [
      "jersey_devil_stage_1",
      "jersey_devil_stage_2",
      "jersey_devil_stage_3",
      "jersey_devil_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "skunk_ape": {
    "id": "skunk_ape",
    "familyId": "skunk_ape",
    "nameHe": "איש הקוף המסריח",
    "nameEn": "Skunk Ape",
    "category": "ape_cryptid",
    "origin": "Florida, United States — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "epic",
    "evolutionStages": [
      "skunk_ape_stage_1",
      "skunk_ape_stage_2",
      "skunk_ape_stage_3",
      "skunk_ape_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "snallygaster": {
    "id": "snallygaster",
    "familyId": "snallygaster",
    "nameHe": "סנאליגאסטר",
    "nameEn": "Snallygaster",
    "category": "winged_drake",
    "origin": "Maryland, United States — regional legend",
    "sourceType": "urban_legend",
    "rarity": "epic",
    "evolutionStages": [
      "snallygaster_stage_1",
      "snallygaster_stage_2",
      "snallygaster_stage_3",
      "snallygaster_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "flatwoods_monster": {
    "id": "flatwoods_monster",
    "familyId": "flatwoods_monster",
    "nameHe": "מפלצת פלאטוודס",
    "nameEn": "Flatwoods Monster",
    "category": "alien_cryptid",
    "origin": "West Virginia, United States — modern legend",
    "sourceType": "urban_legend",
    "rarity": "epic",
    "evolutionStages": [
      "flatwoods_monster_stage_1",
      "flatwoods_monster_stage_2",
      "flatwoods_monster_stage_3",
      "flatwoods_monster_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "champ": {
    "id": "champ",
    "familyId": "champ",
    "nameHe": "צ׳אמפ — מפלצת אגם שמפליין",
    "nameEn": "Champ",
    "category": "lake_monster",
    "origin": "Lake Champlain, North America — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "champ_stage_1",
      "champ_stage_2",
      "champ_stage_3",
      "champ_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "hodag": {
    "id": "hodag",
    "familyId": "hodag",
    "nameHe": "הודאג",
    "nameEn": "Hodag",
    "category": "forest_beast",
    "origin": "Wisconsin, United States — regional folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "hodag_stage_1",
      "hodag_stage_2",
      "hodag_stage_3",
      "hodag_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "loch_ness_monster": {
    "id": "loch_ness_monster",
    "familyId": "loch_ness_monster",
    "nameHe": "מפלצת לוך נס",
    "nameEn": "Loch Ness Monster",
    "category": "lake_monster",
    "origin": "Scotland — lake monster legend",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "loch_ness_monster_stage_1",
      "loch_ness_monster_stage_2",
      "loch_ness_monster_stage_3",
      "loch_ness_monster_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "ogopogo": {
    "id": "ogopogo",
    "familyId": "ogopogo",
    "nameHe": "אוגופוגו",
    "nameEn": "Ogopogo",
    "category": "lake_monster",
    "origin": "British Columbia, Canada — lake monster legend",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "ogopogo_stage_1",
      "ogopogo_stage_2",
      "ogopogo_stage_3",
      "ogopogo_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "cadborosaurus": {
    "id": "cadborosaurus",
    "familyId": "cadborosaurus",
    "nameHe": "קדבורוזאורוס",
    "nameEn": "Cadborosaurus",
    "category": "sea_serpent",
    "origin": "Pacific Northwest — sea-serpent cryptid lore",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "cadborosaurus_stage_1",
      "cadborosaurus_stage_2",
      "cadborosaurus_stage_3",
      "cadborosaurus_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "yeti": {
    "id": "yeti",
    "familyId": "yeti",
    "nameHe": "יטי — איש השלג",
    "nameEn": "Yeti",
    "category": "mountain_cryptid",
    "origin": "Himalayas — cryptid and folklore traditions",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "yeti_stage_1",
      "yeti_stage_2",
      "yeti_stage_3",
      "yeti_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "yowie": {
    "id": "yowie",
    "familyId": "yowie",
    "nameHe": "יובי",
    "nameEn": "Yowie",
    "category": "ape_cryptid",
    "origin": "Australia — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "epic",
    "evolutionStages": [
      "yowie_stage_1",
      "yowie_stage_2",
      "yowie_stage_3",
      "yowie_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bunyip": {
    "id": "bunyip",
    "familyId": "bunyip",
    "nameHe": "בוניפ",
    "nameEn": "Bunyip",
    "category": "water_beast",
    "origin": "Aboriginal Australian traditions and folklore",
    "sourceType": "folklore",
    "rarity": "legendary",
    "evolutionStages": [
      "bunyip_stage_1",
      "bunyip_stage_2",
      "bunyip_stage_3",
      "bunyip_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mongolian_death_worm": {
    "id": "mongolian_death_worm",
    "familyId": "mongolian_death_worm",
    "nameHe": "תולעת המוות המונגולית",
    "nameEn": "Mongolian Death Worm",
    "category": "desert_cryptid",
    "origin": "Gobi Desert — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "mongolian_death_worm_stage_1",
      "mongolian_death_worm_stage_2",
      "mongolian_death_worm_stage_3",
      "mongolian_death_worm_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "mokele_mbembe": {
    "id": "mokele_mbembe",
    "familyId": "mokele_mbembe",
    "nameHe": "מוקלה־מבמבה",
    "nameEn": "Mokele-mbembe",
    "category": "river_beast",
    "origin": "Congo Basin — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "legendary",
    "evolutionStages": [
      "mokele_mbembe_stage_1",
      "mokele_mbembe_stage_2",
      "mokele_mbembe_stage_3",
      "mokele_mbembe_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "pontianak": {
    "id": "pontianak",
    "familyId": "pontianak",
    "nameHe": "פונטיאנאק — רוח נקמנית",
    "nameEn": "Pontianak",
    "category": "ghost",
    "origin": "Malay and Indonesian folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "pontianak_stage_1",
      "pontianak_stage_2",
      "pontianak_stage_3",
      "pontianak_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "penanggalan": {
    "id": "penanggalan",
    "familyId": "penanggalan",
    "nameHe": "פנאנגלאן",
    "nameEn": "Penanggalan",
    "category": "night_horror",
    "origin": "Malay folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "penanggalan_stage_1",
      "penanggalan_stage_2",
      "penanggalan_stage_3",
      "penanggalan_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "toyol": {
    "id": "toyol",
    "familyId": "toyol",
    "nameHe": "טויול — רוח שובבה",
    "nameEn": "Toyol",
    "category": "imp_spirit",
    "origin": "Malay folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "toyol_stage_1",
      "toyol_stage_2",
      "toyol_stage_3",
      "toyol_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "aswang": {
    "id": "aswang",
    "familyId": "aswang",
    "nameHe": "אסוואנג",
    "nameEn": "Aswang",
    "category": "shapeshifter",
    "origin": "Philippine folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "aswang_stage_1",
      "aswang_stage_2",
      "aswang_stage_3",
      "aswang_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "manananggal": {
    "id": "manananggal",
    "familyId": "manananggal",
    "nameHe": "מנננגאל",
    "nameEn": "Manananggal",
    "category": "winged_shapeshifter",
    "origin": "Philippine folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "manananggal_stage_1",
      "manananggal_stage_2",
      "manananggal_stage_3",
      "manananggal_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tikbalang": {
    "id": "tikbalang",
    "familyId": "tikbalang",
    "nameHe": "טיקבלנג",
    "nameEn": "Tikbalang",
    "category": "horse_humanoid",
    "origin": "Philippine folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "tikbalang_stage_1",
      "tikbalang_stage_2",
      "tikbalang_stage_3",
      "tikbalang_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "kapre": {
    "id": "kapre",
    "familyId": "kapre",
    "nameHe": "קפרה",
    "nameEn": "Kapre",
    "category": "tree_giant",
    "origin": "Philippine folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "kapre_stage_1",
      "kapre_stage_2",
      "kapre_stage_3",
      "kapre_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "tiyanak": {
    "id": "tiyanak",
    "familyId": "tiyanak",
    "nameHe": "טיאנאק",
    "nameEn": "Tiyanak",
    "category": "undead_imp",
    "origin": "Philippine folklore",
    "sourceType": "folklore",
    "rarity": "rare",
    "evolutionStages": [
      "tiyanak_stage_1",
      "tiyanak_stage_2",
      "tiyanak_stage_3",
      "tiyanak_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "krasue": {
    "id": "krasue",
    "familyId": "krasue",
    "nameHe": "קראסואה",
    "nameEn": "Krasue",
    "category": "floating_ghost",
    "origin": "Thai and mainland Southeast Asian folklore",
    "sourceType": "folklore",
    "rarity": "epic",
    "evolutionStages": [
      "krasue_stage_1",
      "krasue_stage_2",
      "krasue_stage_3",
      "krasue_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "bakunawa": {
    "id": "bakunawa",
    "familyId": "bakunawa",
    "nameHe": "בקונאווה — נחש־הים בולע הירח",
    "nameEn": "Bakunawa",
    "category": "moon_eating_serpent",
    "origin": "Philippine mythology",
    "sourceType": "mythology",
    "rarity": "legendary",
    "evolutionStages": [
      "bakunawa_stage_1",
      "bakunawa_stage_2",
      "bakunawa_stage_3",
      "bakunawa_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  },
  "nandi_bear": {
    "id": "nandi_bear",
    "familyId": "nandi_bear",
    "nameHe": "דוב נאנדי",
    "nameEn": "Nandi Bear",
    "category": "cryptid_beast",
    "origin": "East Africa — cryptid lore",
    "sourceType": "cryptid",
    "rarity": "epic",
    "evolutionStages": [
      "nandi_bear_stage_1",
      "nandi_bear_stage_2",
      "nandi_bear_stage_3",
      "nandi_bear_stage_4"
    ],
    "stageNamesHe": [
      "התעוררות",
      "צורה מתפתחת",
      "צורה עוצמתית",
      "צורה אגדית"
    ],
    "stageNamesEn": [
      "Awakening",
      "Developing Form",
      "Empowered Form",
      "Legendary Form"
    ]
  }
  };
  Object.assign(catalog, additions);
  window.MERGIVOLVE_SPECIES_COUNT = Object.keys(catalog).length;
})();
