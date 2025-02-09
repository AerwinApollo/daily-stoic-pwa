const XP_STORAGE_KEY = "stoicXP";
const LEVEL_STORAGE_KEY = "stoicLevel";
const XP_PROGRESS_KEY = "stoicXPProgress";
const CLAIMED_QUOTES_KEY = "claimedQuotes"; // Store claimed quotes to prevent XP farming

/**
 * XP thresholds for leveling up.
 */
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5000];

/**
 * Retrieve the user's current XP.
 */
export function getUserXP() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(XP_STORAGE_KEY)) || 0;
}

/**
 * Retrieve the user's current level.
 */
export function getUserLevel() {
  if (typeof window === "undefined") return 1;
  return parseInt(localStorage.getItem(LEVEL_STORAGE_KEY)) || 1;
}

/**
 * Get XP progress toward the next level.
 */
export function getXPProgress() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(XP_PROGRESS_KEY)) || 0;
}

/**
 * Get XP required for the next level.
 */
export function getNextLevelXP() {
  if (typeof window === "undefined") return 100;
  const currentLevel = getUserLevel();
  return LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]; // Max threshold
}

/**
 * Add XP and handle level-ups correctly (with XP carryover).
 */
export function addXP(amount) {
  if (typeof window === "undefined") return;

  let currentXP = getUserXP();
  let currentLevel = getUserLevel();
  let nextLevelXP = getNextLevelXP();
  let newXP = currentXP + amount;

  // Handle multiple level-ups if large XP boost is received
  while (newXP >= nextLevelXP) {
    newXP -= nextLevelXP; // Carry over remaining XP
    currentLevel += 1;
    nextLevelXP = LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  }

  // Save new XP and level
  localStorage.setItem(XP_STORAGE_KEY, newXP);
  localStorage.setItem(LEVEL_STORAGE_KEY, currentLevel);

  // Store XP progress percentage
  let progress = Math.min((newXP / nextLevelXP) * 100, 100);
  localStorage.setItem(XP_PROGRESS_KEY, progress);
}

/**
 * Award XP for reading a quote (Prevents multiple claims for the same quote)
 */
export function awardXPForQuote(quote, xpAmount) {
  if (typeof window === "undefined") return;

  let claimedQuotes = JSON.parse(localStorage.getItem(CLAIMED_QUOTES_KEY)) || [];

  if (!claimedQuotes.includes(quote)) {
    addXP(xpAmount);
    claimedQuotes.push(quote);
    localStorage.setItem(CLAIMED_QUOTES_KEY, JSON.stringify(claimedQuotes));
  }
}

/**
 * Reset XP, level, and progress.
 */
export function resetXP() {
  if (typeof window === "undefined") return;
  localStorage.setItem(XP_STORAGE_KEY, "0");
  localStorage.setItem(LEVEL_STORAGE_KEY, "1");
  localStorage.setItem(XP_PROGRESS_KEY, "0");
  localStorage.setItem(CLAIMED_QUOTES_KEY, JSON.stringify([]));
}
