import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { LoginRequest, RegisterRequest, LoginResponse } from "@shared/api";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  // Register state
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-neon-lime transition mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur p-8">
            {isLogin ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <LogIn className="w-6 h-6 text-neon-lime" />
                  <h1 className="text-3xl font-bold">Welcome Back</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <div className="mt-6 text-center text-slate-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-neon-lime hover:underline font-semibold"
                  >
                    Sign up
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <UserPlus className="w-6 h-6 text-neon-lime" />
                  <h1 className="text-3xl font-bold">Create Account</h1>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-neon-lime/50 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-neon-lime text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-lime/50 transition disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Sign Up"}
                  </button>
                </form>

                <div className="mt-6 text-center text-slate-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-neon-lime hover:underline font-semibold"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
