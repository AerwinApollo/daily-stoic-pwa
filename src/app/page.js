"use client";
import { useState, useEffect } from "react";
import { saveJournalEntry, getJournalEntries, deleteJournalEntry, getJournalCount } from "../utils/storage";
import { getUserXP, getUserLevel, getXPProgress, getNextLevelXP, addXP, awardXPForQuote } from "../utils/xp";
import { getUnlockedAwards, checkAndUnlockAwards } from "../utils/awards";
import { resetUserProgress } from "../utils/reset";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [quote, setQuote] = useState("Loading...");
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpProgress, setXPProgress] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(100); // Tracks XP needed for next level
  const [xpGained, setXPGained] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [awards, setAwards] = useState([]);

  const fallbackQuotes = [
    "You have power over your mind – not outside events. Realize this, and you will find strength. - Marcus Aurelius",
    "We suffer more in imagination than in reality. - Seneca",
    "Man is not worried by real problems so much as by his imagined anxieties about real problems. - Epictetus",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them. - Marcus Aurelius",
    "No man is free who is not master of himself. - Epictetus",
    "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
    "Luck is what happens when preparation meets opportunity. - Seneca",
  ];

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      setEntries(getJournalEntries());
      setXP(getUserXP());
      setLevel(getUserLevel());
      setXPProgress(getXPProgress());
      setNextLevelXP(getNextLevelXP()); // Update next level XP
      setJournalCount(getJournalCount());
      setAwards(getUnlockedAwards());
    }

    // Fetch the quote from the API
    const fetchQuote = async () => {
      try {
        console.log("Fetching new quote...");
        const response = await fetch("https://stoic-quotes.com/api/quote");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.text && data.author) {
          setQuote(`${data.text} - ${data.author}`);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        // Use a fallback quote if API fails
        const backupQuote =
          fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(backupQuote);
      }
    };

    fetchQuote();
  }, []);

  if (!isClient) {
    return <p>Loading...</p>;
  }

  const handleSave = () => {
    if (journal.trim()) {
      saveJournalEntry(journal, quote);
      setEntries(getJournalEntries());
      setJournal("");
      setJournalCount(getJournalCount());

      addXP(10);
      setXP(getUserXP());
      setLevel(getUserLevel());
      setXPProgress(getXPProgress());
      setNextLevelXP(getNextLevelXP()); // Update next level XP progress

      let newAwards = checkAndUnlockAwards(getJournalCount());
      if (newAwards.length > 0) {
        setAwards(getUnlockedAwards());
      }
    }
  };

  const handleDelete = (id) => {
    deleteJournalEntry(id);
    setEntries(getJournalEntries());
    setJournalCount(getJournalCount());
  };

  const handleAcknowledgeQuote = () => {
    awardXPForQuote(quote, 5);
    setXP(getUserXP());
    setLevel(getUserLevel());
    setXPProgress(getXPProgress());
    setNextLevelXP(getNextLevelXP()); // Update XP needed for next level
    setXPGained(5);

    setTimeout(() => setXPGained(0), 1500);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      resetUserProgress();
      setEntries([]);
      setXP(0);
      setLevel(1);
      setXPProgress(0);
      setNextLevelXP(100);
      setJournalCount(0);
      setAwards([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Stoic Quote Section */}
      <h1 className="text-3xl font-bold mb-4">Stoic Quote</h1>
      <p className="text-lg italic max-w-lg bg-white p-4 rounded shadow-md">{quote}</p>

      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={handleAcknowledgeQuote}>
        ✅ I Read This Quote (+5 XP)
      </button>

      {/* XP Progress Bar */}
      <div className="mt-4 w-full max-w-md bg-gray-300 rounded-full relative">
        <div
          className="bg-green-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full transition-all duration-500"
          style={{ width: `${xpProgress}%` }}
        >
          {xpProgress.toFixed(0)}%
        </div>
      </div>

      {xpGained > 0 && <p className="text-green-500 text-lg font-bold animate-fade-in">+{xpGained} XP!</p>}

      {/* XP & Level Display */}
      <div className="mt-4">
        <p className="text-lg font-semibold">🏆 Stoic Level: {level}</p>
        <p className="text-md">XP: {xp}/{nextLevelXP}</p>
      </div>

      {/* Journal Input */}
      <textarea
        className="w-full max-w-lg p-2 mt-4 border rounded"
        rows="4"
        placeholder="Write your reflection here..."
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
      />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
        Save Entry (+10 XP)
      </button>

      {/* Display Journal Entries */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Your Reflections ({journalCount})</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No journal entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white p-3 rounded shadow mb-2">
              <p className="text-gray-700 italic">"{entry.quote}"</p>
              <p className="text-black mt-2">{entry.text}</p>
              <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
              <button className="mt-2 text-red-500 text-sm" onClick={() => handleDelete(entry.id)}>
                ✖ Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Reset Button */}
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
        🔄 Reset My Journey
      </button>
    </div>
  );
}
