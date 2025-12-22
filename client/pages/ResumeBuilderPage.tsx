import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ResumeData, ResumeSaveResponse } from "@shared/api";
import { toast } from "sonner";

export default function ResumeBuilderPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [resume, setResume] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });

  const handleSaveResume = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const userId = JSON.parse(user).id;

    setSaving(true);
    try {
      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: resume, userId }),
      });

      const data: ResumeSaveResponse = await response.json();

      if (data.success) {
        toast.success("Resume saved successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setSaving(false);
    }
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

          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-neon-lime" />
                <h1 className="text-4xl sm:text-5xl font-black text-white">
                  Resume <span className="text-neon-lime">Builder</span>
                </h1>
              </div>
              <p className="text-lg text-slate-400">
                Create a stunning ATS-friendly resume with our drag-and-drop
                editor.
              </p>
            </div>
            <button
              onClick={handleSaveResume}
              disabled={saving}
              className="px-6 py-3 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Resume"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.name}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: {
                            ...resume.personalInfo,
                            name: e.target.value,
                          },
                        })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) =>
                          setResume({
                            ...resume,
                            personalInfo: {
                              ...resume.personalInfo,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={(e) =>
                          setResume({
                            ...resume,
                            personalInfo: {
                              ...resume.personalInfo,
                              phone: e.target.value,
                            },
                          })
                        }
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: {
                            ...resume.personalInfo,
                            location: e.target.value,
                          },
                        })
                      }
                      placeholder="Bangalore, India"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      value={resume.personalInfo.summary}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: {
                            ...resume.personalInfo,
                            summary: e.target.value,
                          },
                        })
                      }
                      placeholder="Brief overview of your professional goals and skills..."
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition h-24 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6">
                <h2 className="text-xl font-bold text-white mb-4">Skills</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resume.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/20 text-neon-lime text-sm"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setResume({
                            ...resume,
                            skills: resume.skills.filter((_, i) => i !== idx),
                          })
                        }
                        className="hover:text-neon-lime/70"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="Add a skill (e.g., React, Python, AWS)..."
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const input = e.currentTarget;
                        if (input.value.trim()) {
                          setResume({
                            ...resume,
                            skills: [...resume.skills, input.value.trim()],
                          });
                          input.value = "";
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById(
                        "skillInput",
                      ) as HTMLInputElement;
                      if (input.value.trim()) {
                        setResume({
                          ...resume,
                          skills: [...resume.skills, input.value.trim()],
                        });
                        input.value = "";
                      }
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-6 sticky top-40">
              <h2 className="text-xl font-bold text-white mb-6">Preview</h2>

              <div className="bg-white text-slate-950 p-6 rounded-lg text-sm space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {resume.personalInfo.name || "Your Name"}
                  </h3>
                  <p className="text-slate-600 text-xs">
                    {resume.personalInfo.location} | {resume.personalInfo.email}{" "}
                    | {resume.personalInfo.phone}
                  </p>
                </div>

                {resume.personalInfo.summary && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide">
                      Summary
                    </h4>
                    <p className="text-xs mt-1">
                      {resume.personalInfo.summary}
                    </p>
                  </div>
                )}

                {resume.skills.length > 0 && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide">
                      Skills
                    </h4>
                    <p className="text-xs mt-1">{resume.skills.join(" • ")}</p>
                  </div>
                )}

                <p className="text-xs text-slate-500 italic mt-4">
                  Your resume will be fully formatted when downloaded
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
