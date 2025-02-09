const AWARD_STORAGE_KEY = "unlockedAwards";

/**
 * List of possible awards based on journal count.
 */
const AWARD_MILESTONES = [
  { count: 1, title: "First Steps 🏅", description: "Wrote your first journal entry!" },
  { count: 5, title: "Committed Thinker 🧠", description: "Wrote 5 journal entries!" },
  { count: 10, title: "Stoic Apprentice 📜", description: "Wrote 10 journal entries!" },
  { count: 20, title: "Philosopher in Training 📖", description: "Wrote 20 journal entries!" },
  { count: 50, title: "The Reflective Mind 🏆", description: "Wrote 50 journal entries!" },
];

/**
 * Retrieve unlocked awards.
 */
export function getUnlockedAwards() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(AWARD_STORAGE_KEY)) || [];
}

/**
 * Check for new awards and revoke if needed.
 */
export function checkAndUnlockAwards(journalCount) {
  if (typeof window === "undefined") return [];

  let unlockedAwards = getUnlockedAwards();
  let newAwards = [];

  // Add new achievements
  AWARD_MILESTONES.forEach(award => {
    if (journalCount >= award.count && !unlockedAwards.some(a => a.count === award.count)) {
      unlockedAwards.push(award);
      newAwards.push(award);
    }
  });

  // Remove achievements if journal entries drop below a milestone
  unlockedAwards = unlockedAwards.filter(award => journalCount >= award.count);

  localStorage.setItem(AWARD_STORAGE_KEY, JSON.stringify(unlockedAwards));
  return newAwards;
}
