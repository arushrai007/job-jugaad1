import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ATSScoreRequest, ATSScoreResponse } from "@shared/api";
import { toast } from "sonner";

export default function ATSCalculatorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSScoreResponse | null>(null);

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        } as ATSScoreRequest),
      });

      const data: ATSScoreResponse = await response.json();
      setResult(data);
    } catch (error) {
      toast.error("Failed to calculate ATS score");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-400/20 border-green-400/50";
    if (percentage >= 60) return "bg-yellow-400/20 border-yellow-400/50";
    return "bg-red-400/20 border-red-400/50";
  };

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

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-neon-lime" />
              <h1 className="text-4xl sm:text-5xl font-black text-white">
                ATS <span className="text-neon-lime">Score Calculator</span>
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Optimize your resume for Applicant Tracking Systems and increase
              your chances of getting interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Resume Text */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
                <label className="block text-lg font-bold text-white mb-4">
                  Your Resume
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition h-64 resize-none font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {resumeText.length} characters
                </p>
              </div>

              {/* Job Description */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
                <label className="block text-lg font-bold text-white mb-4">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition h-64 resize-none font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {jobDescription.length} characters
                </p>
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full py-3 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Calculate ATS Score"}
              </button>
            </div>

            {/* Results Section */}
            <div>
              {result ? (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div
                    className={`rounded-xl border-2 p-6 ${getScoreBgColor(result.percentage)}`}
                  >
                    <div className="text-center mb-6">
                      <p className="text-slate-400 text-sm mb-2">ATS Score</p>
                      <div className="text-6xl font-black mb-2">
                        <span className={getScoreColor(result.percentage)}>
                          {result.percentage}%
                        </span>
                      </div>
                      <p className="text-slate-300">
                        {result.score} out of {result.maxScore} points
                      </p>
                    </div>

                    {/* Score Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          result.percentage >= 80
                            ? "bg-green-400"
                            : result.percentage >= 60
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  {result.matchedKeywords.length > 0 && (
                    <div className="rounded-xl border border-green-400/50 bg-green-400/10 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="font-bold text-green-400">
                          Matched Keywords ({result.matchedKeywords.length})
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedKeywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-green-400/20 text-green-400 text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Keywords */}
                  {result.missingKeywords.length > 0 && (
                    <div className="rounded-xl border border-yellow-400/50 bg-yellow-400/10 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-bold text-yellow-400">
                          Missing Keywords ({result.missingKeywords.length})
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
                      <h3 className="font-bold text-white mb-4">
                        Recommendations
                      </h3>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-neon-lime mt-1 text-lg">
                              →
                            </span>
                            <span className="text-slate-300 text-sm">
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6 h-full flex items-center justify-center">
                  <p className="text-center text-slate-400">
                    Fill in your resume and job description, then click
                    "Calculate ATS Score" to see detailed analysis and
                    recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
