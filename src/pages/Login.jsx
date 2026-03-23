import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toast } from "../components/Toast";

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
      setToast({ message, type });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setError(error.message);
      setToast({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-dark text-slate-300 font-sans antialiased relative overflow-hidden flex items-center justify-center p-4">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {/* Background Blur Effects */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] bg-accent-emerald/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden z-10">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-purple"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider">
            NEXUS<span className="text-accent-emerald">HUB</span>
          </h1>
          <p className="text-slate-400 text-sm">Welcome back, Commander.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="steve@craft.net"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-accent-emerald focus:ring-accent-emerald focus:ring-offset-slate-900" />
              <span className="text-slate-400 group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-accent-cyan hover:text-accent-emerald transition-colors">
              Forgot password?
            </a>
          </div>

          {error && (
            <p className="text-accent-purple text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent-emerald to-emerald-600 hover:from-accent-emerald hover:to-accent-cyan text-white font-pixel text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            ACCESS TERMINAL
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            No account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-white hover:text-accent-emerald font-medium transition-colors"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
