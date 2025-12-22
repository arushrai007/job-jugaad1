import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neon-lime/20 bg-slate-950/50 backdrop-blur py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Jugaad</h3>
            <p className="text-slate-400 text-sm">
              Empowering freshers to find their dream jobs
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon-lime transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-neon-lime transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-neon-lime transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-neon-lime transition">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm">
          <p>&copy; 2024 Jugaad. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-neon-lime transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neon-lime transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
