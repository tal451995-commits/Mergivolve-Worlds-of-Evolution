// 1. מאגר התמונות הקיימות שהעלת ל-GitHub (משמש כתמונות גיבוי לדרקונים מומצאים לפי אלמנט)
const dragonImagesByElement = {
  "אש": "ember_heart.jpg",          // משתמש בתמונה שהעלת
  "מים": "coral_sentinel.jpg",       // משתמש בתמונה שהעלת
  "קריסטל": "aurora_fennec.jpg",    // משתמש בתמונה שהעלת
  "טבע": "verdant_drake.jpg"        // משתמש בתמונה שהעלת
};

// 2. פונקציה שמייצרת דרקון חדש באופן אקראי לחלוטין (ממציאה דרקונים חדשים שלא קיימים)
function generateRandomDragon(desiredTier = 1) {
  const elements = ["אש", "מים", "קריסטל", "טבע"];
  const adjectives = ["פראי", "זהוב", "מלכותי", "מסתורי", "אדיר"];
  const types = ["דרקון", "וויברן", "דרייק", "שומר"];

  // בחירה אקראית של מאפיינים
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];

  const uniqueId = `gen_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const dragonName = `${randomType} ${randomAdj}`;

  return {
    id: uniqueId,
    name: dragonName,
    element: randomElement,
    tier: desiredTier,
    // שיוך אוטומטי לתמונות שהעלת ל-GitHub לפי האלמנט
    image: dragonImagesByElement[randomElement] || "character_roster_banner.jpg",
    stats: {
      hp: 50 + (desiredTier * 30),
      attack: 25 + (desiredTier * 15),
      defense: 20 + (desiredTier * 12)
    },
    abilities: [
      { name: `מכת ${randomElement}`, power: 15 + (desiredTier * 10) }
    ]
  };
}

// 3. פונקציה שמשדרגת דרקון קיים לרמה הבאה (Tier Up / Evolution)
function upgradeExistingDragon(existingDragon) {
  // מעלה את הדרגה באחד ומחזק את הנתונים באופן אוטומטי
  const nextTier = existingDragon.tier + 1;
  
  return {
    ...existingDragon, // שומר על הנתונים הקיימים (כולל התמונה המקורית ששמת)
    id: `${existingDragon.id}_evolved`,
    name: `שודרג: ${existingDragon.name}`,
    tier: nextTier,
    stats: {
      hp: Math.round(existingDragon.stats.hp * 1.5),
      attack: Math.round(existingDragon.stats.attack * 1.4),
      defense: Math.round(existingDragon.stats.defense * 1.4)
    }
  };
}

// --- דוגמאות שימוש מהירות ---
// א. יצירת דרקון מומצא חדש לגמרי (למשל ברמה 2):
// const myNewDragon = generateRandomDragon(2);

// ב. שדרוג דרקון קיים שיש לך במערכת:
// const upgradedDragon = upgradeExistingDragon(myOldDragon);
