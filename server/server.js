import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load environment variables from this server folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// Check required environment variables
if (!JWT_SECRET || !CLIENT_ORIGIN) {
  throw new Error("Missing required environment variables.");
}

// Middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use(express.json());

// Demo users
// Password: Campus26
const demoUsers = [
  {
    id: 1,
    name: "CampusConnect Student",
    email: "student@campusconnect.test",
    passwordHash: bcrypt.hashSync("Campus26", 10),
  },
];

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "CampusConnect API is running.",
  });
});

// Login endpoint
app.post("/api/v1/sessions", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      password.length === 0 ||
      !emailPattern.test(email.trim())
    ) {
      return res.status(400).json({
        error: "A valid email and password are required.",
      });
    }

    // Find user
    const normalizedEmail = email.trim().toLowerCase();

    const user = demoUsers.find(
      (account) => account.email.toLowerCase() === normalizedEmail
    );

    // Check user and password
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Return successful login response
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});