import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serversAPI } from '../api/api';
import { Layout } from '../components/Layout';

export function EditServer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [version, setVersion] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [motd, setMotd] = useState('');
  const [port, setPort] = useState('25565');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
      setToast({ message, type });
    };

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const data = await serversAPI.getById(id);
        setName(data.name);
        setIpAddress(data.ip_address);
        setVersion(data.version);
        setGameMode(data.game_mode);
        setImageUrl(data.image_url);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchServer();
  }, [id]);

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
      await serversAPI.update(id, serverData);
      showToast('Server updated successfully!', 'success');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to terminate this server?')) return;
    try {
      await serversAPI.delete(id);
      showToast('Server terminated!', 'success');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  if (loading) return <Layout><p className="text-white">Loading...</p></Layout>;
  if (error) return <Layout><p className="text-accent-emerald">Error: {error}</p></Layout>;

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
                {imageUrl ? (
                  <img src={imageUrl} alt="Server icon" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <i className="ph ph-upload-simple text-2xl"></i>
                )}
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
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-accent-purple text-sm text-center">{error}</p>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
              >
                <i className="ph ph-trash align-middle"></i> Terminate Server
              </button>
              <div className="flex justify-end gap-3">
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
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
