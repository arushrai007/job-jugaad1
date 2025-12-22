import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularTags = [
  "React Developer",
  "Data Analyst",
  "Python",
  "Fresher Jobs",
];

export default function Hero() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleFindJobs = () => {
    const query = searchInput.trim()
      ? `?search=${encodeURIComponent(searchInput)}`
      : "";
    navigate(`/jobs${query}`);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Badge */}
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 rounded-full border border-neon-lime/50 bg-neon-lime/10 flex items-center gap-2 text-neon-lime text-sm font-medium">
            ✨ AI-Powered Career Platform for Freshers
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight text-center">
          Your{" "}
          <span className="text-neon-lime curved-underline">Career Jugaad</span>
          <br />
          Starts Here
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed text-center">
          Smart job search, AI-powered resume builder, salary predictions & ATS
          optimization — everything freshers need to land their dream tech job.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleFindJobs();
                }
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
            />
            <button
              onClick={handleFindJobs}
              className="absolute right-2 top-2 px-4 py-2 bg-neon-lime text-slate-950 font-bold rounded-md hover:shadow-lg hover:shadow-neon-lime/50 transition flex items-center gap-2"
            >
              Find Jobs
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-12 text-center">
          <p className="text-slate-400 text-sm mb-3">Popular:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchInput(tag);
                  navigate(`/jobs?search=${encodeURIComponent(tag)}`);
                }}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:border-neon-lime hover:text-neon-lime transition text-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 text-center hover:border-neon-lime/50 transition">
            <div className="text-2xl sm:text-3xl font-bold text-neon-lime">
              50K+
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Active Jobs</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 text-center hover:border-neon-lime/50 transition">
            <div className="text-2xl sm:text-3xl font-bold text-neon-lime">
              10K+
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Companies</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 text-center hover:border-neon-lime/50 transition">
            <div className="text-2xl sm:text-3xl font-bold text-neon-lime">
              1M+
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Job Seekers</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 text-center hover:border-neon-lime/50 transition">
            <div className="text-2xl sm:text-3xl font-bold text-neon-lime">
              95%
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              Placement Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
