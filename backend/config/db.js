const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Define the Local Connection String
    // We use 127.0.0.1 instead of 'localhost' to avoid common Node.js errors
    const localDB = "mongodb://127.0.0.1:27017/collabhub";

    // 2. Connect to MongoDB
    await mongoose.connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Local Connected Successfully");
    console.log("   Database Name: collabhub");
    console.log("   Storage: MongoDB Compass (Localhost)");

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;