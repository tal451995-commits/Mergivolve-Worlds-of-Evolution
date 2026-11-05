// בסיס הנתונים המלא של כל הדרקונים והיצורים במשחק
const ALL_DRAGONS = [
  {
    id: "cozy_crystal_dragon",
    nameHebrew: "דרקון גביש עטוף",
    nameEnglish: "Cozy Crystal Dragon",
    image: "cozy_crystal_dragon.jpg", // התמונה ששמרת[span_11](start_span)[span_11](end_span)[span_12](start_span)[span_12](end_span)
    element: "טבע / קריסטל",
    tier: 1, // דרגת תינוק[span_13](start_span)[span_13](end_span)[span_14](start_span)[span_14](end_span)
    description: "דרקון קטן ומתוק העטוף בשמיכה חמה בתוך מערת קריסטלים[span_15](start_span)[span_15](end_span)[span_16](start_span)[span_16](end_span). משתמש באנרגיית גבישים כדי לרפא ולגן על עצמו[span_17](start_span)[span_17](end_span)[span_18](start_span)[span_18](end_span).",
    stats: { hp: 100, attack: 25, defense: 50, speed: 20 },
    abilities: [
      { name: "נשיפת גבישים", damage: 15, description: "יורק רסיסי קריסטל קטנים" },
      { name: "חיבוק מעטפת", heal: 30, description: "מתעטף בשמיכה ומרפא חיים" }
    ],
    nextEvolution: "forest_hatchling"
  },
  {
    id: "volcanic_baby_dino",
    nameHebrew: "דינו הר-געש",
    nameEnglish: "Volcanic Baby Dino",
    image: "volcanic_baby_dino.jpg", // התמונה ששמרת[span_19](start_span)[span_19](end_span)[span_20](start_span)[span_20](end_span)
    element: "אדמה / אש",
    tier: 1, // דרגת תינוק[span_21](start_span)[span_21](end_span)[span_22](start_span)[span_22](end_span)
    description: "תינוק דינוזאור שחי באזורים געשיים[span_23](start_span)[span_23](end_span)[span_24](start_span)[span_24](end_span). גופו עמיד לחום והוא קופץ בעוצמה על אויביו[span_25](start_span)[span_25](end_span)[span_26](start_span)[span_26](end_span).",
    stats: { hp: 120, attack: 40, defense: 45, speed: 30 },
    abilities: [
      { name: "מכה געשית", damage: 25, description: "מכה עם הזנב ומעפיל אבק שריפה" },
      { name: "שאגה קטנה", damage: 10, description: "מפחיד את היריב ומוריד לו הגנה" }
    ],
    nextEvolution: "red_hatchling"
  },
  {
    id: "azure_baby_drake",
    nameHebrew: "דרקון מים צעיר",
    nameEnglish: "Azure Baby Drake",
    image: "azure_baby_drake.jpg", // התמונה ששמרת[span_27](start_span)[span_27](end_span)[span_28](start_span)[span_28](end_span)[span_29](start_span)[span_29](end_span)
    element: "מים / קרח",
    tier: 1, // דרגת תינוק[span_30](start_span)[span_30](end_span)[span_31](start_span)[span_31](end_span)[span_32](start_span)[span_32](end_span)
    description: "דרקון תכלת סקרן שחי במערות נטיפים מים[span_33](start_span)[span_33](end_span)[span_34](start_span)[span_34](end_span)[span_35](start_span)[span_35](end_span). שוחה במהירות ויכול להתיז מים קפואים[span_36](start_span)[span_36](end_span)[span_37](start_span)[span_37](end_span)[span_38](start_span)[span_38](end_span).",
    stats: { hp: 95, attack: 35, defense: 35, speed: 50 },
    abilities: [
      { name: "בועת מים", damage: 20, description: "יוצר בועה הכלואת את היריב" },
      { name: "נחשול צעיר", damage: 30, description: "שוטף את השדה בגל מים" }
    ],
    nextEvolution: "coral_sentinel"
  },
  {
    id: "red_hatchling",
    nameHebrew: "דרקון אדום צעיר",
    nameEnglish: "Red Hatchling",
    image: "red_hatchling.jpg", // התמונה ששמרת[span_39](start_span)[span_39](end_span)[span_40](start_span)[span_40](end_span)[span_41](start_span)[span_41](end_span)
    element: "אש",
    tier: 1, // דרגת תינוק[span_42](start_span)[span_42](end_span)[span_43](start_span)[span_43](end_span)[span_44](start_span)[span_44](end_span)
    description: "דרקון אדום חמוד עם כנפיים קטנות ועיניים גדולות[span_45](start_span)[span_45](end_span)[span_46](start_span)[span_46](end_span)[span_47](start_span)[span_47](end_span). מלא באנרגיית אש[span_48](start_span)[span_48](end_span)[span_49](start_span)[span_49](end_span)[span_50](start_span)[span_50](end_span).",
    stats: { hp: 90, attack: 45, defense: 30, speed: 40 },
    abilities: [
      { name: "גיץ אש", damage: 25, description: "יורק כדור אש קטן" }
    ],
    nextEvolution: "ember_heart"
  },
  {
    id: "ember_heart",
    nameHebrew: "דרקון הלהבה",
    nameEnglish: "Ember-Heart",
    image: "ember_heart.jpg", // התמונה ששמרת[span_51](start_span)[span_51](end_span)[span_52](start_span)[span_52](end_span)
    element: "אש",
    tier: 2, // דרגה בינונית[span_53](start_span)[span_53](end_span)[span_54](start_span)[span_54](end_span)
    description: "דרקון אש מפותח שראשו וזנבו בוערים בלהבות זקופות[span_55](start_span)[span_55](end_span)[span_56](start_span)[span_56](end_span). עוצמתי ומהיר מאוד[span_57](start_span)[span_57](end_span)[span_58](start_span)[span_58](end_span).",
    stats: { hp: 180, attack: 90, defense: 60, speed: 75 },
    abilities: [
      { name: "סערת להבות", damage: 65, description: "מציף את הזירה באש בוערת" },
      { name: "זנב אש", damage: 45, description: "מכה חזקה עם הזנב הבוער" }
    ],
    previousEvolution: "red_hatchling"
  },
  {
    id: "coral_sentinel",
    nameHebrew: "שומר האלמוגים",
    nameEnglish: "Coral Sentinel",
    image: "coral_sentinel.jpg", // התמונה ששמרת[span_59](start_span)[span_59](end_span)[span_60](start_span)[span_60](end_span)
    element: "מים / אלמוגים",
    tier: 3, // דרגה גבוהה[span_61](start_span)[span_61](end_span)[span_62](start_span)[span_62](end_span)
    description: "דרקון ימי מרהיב ביופיו המעוטר באלמוגים וסנפירים זוהרים[span_63](start_span)[span_63](end_span)[span_64](start_span)[span_64](end_span). שולט באוקיינוסים[span_65](start_span)[span_65](end_span)[span_66](start_span)[span_66](end_span).",
    stats: { hp: 280, attack: 130, defense: 140, speed: 90 },
    abilities: [
      { name: "ציקון מעמקים", damage: 110, description: "מזמן נחשול מים אדיר" },
      { name: "מגן אלמוגים", defenseBoost: 50, description: "מעלה את ההגנה מעבר למקס" }
    ],
    previousEvolution: "azure_baby_drake"
  },
  {
    id: "aurora_fennec",
    nameHebrew: "שועל הזוהר הצפוני",
    nameEnglish: "Aurora Fennec",
    image: "aurora_fennec.jpg", // התמונה ששמרת[span_67](start_span)[span_67](end_span)[span_68](start_span)[span_68](end_span)
    element: "קריסטל / אוויר",
    tier: 2, // דרגה בינונית[span_69](start_span)[span_69](end_span)[span_70](start_span)[span_70](end_span)
    description: "שועל קסום בעל פרווה סגולה זוהרת שחי תחת אורות הזוהר הצפוני[span_71](start_span)[span_71](end_span)[span_72](start_span)[span_72](end_span). מוקף בגבישי קסם[span_73](start_span)[span_73](end_span)[span_74](start_span)[span_74](end_span).",
    stats: { hp: 150, attack: 80, defense: 70, speed: 110 },
    abilities: [
      { name: "אור הזוהר", damage: 55, description: "ממוטט קרני אור מעוורות" },
      { name: "צעד קריסטל", speedBoost: 40, description: "מגדיל את המהירות" }
    ]
  },
  {
    id: "geode_dragon",
    nameHebrew: "דרקון הגאודה",
    nameEnglish: "Geode Dragon",
    image: "geode_dragon.jpg", // התמונה ששמרת[span_75](start_span)[span_75](end_span)[span_76](start_span)[span_76](end_span)
    element: "קריסטל / אופל",
    tier: 2, // דרגה בינונית[span_77](start_span)[span_77](end_span)[span_78](start_span)[span_78](end_span)
    description: "דרקון סגול המכוסה באבני חן קשות ועיניים ירוקות זוהרות[span_79](start_span)[span_79](end_span)[span_80](start_span)[span_80](end_span). בעל הגנה בלתי חדירה[span_81](start_span)[span_81](end_span)[span_82](start_span)[span_82](end_span).",
    stats: { hp: 210, attack: 70, defense: 160, speed: 35 },
    abilities: [
      { name: "ריסוק אבן", damage: 60, description: "מכה קשה שמפחיתה הגנת אויב" },
      { name: "מעטפת גביש", defenseBoost: 60, description: "חוסם חלק מעוצמת הנזק" }
    ]
  },
  {
    id: "celestial_wyrm",
    nameHebrew: "דרקון השמיים המוזהב",
    nameEnglish: "Celestial Wyrm",
    image: "celestial_wyrm.jpg", // התמונה ששמרת[span_83](start_span)[span_83](end_span)[span_84](start_span)[span_84](end_span)
    element: "אור / זהב אגדי",
    tier: 4, // דרגה אגדית[span_85](start_span)[span_85](end_span)[span_86](start_span)[span_86](end_span)
    description: "הדרקון האגדי הזוהר באור מוזהב בשמיים[span_87](start_span)[span_87](end_span)[span_88](start_span)[span_88](end_span). בעל כוח בלתי מוגבל המשתרע על כל הממלכה[span_89](start_span)[span_89](end_span)[span_90](start_span)[span_90](end_span).",
    stats: { hp: 450, attack: 220, defense: 200, speed: 130 },
    abilities: [
      { name: "קרן קודש", damage: 180, description: "מזמן קרן אור קטלנית מן השמיים" },
      { name: "הילה זהובה", heal: 100, description: "מרפא את עצמו ומשפר את תכונותיו" }
    ]
  }
];
