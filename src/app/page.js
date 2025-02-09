"use client";
import { useState, useEffect } from "react";
import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from "../utils/storage";

export default function Home() {
  const [quote, setQuote] = useState("Loading...");
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);

  // Hardcoded backup quotes (if API fails)
  const fallbackQuotes = [
    "You have power over your mind – not outside events. Realize this, and you will find strength. - Marcus Aurelius",
    "We suffer more in imagination than in reality. - Seneca",
    "Man is not worried by real problems so much as by his imagined anxieties about real problems. - Epictetus",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them. - Marcus Aurelius",
    "No man is free who is not master of himself. - Epictetus",
    "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
    "Luck is what happens when preparation meets opportunity. - Seneca",
  ];

  // Fetch a Stoic quote on page load
  useEffect(() => {
    console.log("Fetching new quote...");

    fetch("https://stoic-quotes.com/api/quote")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        // Ensure API response contains valid data
        if (data.text && data.author) {
          setQuote(`${data.text} - ${data.author}`);
        } else {
          throw new Error("Invalid API response");
        }
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        // Fallback to a hardcoded quote if API fails
        const backupQuote =
          fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(backupQuote);
      });

    // Load existing journal entries from LocalStorage
    setEntries(getJournalEntries());
  }, []);

  // Save journal entry
  const handleSave = () => {
    if (journal.trim()) {
      saveJournalEntry(journal);
      setEntries(getJournalEntries()); // Refresh entries
      setJournal(""); // Clear input
    }
  };

  // Delete a journal entry
  const handleDelete = (id) => {
    deleteJournalEntry(id);
    setEntries(getJournalEntries()); // Refresh entries
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Stoic Quote Section */}
      <h1 className="text-3xl font-bold mb-4">Stoic Quote</h1>
      <p className="text-lg italic max-w-lg bg-white p-4 rounded shadow-md">{quote}</p>

      {/* Journal Input */}
      <textarea
        className="w-full max-w-lg p-2 mt-4 border rounded"
        rows="4"
        placeholder="Write your reflection here..."
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSave}
      >
        Save Entry
      </button>

      {/* Display Journal Entries */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Previous Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No journal entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white p-3 rounded shadow mb-2 flex justify-between items-center">
              <span>{entry.text}</span>
              <button
                className="text-red-500 text-sm"
                onClick={() => handleDelete(entry.id)}
              >
                ✖ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
