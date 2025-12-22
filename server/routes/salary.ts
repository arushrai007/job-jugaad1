import { RequestHandler } from "express";
import { SalaryPredictionRequest, SalaryPredictionResponse } from "@shared/api";

// Base salary data for different roles and locations
const baseSalaries: Record<string, { min: number; max: number }> = {
  "frontend-developer": { min: 600000, max: 1200000 },
  "backend-developer": { min: 700000, max: 1300000 },
  "full-stack-engineer": { min: 800000, max: 1400000 },
  "data-scientist": { min: 750000, max: 1500000 },
  "data-analyst": { min: 500000, max: 900000 },
  "devops-engineer": { min: 750000, max: 1400000 },
  "machine-learning-engineer": { min: 800000, max: 1600000 },
  "product-manager": { min: 800000, max: 1500000 },
  "qa-engineer": { min: 500000, max: 900000 },
  "ui-ux-designer": { min: 600000, max: 1100000 },
};

// Location multipliers
const locationMultipliers: Record<string, number> = {
  "san-francisco": 1.5,
  "new-york": 1.4,
  bangalore: 1.0,
  delhi: 0.95,
  mumbai: 1.05,
  hyderabad: 0.95,
  remote: 1.1,
  default: 1.0,
};

// Skill value mapping
const skillValues: Record<string, number> = {
  javascript: 50000,
  typescript: 60000,
  react: 80000,
  nodejs: 70000,
  python: 60000,
  aws: 90000,
  kubernetes: 100000,
  docker: 80000,
  "machine-learning": 120000,
  "data-science": 100000,
  postgresql: 70000,
  mongodb: 60000,
  graphql: 75000,
  rest: 50000,
};

export const handleSalaryPrediction: RequestHandler = (req, res) => {
  const { skills, experience, location, role } =
    req.body as SalaryPredictionRequest;

  if (!skills || !experience || !location || !role) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // Get base salary for role
  const roleKey = role.toLowerCase().replace(/\s+/g, "-");
  const baseSalary = baseSalaries[roleKey] || { min: 400000, max: 800000 };

  // Calculate location multiplier
  const locationKey = location.toLowerCase().replace(/\s+/g, "-");
  const multiplier =
    locationMultipliers[locationKey] || locationMultipliers.default;

  // Calculate skill bonus
  const skillBonus = skills.reduce((acc, skill) => {
    const skillKey = skill.toLowerCase().replace(/\s+/g, "-");
    return acc + (skillValues[skillKey] || 20000);
  }, 0);

  // Calculate experience bonus
  const experienceBonus = Math.min(experience * 50000, 300000);

  // Calculate final salary
  const baseMin = baseSalary.min * multiplier;
  const baseMax = baseSalary.max * multiplier;

  const minSalary = Math.round(
    baseMin + skillBonus * 0.3 + experienceBonus * 0.2,
  );
  const maxSalary = Math.round(
    baseMax + skillBonus * 0.5 + experienceBonus * 0.4,
  );
  const averageSalary = Math.round((minSalary + maxSalary) / 2);

  // Determine market trend
  let marketTrend = "Stable";
  if (role.toLowerCase().includes("ai") || role.toLowerCase().includes("ml")) {
    marketTrend = "Rising rapidly";
  } else if (role.toLowerCase().includes("devops")) {
    marketTrend = "Rising";
  }

  const response: SalaryPredictionResponse = {
    minSalary,
    maxSalary,
    averageSalary,
    currency: "INR",
    marketTrend,
    factors: [
      `${skills.length} relevant skills identified`,
      `${experience} years of experience`,
      `${location} market data used`,
      `High demand for ${role}`,
    ],
  };

  res.json(response);
};
