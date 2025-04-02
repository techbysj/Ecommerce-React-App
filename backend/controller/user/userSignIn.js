const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Both email and password are required",
        error: true,
        success: false,
      });
    }

    // Find user
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    // Generate token
    const tokenData = {
      _id: user._id,
      email: user.email,
      role: user.role, // Include role if you have role-based auth
    };

    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "7d" } // Standardized to 7 days
    );

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env.COOKIE_DOMAIN, // Set this in your env if needed
    };

    // Remove password from user data before sending
    const userData = user.toObject();
    delete userData.password;

    // Set cookie and send response
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful",
        data: {
          token,
          user: userData,
        },
        success: true,
        error: false,
      });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({
      message: err.message || "An error occurred during sign-in",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
