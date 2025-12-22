import { useEffect } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: "lime" | "yellow";
  blur: number;
}

export default function AnimatedBackground() {
  useEffect(() => {
    const colors: ("lime" | "yellow")[] = ["lime", "yellow"];

    const createParticle = (): Particle => {
      return {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        duration: Math.random() * 4 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: Math.random() * 0.3,
      };
    };

    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    const createParticleElement = (particle: Particle) => {
      const div = document.createElement("div");
      div.className = `particle particle-${particle.color}`;
      div.style.left = `${particle.left}%`;
      div.style.width = `${particle.size}px`;
      div.style.height = `${particle.size}px`;
      div.style.setProperty("--duration", `${particle.duration}s`);
      div.style.setProperty("--tx", `${(Math.random() - 0.5) * 120}px`);
      div.style.filter = `blur(${particle.blur}px)`;
      particlesContainer.appendChild(div);

      setTimeout(() => div.remove(), particle.duration * 1000);
    };

    const interval = setInterval(() => {
      createParticleElement(createParticle());
    }, 300);

    // Initial burst
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createParticleElement(createParticle()), i * 100);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-background opacity-20" />

        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-neon-lime/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-neon-lime/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-neon-lime/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Particles container */}
      <div id="particles" className="fixed inset-0 pointer-events-none" />
    </>
  );
}
