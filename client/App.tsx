import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import SalaryPredictorPage from "./pages/SalaryPredictorPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import ATSCalculatorPage from "./pages/ATSCalculatorPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="/salary-predictor" element={<SalaryPredictorPage />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/ats-calculator" element={<ATSCalculatorPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
