import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (userId, actionType, description) => {
  try {
    const newLog = new ActivityLog({
      user: userId,
      actionType,
      description
    });
    await newLog.save();
    console.log(`📝 [Activity]: ${description}`);
  } catch (err) {
    console.error("❌ Logging failed:", err);
  }
};