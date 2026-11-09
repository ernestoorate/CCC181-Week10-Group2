import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

if (!JWT_SECRET || !CLIENT_ORIGIN) {
  throw new Error("Missing required environment variables.");
}

// Middleware
app.use(cors({
  origin: CLIENT_ORIGIN
}));

app.use(express.json());

// Demo user with a hashed password
const users = [
  {
    id: 1,
    name: "Demo Student",
    email: "student@campusconnect.test",
    passwordHash: bcrypt.hashSync("Campus26", 10)
  }
];

// 1. Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// 2. Login API
app.post("/api/v1/sessions", (req, res) => {
  const { email, password } = req.body || {};

  // Validate input
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
  typeof email !== "string" ||
  typeof password !== "string" ||
  !email.trim() ||
  password.length === 0 ||
  !emailPattern.test(email.trim())
) {
  return res.status(400).json({
    error: "Email and password are required."
  });
}
  // Find user using lowercase email
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  // Check password
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({
      error: "Invalid email or password."
    });
  }

  // Generate JWT token (expires in 1 hour)
  const token = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Successful login
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});