# 📜 Daily Stoic PWA

> **A lightweight Progressive Web App (PWA) that delivers Stoic quotes for reflection and mindfulness. Built with Next.js and Tailwind CSS, this app works offline and updates quotes every time the page is reloaded.**

## 🚀 Features
✅ **Real-Time Stoic Quotes** – A new quote appears **every time the page is reloaded**.  
✅ **Reliable API Integration** – Fetches live quotes from a Stoic Quotes API, ensuring fresh content.  
✅ **Offline Support** – If the API fails, the app provides a **backup list of hardcoded Stoic quotes**.  
✅ **Minimalist UI** – Clean, distraction-free design optimized for reading.  
✅ **Mobile-Friendly** – Built as a **PWA**, allowing users to install it like an app.  

## 🔄 How It Works
- The app **fetches a new quote from the API** every time the page reloads.
- If the API **fails**, it **automatically falls back** to a hardcoded list of Stoic quotes.
- **Console logging** helps debug errors if the API is unavailable.

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Storage**: `localStorage` (for caching previous quotes)
- **Hosting**: Vercel

## 📥 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AerwinApollo/daily-stoic-pwa.git
   cd daily-stoic-pwa
