const UserModel = require("../models/userModel"); // ✅ Import userModel

async function allUsers(req, res) {
  try {
    console.log("userid all Users", req.userId);

    const allUsers = await UserModel.find(); // ✅ Use the correct imported model

    res.json({
      message: "All Users",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
