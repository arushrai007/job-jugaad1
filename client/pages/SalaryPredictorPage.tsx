import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { SalaryPredictionRequest, SalaryPredictionResponse } from "@shared/api";
import { toast } from "sonner";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "Data Scientist",
  "Data Analyst",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Product Manager",
  "QA Engineer",
  "UI/UX Designer",
];

const locations = [
  "San Francisco",
  "New York",
  "Bangalore",
  "Delhi",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Remote",
];

const suggestedSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "AWS",
  "Kubernetes",
  "Docker",
  "Machine Learning",
  "Data Science",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST",
];

export default function SalaryPredictorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SalaryPredictionResponse | null>(null);

  const [formData, setFormData] = useState<SalaryPredictionRequest>({
    skills: [],
    experience: 0,
    location: "Bangalore",
    role: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddCustomSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput],
      });
      setSkillInput("");
    }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    if (formData.skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/salary-predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: SalaryPredictionResponse = await response.json();
      setResult(data);
    } catch (error) {
      toast.error("Failed to predict salary");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
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
              <TrendingUp className="w-8 h-8 text-neon-lime" />
              <h1 className="text-4xl sm:text-5xl font-black text-white">
                Salary <span className="text-neon-lime">Predictor</span>
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Get accurate salary predictions based on your skills, experience,
              and market trends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
              <form onSubmit={handlePredict} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Job Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-neon-lime/50 transition"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Years of Experience: {formData.experience}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    For freshers, keep this at 0
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-neon-lime/50 transition"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Skills *
                  </label>

                  {/* Selected Skills */}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/20 text-neon-lime text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-neon-lime/70"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Custom Skill Input */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomSkill();
                        }
                      }}
                      placeholder="Add custom skill..."
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-sm font-medium"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Suggested Skills */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2">
                      Popular skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleAddSkill(skill)}
                          disabled={formData.skills.includes(skill)}
                          className="px-3 py-1 border border-slate-700 text-slate-300 rounded-full text-xs hover:border-neon-lime hover:text-neon-lime disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition disabled:opacity-50"
                >
                  {loading ? "Predicting..." : "Predict Salary"}
                </button>
              </form>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div className="rounded-xl border border-neon-lime/50 bg-neon-lime/10 p-6">
                  <h2 className="text-2xl font-bold text-neon-lime mb-6">
                    Your Salary Range
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">
                        Minimum Salary
                      </p>
                      <p className="text-3xl font-black text-neon-lime">
                        {formatCurrency(result.minSalary)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-2">
                        Average Salary
                      </p>
                      <p className="text-3xl font-black text-white">
                        {formatCurrency(result.averageSalary)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-2">
                        Maximum Salary
                      </p>
                      <p className="text-3xl font-black text-neon-lime">
                        {formatCurrency(result.maxSalary)}
                      </p>
                    </div>

                    <div className="border-t border-slate-700 pt-4">
                      <p className="text-slate-400 text-sm mb-2">
                        Market Trend
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {result.marketTrend}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">
                      Factors Considered
                    </h3>
                    <ul className="space-y-2">
                      {result.factors.map((factor, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <span className="text-neon-lime mt-1">✓</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 h-full flex items-center justify-center">
                  <p className="text-center text-slate-400">
                    Fill in the form and click "Predict Salary" to see your
                    salary prediction.
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
