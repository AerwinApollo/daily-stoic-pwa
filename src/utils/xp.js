const XP_STORAGE_KEY = "stoicXP";
const LEVEL_STORAGE_KEY = "stoicLevel";
const LAST_QUOTE_XP_CLAIM_KEY = "lastQuoteXPClaim";

/**
 * XP thresholds for leveling up.
 */
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000];

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
 * Check if XP was already claimed for the current quote.
 */
export function hasClaimedXPForQuote(quote) {
  if (typeof window === "undefined") return false;
  const lastClaimedQuote = JSON.parse(localStorage.getItem(LAST_QUOTE_XP_CLAIM_KEY)) || {};
  return lastClaimedQuote.text === quote && lastClaimedQuote.claimedXP;
}

/**
 * Award XP for reading a quote (only once per unique quote).
 */
export function awardXPForQuote(quote, xpAmount) {
  if (typeof window === "undefined") return;
  if (!hasClaimedXPForQuote(quote)) {
    let currentXP = getUserXP();
    localStorage.setItem(XP_STORAGE_KEY, currentXP + xpAmount);

    // Store the quote and mark it as XP claimed
    localStorage.setItem(
      LAST_QUOTE_XP_CLAIM_KEY,
      JSON.stringify({ text: quote, claimedXP: true })
    );
  }
}
