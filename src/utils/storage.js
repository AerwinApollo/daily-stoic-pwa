import { checkAndUnlockAwards } from "./awards";

const STORAGE_KEY = "stoicJournalEntries";
const JOURNAL_COUNT_KEY = "journalCount";

/**
 * Save a journal entry with a quote.
 */
export function saveJournalEntry(entry, quote) {
  if (typeof window === "undefined") return;

  const existingEntries = getJournalEntries();
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const newEntry = {
    id: Date.now(),
    text: entry,
    quote: quote,
    date: formattedDate,
  };

  const updatedEntries = [...existingEntries, newEntry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

  let journalCount = getJournalCount();
  localStorage.setItem(JOURNAL_COUNT_KEY, journalCount + 1);
}

/**
 * Retrieve journal entries.
 */
export function getJournalEntries() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/**
 * Retrieve journal count.
 */
export function getJournalCount() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(JOURNAL_COUNT_KEY)) || 0;
}

/**
 * Delete a journal entry and update count.
 */
export function deleteJournalEntry(id) {
  if (typeof window === "undefined") return;

  const existingEntries = getJournalEntries();
  const updatedEntries = existingEntries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

  let journalCount = getJournalCount();
  if (journalCount > 0) {
    localStorage.setItem(JOURNAL_COUNT_KEY, journalCount - 1);
  }

  checkAndUnlockAwards(getJournalCount());
}
