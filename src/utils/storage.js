// Key for storing journal entries in LocalStorage
const STORAGE_KEY = "stoicJournalEntries";

/**
 * Save a journal entry to LocalStorage.
 * @param {string} entry - The user's journal input.
 */
export function saveJournalEntry(entry) {
  const existingEntries = getJournalEntries();
  const newEntry = { id: Date.now(), text: entry, date: new Date().toISOString() };
  const updatedEntries = [...existingEntries, newEntry];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
}

/**
 * Retrieve all journal entries from LocalStorage.
 * @returns {Array} List of saved journal entries.
 */
export function getJournalEntries() {
  const storedEntries = localStorage.getItem(STORAGE_KEY);
  return storedEntries ? JSON.parse(storedEntries) : [];
}

/**
 * Delete a journal entry from LocalStorage.
 * @param {number} id - ID of the journal entry to delete.
 */
export function deleteJournalEntry(id) {
  const existingEntries = getJournalEntries();
  const updatedEntries = existingEntries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
}
