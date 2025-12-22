import { RequestHandler } from "express";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthCheckResponse,
} from "@shared/api";

// Simple in-memory user storage (in production, use a database)
const users: Map<
  string,
  { id: string; name: string; email: string; password: string; token: string }
> = new Map();

// Generate a simple token (in production, use JWT)
const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Find user by email
  let user = Array.from(users.values()).find((u) => u.email === email);

  if (!user) {
    // For demo purposes, create a new user on login
    const userId = `user_${Date.now()}`;
    const token = generateToken(userId);
    user = {
      id: userId,
      name: email.split("@")[0],
      email,
      password,
      token,
    };
    users.set(userId, user);
  } else if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const response: LoginResponse = {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
    },
  };

  res.json(response);
};

export const handleRegister: RequestHandler = (req, res) => {
  const { name, email, password, confirmPassword } =
    req.body as RegisterRequest;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Check if user already exists
  if (Array.from(users.values()).some((u) => u.email === email)) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const userId = `user_${Date.now()}`;
  const token = generateToken(userId);
  const user = {
    id: userId,
    name,
    email,
    password,
    token,
  };

  users.set(userId, user);

  const response: LoginResponse = {
    success: true,
    message: "Registration successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
    },
  };

  res.json(response);
};

export const handleAuthCheck: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({
      authenticated: false,
    } as AuthCheckResponse);
  }

  // Find user by token
  const user = Array.from(users.values()).find((u) => u.token === token);

  if (!user) {
    return res.json({
      authenticated: false,
    } as AuthCheckResponse);
  }

  const response: AuthCheckResponse = {
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  res.json(response);
};
