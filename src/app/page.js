"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [quote, setQuote] = useState("Loading...");

  // Backup quotes if API fails
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
        // Ensure the API response contains valid data
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Stoic Quote</h1>
      <p className="text-lg italic max-w-lg bg-white p-4 rounded shadow-md">{quote}</p>
    </div>
  );
}
