const axios = require('axios');
const Event = require('../models/Event.mjs');

// Mock data to test your logic immediately (Before you get API keys)
const fetchMockEvents = async () => {
  const events = [
    {
      title: "Global AI Hackathon 2026",
      tags: ["AI", "Machine Learning"],
      location: { country: "India", city: "Online", mode: "online" },
      registrationLink: "https://mlh.io/example",
      eventDate: new Date("2026-04-10")
    },
    {
      title: "Delhi Web Dev Summit",
      tags: ["Web", "React"],
      location: { country: "India", city: "New Delhi", mode: "offline" },
      registrationLink: "https://eventbrite.com/example",
      eventDate: new Date("2026-05-20")
    }
  ];
  return events;
};

// The function to update your Database
const updateEventDatabase = async () => {
  console.log("⏳ Fetching latest events...");
  
  const newEvents = await fetchMockEvents(); 
  // Later: Replace fetchMockEvents() with fetchEventbrite() or fetchDevfolio()

  for (let eventData of newEvents) {
    // Upsert: Update if exists, Insert if new (prevents duplicates)
    await Event.findOneAndUpdate(
      { title: eventData.title }, 
      eventData, 
      { upsert: true, new: true }
    );
  }
  console.log("✅ Database updated with real-time data.");
};

module.exports = updateEventDatabase;