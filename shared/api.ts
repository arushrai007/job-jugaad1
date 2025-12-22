/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
}

export interface AuthCheckResponse {
  authenticated: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// Salary Predictor Types
export interface SalaryPredictionRequest {
  skills: string[];
  experience: number;
  location: string;
  role: string;
}

export interface SalaryPredictionResponse {
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
  currency: string;
  marketTrend: string;
  factors: string[];
}

// Jobs Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicants: number;
}

export interface JobsListResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}

// Resume Types
export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    graduationYear: string;
    cgpa: string;
  }>;
  skills: string[];
}

export interface ResumeSaveResponse {
  success: boolean;
  message: string;
  resumeId?: string;
}

// ATS Score Types
export interface ATSScoreRequest {
  resumeText: string;
  jobDescription: string;
}

export interface ATSScoreResponse {
  score: number;
  maxScore: number;
  percentage: number;
  recommendations: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}
