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

// =============================================
// 1. SECURITY MIDDLEWARE
// =============================================
app.use(helmet());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// =============================================
// 2. ENHANCED CORS CONFIGURATION
// =============================================
const allowedOrigins = [
  "https://techbysj-electronics-store.netlify.app",
  "http://localhost:3000",
  process.env.BACKEND_URL, // Your Render URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.some((allowed) => {
        return (
          origin === allowed ||
          origin.includes(allowed.replace(/https?:\/\//, ""))
        );
      })
    ) {
      callback(null, true);
    } else {
      console.warn(`CORS Blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "X-CSRF-Token",
  ],
  exposedHeaders: [
    "Content-Length",
    "Access-Control-Allow-Origin",
    "Set-Cookie",
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight for all routes

// =============================================
// 3. REQUEST LOGGING & PARSING
// =============================================
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Debugging middleware - log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  next();
});

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// =============================================
// 4. ROUTES
// =============================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    allowedOrigins,
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api", router);

// =============================================
// 5. ERROR HANDLING
// =============================================
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS blocked",
      allowedOrigins,
      yourOrigin: req.headers.origin,
    });
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// =============================================
// 6. SERVER STARTUP
// =============================================
const PORT = process.env.PORT || 5555;
let server;

connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`
      ========================================
       🚀 Server running on port ${PORT}
       Environment: ${process.env.NODE_ENV || "development"}
       Allowed Origins: ${allowedOrigins.join(", ")}
       ========================================
      `);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
  if (server) server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  if (server)
    server.close(() => {
      console.log("Process terminated");
    });
});
