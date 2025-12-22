import { RequestHandler } from "express";
import {
  ResumeSaveResponse,
  ATSScoreRequest,
  ATSScoreResponse,
} from "@shared/api";

// Simple in-memory resume storage
const resumes: Map<string, string> = new Map();

export const handleResumeSave: RequestHandler = (req, res) => {
  const { resumeData, userId } = req.body;

  if (!resumeData || !userId) {
    return res.status(400).json({
      success: false,
      message: "Resume data and user ID are required",
    });
  }

  const resumeId = `resume_${userId}_${Date.now()}`;
  resumes.set(resumeId, JSON.stringify(resumeData));

  const response: ResumeSaveResponse = {
    success: true,
    message: "Resume saved successfully",
    resumeId,
  };

  res.json(response);
};

export const handleATSScore: RequestHandler = (req, res) => {
  const { resumeText, jobDescription } = req.body as ATSScoreRequest;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({
      success: false,
      message: "Resume text and job description are required",
    });
  }

  // Common keywords in tech jobs
  const commonKeywords = [
    "javascript",
    "python",
    "java",
    "typescript",
    "react",
    "angular",
    "vue",
    "nodejs",
    "express",
    "django",
    "flask",
    "sql",
    "mongodb",
    "postgresql",
    "aws",
    "azure",
    "docker",
    "kubernetes",
    "git",
    "agile",
    "api",
    "rest",
    "graphql",
    "html",
    "css",
    "tailwind",
    "bootstrap",
    "linux",
    "ci/cd",
    "jenkins",
    "github",
  ];

  const resumeTextLower = resumeText.toLowerCase();
  const jobDescLower = jobDescription.toLowerCase();

  // Find matched keywords
  const matchedKeywords = commonKeywords.filter(
    (keyword) =>
      resumeTextLower.includes(keyword) && jobDescLower.includes(keyword),
  );

  // Find missing keywords
  const missingKeywords = commonKeywords.filter(
    (keyword) =>
      jobDescLower.includes(keyword) && !resumeTextLower.includes(keyword),
  );

  // Calculate ATS score
  const maxScore = 100;
  let score = 0;

  // Matched keywords: 60 points
  score += Math.min((matchedKeywords.length / 10) * 60, 60);

  // Format scoring: check for common resume sections
  if (
    resumeTextLower.includes("experience") ||
    resumeTextLower.includes("work history")
  ) {
    score += 15;
  }
  if (
    resumeTextLower.includes("education") ||
    resumeTextLower.includes("degree")
  ) {
    score += 10;
  }
  if (resumeTextLower.includes("skills")) {
    score += 10;
  }
  if (
    resumeTextLower.includes("project") ||
    resumeTextLower.includes("portfolio")
  ) {
    score += 5;
  }

  // Round to nearest integer
  score = Math.min(Math.round(score), maxScore);

  const recommendations: string[] = [];

  if (matchedKeywords.length < 5) {
    recommendations.push(
      "Add more relevant technical skills to match job requirements",
    );
  }

  if (missingKeywords.length > 5) {
    recommendations.push(
      `Consider learning or highlighting: ${missingKeywords.slice(0, 3).join(", ")}`,
    );
  }

  if (!resumeTextLower.includes("experience")) {
    recommendations.push("Add a detailed work experience section");
  }

  if (!resumeTextLower.includes("project")) {
    recommendations.push("Include relevant projects and achievements");
  }

  if (
    !resumeTextLower.includes("summary") &&
    !resumeTextLower.includes("objective")
  ) {
    recommendations.push("Add a professional summary or objective at the top");
  }

  const response: ATSScoreResponse = {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    recommendations,
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 5),
  };

  res.json(response);
};
