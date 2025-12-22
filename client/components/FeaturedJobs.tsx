import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Startup",
    location: "Remote",
    salary: "6-10 LPA",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "SaaS Company",
    location: "Bangalore",
    salary: "8-12 LPA",
    tags: ["Node.js", "React", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "FinTech Firm",
    location: "Mumbai",
    salary: "5-8 LPA",
    tags: ["Python", "SQL", "Analytics"],
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Cloud Services",
    location: "Hyderabad",
    salary: "7-11 LPA",
    tags: ["Python", "AWS", "Docker"],
  },
];

export default function FeaturedJobs() {
  const navigate = useNavigate();

  return (
    <section id="jobs" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-neon-lime/50 bg-neon-lime/10 text-neon-lime text-sm font-medium">
              🎯 Fresh Opportunities
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Featured Jobs for <span className="text-neon-lime">Freshers</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/jobs")}
            className="hidden sm:flex items-center gap-2 text-neon-lime hover:gap-3 transition font-semibold"
          >
            View All Jobs
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur hover:border-neon-lime/50 hover:bg-slate-900/80 transition group cursor-pointer"
              onClick={() => navigate("/jobs")}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-lime transition">
                    {job.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{job.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <span>{job.location}</span>
                <span className="text-neon-lime font-semibold">
                  {job.salary}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-neon-lime/10 text-neon-lime text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden flex justify-center">
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 text-neon-lime hover:gap-3 transition font-semibold"
          >
            View All Jobs
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
