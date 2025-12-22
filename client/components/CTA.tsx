import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border border-neon-lime/30 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-slate-900/80 backdrop-blur p-12 sm:p-16 overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-lime/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-lime/5 rounded-full blur-3xl -z-10" />

          <div className="text-center relative z-10">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-neon-lime/50 bg-neon-lime/10 text-neon-lime text-sm font-medium flex items-center gap-2">
              <Sparkles size={16} />
              Ready to Transform Your Career?
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Start Your Journey Today
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of freshers who've landed their dream tech jobs. Your perfect role is just one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-2xl hover:shadow-neon-lime/50 transition transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-neon-lime text-neon-lime font-bold rounded-lg hover:bg-neon-lime/10 transition transform hover:scale-105 text-lg">
                Schedule Demo
              </button>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
