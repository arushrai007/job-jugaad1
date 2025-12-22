import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedJobs from "@/components/FeaturedJobs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />
      <Hero />
      <Features />
      <FeaturedJobs />
      <CTA />
      <Footer />
    </div>
  );
}
