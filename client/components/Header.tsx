import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, FileText, TrendingUp, Zap } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/jobs");
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-neon-lime/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-lime to-neon-lime flex items-center justify-center font-bold text-slate-950">
            J
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline">
            Jugaad
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-slate-300 hover:text-neon-lime transition"
          >
            <Search size={18} />
            Jobs
          </Link>
          <Link
            to="/resume-builder"
            className="flex items-center gap-2 text-slate-300 hover:text-neon-lime transition"
          >
            <FileText size={18} />
            Resume Builder
          </Link>
          <Link
            to="/salary-predictor"
            className="flex items-center gap-2 text-slate-300 hover:text-neon-lime transition"
          >
            <TrendingUp size={18} />
            Salary Predictor
          </Link>
          <Link
            to="/ats-calculator"
            className="flex items-center gap-2 text-slate-300 hover:text-neon-lime transition"
          >
            <Zap size={18} />
            ATS Calculator
          </Link>
          <Link
            to="/login"
            className="text-slate-300 hover:text-neon-lime transition"
          >
            Login
          </Link>
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-neon-lime"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-neon-lime/20 p-4 space-y-4">
          <Link
            to="/jobs"
            className="block text-slate-300 hover:text-neon-lime"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/resume-builder"
            className="block text-slate-300 hover:text-neon-lime"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume Builder
          </Link>
          <Link
            to="/salary-predictor"
            className="block text-slate-300 hover:text-neon-lime"
            onClick={() => setMobileMenuOpen(false)}
          >
            Salary Predictor
          </Link>
          <Link
            to="/ats-calculator"
            className="block text-slate-300 hover:text-neon-lime"
            onClick={() => setMobileMenuOpen(false)}
          >
            ATS Calculator
          </Link>
          <Link
            to="/login"
            className="block text-slate-300 hover:text-neon-lime"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <button
            onClick={handleGetStarted}
            className="w-full px-6 py-2 bg-neon-lime text-slate-950 font-bold rounded-lg"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
