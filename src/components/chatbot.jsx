import React, { useState } from "react";
import ReactDOM from "react-dom"; // 👈 Import this
import "./chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  // We wrap the whole thing in a Portal
  return ReactDOM.createPortal(
    <>
      {/* Floating Button (Fixed Position) */}
      <div
        className="chatbot-fab"
        onClick={() => setOpen(!open)}
        title="Chat with us"
      >
        {/* Professional Chat Icon */}
        <img 
          src="https://cdn.jsdelivr.net/npm/remixicon@4.8.0/icons/Communication/chat-4-fill.svg" 
          alt="Chat"
        />
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>CollabHub Assistant 🤖</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-body">
            <p className="bot-msg">Hi 👋 How can I help you today?</p>
          </div>

          <div className="chatbot-footer">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </>,
    document.body // 👈 This tells React: "Render this directly in the <body> tag"
  );
};

export default Chatbot;