import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serversAPI } from "../api/api";
import { Layout } from '../components/Layout';
import { Toast } from '../components/Toast';

export function AddServer() {
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [version, setVersion] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [motd, setMotd] = useState('');
  const [port, setPort] = useState('25565');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
      setToast({ message, type });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverData = {
        name,
        ip_address: ipAddress,
        version,
        game_mode: gameMode,
        image_url: imageUrl,
      };
      await serversAPI.create(serverData);
      showToast('Server deployed successfully!', 'success');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <Layout>
      {toast && (
              <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
      <div className="max-w-3xl mx-auto">
        <div className="bg-card backdrop-blur-md border border-white/5 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Server Icon Upload */}
            <div className="flex items-center gap-6 pb-6 border-b border-white/5">
              <div className="w-20 h-20 rounded-xl bg-slate-900 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:text-accent-emerald hover:border-accent-emerald cursor-pointer transition-colors">
                <i className="ph ph-upload-simple text-2xl"></i>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Server Icon</h4>
                <p className="text-xs text-slate-400">Upload a 64x64 PNG image. Max 1MB.</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Server Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Awesome Factions"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Game Version
                </label>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select version...</option>
                  <option value="Paper 1.20.4">Paper 1.20.4 (Recommended)</option>
                  <option value="Spigot 1.20.4">Spigot 1.20.4</option>
                  <option value="Vanilla 1.20.4">Vanilla 1.20.4</option>
                  <option value="Paper 1.19.4">Paper 1.19.4</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  IP Domain (Optional)
                </label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="play.yourdomain.com"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Port
                </label>
                <input
                  type="number"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Game Mode
                </label>
                <select
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select game mode...</option>
                  <option value="survival">Survival</option>
                  <option value="creative">Creative</option>
                  <option value="pvp">PVP</option>
                  <option value="factions">Factions</option>
                  <option value="skyblock">Skyblock</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  MOTD Description
                </label>
                <textarea
                  rows="3"
                  value={motd}
                  onChange={(e) => setMotd(e.target.value)}
                  placeholder="Welcome to the best server ever!"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex justify-end gap-3 w-full">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-accent-emerald to-emerald-600 hover:from-accent-emerald hover:to-accent-cyan text-white font-pixel text-xs py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
                >
                  DEPLOY SERVER
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
