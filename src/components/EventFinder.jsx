import React, { useState, useEffect } from "react";
import axios from "axios";

const EventFinder = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ city: "", interest: "", mode: "" });
  const [loading, setLoading] = useState(false);

  // Function to fetch data from your Backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      // This URL matches the route we created in the backend
      const res = await axios.get("http://localhost:5000/api/events/search", {
        params: filters,
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events automatically when the page loads
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>🚀 Student Event Finder</h1>
      
      {/* --- Filter Section --- */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        marginBottom: "30px", 
        justifyContent: "center",
        flexWrap: "wrap" 
      }}>
        <input
          type="text"
          placeholder="City (e.g. Delhi)"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <select
          value={filters.interest}
          onChange={(e) => setFilters({ ...filters, interest: e.target.value })}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">All Interests</option>
          <option value="AI">AI & ML</option>
          <option value="Web">Web Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Hackathon">Hackathons</option>
        </select>

        <button 
          onClick={fetchEvents}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}
        >
          {loading ? "Searching..." : "Find Events"}
        </button>
      </div>

      {/* --- Results Section --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {events.length === 0 && !loading ? (
          <p style={{ textAlign: "center", width: "100%" }}>No events found. Try different filters.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>{event.name}</h3>
              <p style={{ color: "#7f8c8d", fontSize: "0.9em" }}>
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location.city || "Online"}
              </p>
              
              <p style={{ color: "#555" }}>{event.description}</p>

              <div style={{ marginBottom: "15px" }}>
                {event.tags.map((tag) => (
                  <span key={tag} style={{ 
                    backgroundColor: "#e1f5fe", 
                    color: "#0288d1", 
                    padding: "3px 8px", 
                    borderRadius: "15px", 
                    fontSize: "0.8em", 
                    marginRight: "5px" 
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* The "Web Linking" Button */}
              <a 
                href={event.registrationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: "block", 
                  textAlign: "center", 
                  backgroundColor: "#28a745", 
                  color: "white", 
                  padding: "10px", 
                  borderRadius: "5px", 
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Register Now ↗
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventFinder;