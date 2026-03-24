import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";
import { Toast } from "../components/Toast";
import { Layout } from "../components/Layout";

export function RegisterNewUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
      setToast({ message, type });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setToast({ message: error.message, type: 'error' });
      return;
    }
    try {
      await authAPI.register(username, password, role);
      setToast({ message: 'Register successful!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {/* Register Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden z-10">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-purple"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider">
            NEXUS<span className="text-accent-emerald">HUB</span>
          </h1>
          <p className="text-slate-400 text-sm">Join the network.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Notch"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Confirm
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                required
              />
            </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Account Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all appearance-none cursor-pointer"
                >
                  <option value="user"><i className="ph ph-user"></i>User</option>
                  <option value="admin"><i className="ph ph-shield-star"></i> Admin</option>
                </select>
              </div>
          </div>

          {error && (
            <p className="text-accent-purple text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-accent-purple to-purple-600 hover:from-accent-purple hover:to-accent-cyan text-white font-pixel text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            INITIALIZE ACCOUNT
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Returning?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-white hover:text-accent-purple font-medium transition-colors"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </Layout>
  );
}
