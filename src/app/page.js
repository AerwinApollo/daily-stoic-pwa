"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");

  // Hardcoded list of Stoic quotes
  const quotes = [
    "You have power over your mind – not outside events. Realize this, and you will find strength. - Marcus Aurelius",
    "We suffer more in imagination than in reality. - Seneca",
    "Man is not worried by real problems so much as by his imagined anxieties about real problems. - Epictetus",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them. - Marcus Aurelius",
    "No man is free who is not master of himself. - Epictetus",
    "What upsets people is not things themselves, but their judgments about these things. - Epictetus",
    "Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius",
    "Luck is what happens when preparation meets opportunity. - Seneca",
  ];

  useEffect(() => {
    const storedQuote = localStorage.getItem("dailyStoicQuote");
    const storedDate = localStorage.getItem("quoteDate");
    const today = new Date().toDateString();

    if (storedQuote && storedDate === today) {
      setQuote(storedQuote);
    } else {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(newQuote);
      localStorage.setItem("dailyStoicQuote", newQuote);
      localStorage.setItem("quoteDate", today);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Daily Stoic Quote</h1>
      <p className="text-lg italic max-w-lg bg-white p-4 rounded shadow-md">{quote}</p>
    </div>
  );
}
