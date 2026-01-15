// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
    }

    // Fetch posts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const postsArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPosts(postsArray);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !postContent.trim()) return;

    await addDoc(collection(db, "posts"), {
      uid: user.uid,
      name: user.displayName || user.email,
      email: user.email,
      content: postContent,
      timestamp: serverTimestamp()
    });

    setPostContent(""); // clear input
    fetchPosts(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {userName}!</h1>
      <p>You are now logged in.</p>

      {/* Post Form */}
      <form onSubmit={handlePostSubmit} style={{ marginTop: "20px" }}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post..."
          rows={3}
          style={{ width: "100%", padding: "10px" }}
        />
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
          Post
        </button>
      </form>

      {/* Posts Feed */}
      <div style={{ marginTop: "30px" }}>
        <h2>Posts</h2>
        {posts.map((post) => (
          <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <strong>{post.name}</strong> <em>({post.email})</em>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
