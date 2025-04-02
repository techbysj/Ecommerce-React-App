require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

// ======================
// 1. Security Middleware
// ======================
app.use(helmet());
app.use(cookieParser());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests",
  })
);

// ======================
// 2. CORS Configuration
// ======================
const allowedOrigins = [
  "https://techbysj-electronics-store.netlify.app",
  "http://localhost:3000",
  "https://ecommerce-react-app-hg5y.onrender.com", // ADD THIS
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Content-Length", "Set-Cookie"],
  optionsSuccessStatus: 200,
  maxAge: 600,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ======================
// 3. Request Processing
// ======================
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ======================
// 4. Routes
// ======================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    origins: allowedOrigins,
    node_env: process.env.NODE_ENV,
  });
});

app.use("/api", router);

// ======================
// 5. Error Handling
// ======================
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS blocked",
      allowedOrigins,
      yourOrigin: req.headers.origin,
    });
  }
  res.status(500).json({ error: "Internal server error" });
});

// ======================
// 6. Server Startup
// ======================
const PORT = process.env.PORT || 5555;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`
      ========================
      Server running on ${PORT}
      Allowed Origins:
      ${allowedOrigins.join("\n      ")}
      ========================
      `);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
