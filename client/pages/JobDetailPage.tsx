import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Calendar,
  Share2,
} from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Job } from "@shared/api";
import { toast } from "sonner";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    if (!id) {
      toast.error("Invalid job ID");
      navigate("/jobs");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${id}`);
      if (!response.ok) {
        throw new Error("Job not found");
      }
      const data: Job = await response.json();
      setJob(data);
    } catch (error) {
      toast.error("Failed to load job details");
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <AnimatedBackground />
        <Header />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-slate-700 border-t-neon-lime rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <AnimatedBackground />
        <Header />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-center text-slate-400">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 text-slate-400 hover:text-neon-lime transition mb-8"
          >
            <ArrowLeft size={20} />
            Back to Jobs
          </button>

          <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">
                  {job.title}
                </h1>
                <p className="text-xl text-slate-400">{job.company}</p>
              </div>
              <button className="p-3 rounded-lg border border-slate-700 hover:border-neon-lime text-slate-400 hover:text-neon-lime transition">
                <Share2 size={20} />
              </button>
            </div>

            {/* Key Info */}
            <div className="grid sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-lime/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-neon-lime" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Salary</p>
                  <p className="font-bold text-white">{job.salary}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-lime/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-neon-lime" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="font-bold text-white">{job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-lime/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-neon-lime" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Applicants</p>
                  <p className="font-bold text-white">{job.applicants}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-lime/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-neon-lime" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Posted</p>
                  <p className="font-bold text-white">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                About the Role
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="text-neon-lime text-xl mt-0.5">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <button className="flex-1 py-3 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition">
                Apply Now
              </button>
              <button
                onClick={() => navigate("/resume-builder")}
                className="flex-1 py-3 border border-neon-lime text-neon-lime font-bold rounded-lg hover:bg-neon-lime/10 transition"
              >
                Build Resume First
              </button>
            </div>
          </div>

          {/* Similar Jobs Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Jobs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur hover:border-neon-lime/50 transition cursor-pointer"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <h3 className="text-lg font-bold text-white mb-2">
                    Full Stack Developer
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Tech Company • Remote
                  </p>
                  <p className="text-neon-lime font-semibold">8-12 LPA</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
