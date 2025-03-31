const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return false; // User not found, no permission
    }

    return user.role === "ADMIN"; // Returns true if admin, false otherwise
  } catch (error) {
    console.error("Error checking permission:", error.message);
    return false;
  }
};

module.exports = uploadProductPermission;
