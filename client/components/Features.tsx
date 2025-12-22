import { Search, TrendingUp, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Job Search",
    description: "AI-powered job matching that understands your preferences to find perfect opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Salary Predictor",
    description: "Get accurate salary predictions based on your skills, experience, and market trends.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create stunning, ATS-friendly resumes with our advanced drag-and-drop editor.",
  },
  {
    icon: Zap,
    title: "ATS Score Calculator",
    description: "Optimize your resume for Applicant Tracking Systems and increase interview chances.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-neon-lime/50 bg-neon-lime/10 text-neon-lime text-sm font-medium">
            🚀 Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Everything You Need to <span className="text-neon-lime">Succeed</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our AI-powered tools give you the edge in today's competitive job market
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur hover:border-neon-lime/50 hover:bg-slate-900/80 transition group"
              >
                <div className="w-14 h-14 rounded-full bg-neon-lime/20 flex items-center justify-center mb-4 group-hover:bg-neon-lime/30 transition">
                  <Icon className="w-7 h-7 text-neon-lime" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
