import React, { useState } from "react";
import "./EditProfileModal.css"; // We will add simple CSS below
import { auth } from "../firebase";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    displayName: user.name || "",
    city: user.location?.city || "",
    college: user.location?.college || "",
    interests: user.interests ? user.interests.join(", ") : "", // Convert array to string for input
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // Convert comma string back to array (e.g., "React, DSA" -> ["React", "DSA"])
    const interestArray = formData.interests.split(",").map((s) => s.trim());

    try {
      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: currentUser.uid,
          displayName: formData.displayName,
          location: {
            city: formData.city,
            college: formData.college,
            country: "India" // Default
          },
          interests: interestArray
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        onSave(updatedData); // Update parent state
        onClose(); // Close modal
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          
          <label>Full Name</label>
          <input 
            name="displayName" 
            value={formData.displayName} 
            onChange={handleChange} 
          />

          <label>City (For Location Filter)</label>
          <input 
            name="city" 
            placeholder="e.g. Prayagraj" 
            value={formData.city} 
            onChange={handleChange} 
          />

          <label>College</label>
          <input 
            name="college" 
            placeholder="e.g. MNNIT" 
            value={formData.college} 
            onChange={handleChange} 
          />

          <label>Interests (Comma separated)</label>
          <input 
            name="interests" 
            placeholder="React, AI, Hackathons" 
            value={formData.interests} 
            onChange={handleChange} 
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;