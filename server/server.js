import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Demo account
const demoUser = {
  id: 1,
  name: "Demo Student",
  email: "student@campusconnect.test",
  password: "Campus26"
};

const sessions = new Map();

// 1. Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API is running"
  });
});

// 2. Login API
app.post("/api/v1/sessions", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== demoUser.email ||
    password !== demoUser.password
  ) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  const token = randomUUID();
  sessions.set(token, demoUser.id);

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email
    }
  });
});

// 3. Get current user
app.get("/api/v1/users/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];

  if (sessions.get(token) !== demoUser.id) {
    return res.status(401).json({
      message: "Invalid or expired session"
    });
  }

  res.status(200).json({
    id: demoUser.id,
    name: demoUser.name,
    email: demoUser.email
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});