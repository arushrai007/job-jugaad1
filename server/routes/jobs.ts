import { RequestHandler } from "express";
import { JobsListResponse, Job } from "@shared/api";

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Startup",
    location: "Remote",
    salary: "6-10 LPA",
    description:
      "Looking for a talented frontend developer to build beautiful and responsive UIs.",
    requirements: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    postedDate: "2024-01-15",
    applicants: 245,
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "SaaS Company",
    location: "Bangalore",
    salary: "8-12 LPA",
    description: "Build scalable web applications with our full stack team.",
    requirements: ["Node.js", "React", "PostgreSQL", "AWS"],
    postedDate: "2024-01-14",
    applicants: 189,
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "FinTech Firm",
    location: "Mumbai",
    salary: "5-8 LPA",
    description: "Analyze data and create insights for financial products.",
    requirements: ["Python", "SQL", "Data Visualization", "Statistics"],
    postedDate: "2024-01-13",
    applicants: 156,
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "Cloud Services",
    location: "Hyderabad",
    salary: "7-11 LPA",
    description: "Develop robust backend services for cloud infrastructure.",
    requirements: ["Python", "AWS", "Docker", "Kubernetes"],
    postedDate: "2024-01-12",
    applicants: 203,
  },
  {
    id: "5",
    title: "Mobile Developer",
    company: "Mobile-First Startup",
    location: "Remote",
    salary: "6-9 LPA",
    description: "Create amazing mobile experiences with React Native.",
    requirements: ["React Native", "JavaScript", "Firebase", "UI/UX"],
    postedDate: "2024-01-11",
    applicants: 178,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Infrastructure Co",
    location: "Delhi",
    salary: "8-13 LPA",
    description: "Manage and optimize our cloud infrastructure.",
    requirements: ["Docker", "Kubernetes", "CI/CD", "Linux"],
    postedDate: "2024-01-10",
    applicants: 124,
  },
  {
    id: "7",
    title: "QA Engineer",
    company: "Quality First Inc",
    location: "Pune",
    salary: "4-7 LPA",
    description: "Ensure quality through comprehensive testing strategies.",
    requirements: ["Selenium", "Python", "JIRA", "Test Automation"],
    postedDate: "2024-01-09",
    applicants: 167,
  },
  {
    id: "8",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Remote",
    salary: "5-9 LPA",
    description: "Design beautiful and user-friendly interfaces.",
    requirements: ["Figma", "UI Design", "User Research", "Prototyping"],
    postedDate: "2024-01-08",
    applicants: 134,
  },
];

export const handleJobsList: RequestHandler = (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || "";

  let filteredJobs = mockJobs;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = mockJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.requirements.some((req) => req.toLowerCase().includes(searchLower)),
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const response: JobsListResponse = {
    jobs: paginatedJobs,
    total: filteredJobs.length,
    page,
    limit,
  };

  res.json(response);
};

export const handleJobDetail: RequestHandler = (req, res) => {
  const { id } = req.params;
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json(job);
};
