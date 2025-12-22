import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  MapPin,
  DollarSign,
  Briefcase,
  Filter,
} from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Job, JobsListResponse } from "@shared/api";
import { toast } from "sonner";

export default function JobsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/jobs?${query}`);
      const data: JobsListResponse = await response.json();

      setJobs(data.jobs);
      setTotal(data.total);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-neon-lime transition mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Find Your <span className="text-neon-lime">Dream Job</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              {total} opportunities waiting for you
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title, company, or skills..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition flex items-center gap-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="w-8 h-8 border-4 border-slate-700 border-t-neon-lime rounded-full"></div>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-slate-400">No jobs found</p>
              <p className="text-sm text-slate-500 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur hover:border-neon-lime/50 hover:bg-slate-900/80 transition cursor-pointer group"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-neon-lime transition">
                          {job.title}
                        </h3>
                        <p className="text-slate-400">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-lime font-bold text-lg">
                          {job.salary}
                        </p>
                        <p className="text-xs text-slate-500">Per annum</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {job.applicants} applicants
                      </div>
                      <div className="text-slate-500">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-neon-lime/10 text-neon-lime text-xs font-medium"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs font-medium">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-neon-lime hover:text-neon-lime disabled:opacity-50 transition"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }).map(
                      (_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition ${
                              currentPage === pageNum
                                ? "bg-neon-lime text-slate-950 font-bold"
                                : "border border-slate-700 text-slate-300 hover:border-neon-lime"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-neon-lime hover:text-neon-lime disabled:opacity-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
