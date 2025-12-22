import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleRegister, handleAuthCheck } from "./routes/auth";
import { handleSalaryPrediction } from "./routes/salary";
import { handleJobsList, handleJobDetail } from "./routes/jobs";
import { handleResumeSave, handleATSScore } from "./routes/resume";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/register", handleRegister);
  app.get("/api/auth/check", handleAuthCheck);

  // Salary predictor route
  app.post("/api/salary-predictor", handleSalaryPrediction);

  // Jobs routes
  app.get("/api/jobs", handleJobsList);
  app.get("/api/jobs/:id", handleJobDetail);

  // Resume and ATS routes
  app.post("/api/resume/save", handleResumeSave);
  app.post("/api/ats-score", handleATSScore);

  return app;
}
