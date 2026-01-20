
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Navigation ke liye useNavigate add kiya
import { auth } from "../firebase"; // Logout ke liye auth zaroori hai
import { signOut } from "firebase/auth";
import EditProfileModal from "./EditProfileModal";
import "./Profile.css";
import "./Home.css";

const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  
  // 1. User ki details save karne ke liye state
  const [user, setUser] = useState({
    name: "Alok Kumar", // Default fallback name
    email: "alok.kumar@example.com",
    photo: null,
    // Add these fields so they don't crash if missing
    location: { city: "", college: "" }, 
    interests: []
  });

  // 2. Page load hote hi LocalStorage se data nikalna
  useEffect(() => {
    const savedData = localStorage.getItem("userLoggedIn");
    if (savedData) {
      const parsedUser = JSON.parse(savedData);
      setUser({
        name: parsedUser.name || "User",
        email: parsedUser.email || "No email provided",
        photo: parsedUser.photo || null,
        location: parsedUser.location || {}, // Load location if it exists
        interests: parsedUser.interests || [] // Load interests if they exist
      });
    }
  }, []);

  // 3. Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase se logout
      localStorage.removeItem("userLoggedIn"); // Memory clear karna
      navigate("/"); // Login page par bhejna
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Helper to handle saving data from the Modal
  const handleSaveProfile = (updatedData) => {
    // Merge the new data (city, interests) into our current state
    const newUserState = { ...user, ...updatedData };
    setUser(newUserState);
    
    // Optional: Update localStorage too so it persists on refresh
    localStorage.setItem("userLoggedIn", JSON.stringify(newUserState));
  };

  return (
    <>
     
      {/* PROFILE CONTENT */}
      <div className="profile-page">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">
          Manage your personal information and study preferences
        </p>

        <div className="profile-card">
          {/* Avatar Section (Now Dynamic) */}
          <div className="profile-avatar-section">
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="profile-avatar-img" style={{width: '80px', borderRadius: '50%', marginBottom: '10px'}} />
            ) : (
              <div className="profile-avatar">{user.name.charAt(0)}</div>
            )}
            
            {/* Ab yahan user ka real naam dikhega */}
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          {/* Info Section */}
          <div className="profile-info-grid">
            <div className="info-box">
              <span className="label">Course</span>
              <span>MCA</span>
            </div>

            <div className="info-box">
              <span className="label">College</span>
             {/* Show the updated college or fallback */}
              <span>{user.location?.college || "MNNIT Allahabad"}</span>
            </div>

            <div className="info-box">
              <span className="label">Interests</span>
              {/* Join the array to show as text (e.g. "React, AI") */}
              <span>
                {user.interests && user.interests.length > 0 
                  ? user.interests.join(", ") 
                  : "Add Interests +"}
              </span>
            </div>

            <div className="info-box">
              <span className="label">City</span>
              {/* Show the updated city */}
              <span>{user.location?.city || "Not set"}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="profile-actions">
            {/* <--- 3. UPDATE THE BUTTON TO OPEN MODAL */}
            <button 
              className="btn-primary" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>

            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* <--- 4. ADD THE MODAL COMPONENT AT THE BOTTOM */}
      {isEditing && (
        <EditProfileModal 
          user={user} 
          onClose={() => setIsEditing(false)} 
          onSave={handleSaveProfile} 
        />
      )}

    </>
  );
};

export default Profile;