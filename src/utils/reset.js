const STORAGE_KEYS = [
    "stoicXP",
    "stoicLevel",
    "stoicJournalEntries",
    "journalCount",
    "unlockedAwards",
    "lastQuoteXPClaim"
  ];
  
  /**
   * Resets all user progress.
   */
  export function resetUserProgress() {
    if (typeof window === "undefined") return;
    
    STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    console.log("🔄 User progress has been reset!");
  }
  