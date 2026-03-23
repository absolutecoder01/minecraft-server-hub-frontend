import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { serversAPI } from '../api/api';
import { Layout } from '../components/Layout';
import { Toast } from '../components/Toast';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all');

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const fetchServers = async () => {
    try {
      setLoading(true);
      const data = await serversAPI.getAll();
      setServers(data);

      setLoading(false);
    } catch (error) {
      showToast(error.message, 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this server?')) return;
    try {
      await serversAPI.delete(id);
      showToast('Server deleted successfully!', 'success');
      fetchServers();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const filteredServers = servers.filter((server) => {
    if (filter === 'mine') {
      return server.owner_id === user?.id || user?.role === 'admin';
    }
    return true;
  });

  const canModifyServer = (server) => {
    return user?.role === 'admin' || server.owner_id === user?.id;
  };

  if (loading) return <Layout><p className="text-white">Loading...</p></Layout>;

  return (
    <Layout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-slate-400">Manage your server instances</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-slate-900/50 rounded-xl p-1 border border-white/5">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Servers
            </button>
            <button
              onClick={() => setFilter('mine')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'mine'
                  ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              My Servers
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 text-accent-emerald flex items-center justify-center text-2xl">
              <i className="ph ph-hard-drives"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Active Servers</p>
              <p className="text-2xl font-bold text-white mt-1">{filteredServers.length}</p>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-2xl">
              <i className="ph ph-users"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Total Players</p>
              <p className="text-2xl font-bold text-white mt-1">1,042</p>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-purple/20 text-accent-purple flex items-center justify-center text-2xl">
              <i className="ph ph-activity"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Network Uptime</p>
              <p className="text-2xl font-bold text-white mt-1">99.8%</p>
            </div>
          </div>
        </div>

        {/* Servers Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {filter === 'all' ? 'All Instances' : 'Your Instances'}
            </h3>
            <button
              onClick={() => navigate('/add-server')}
              className="flex items-center gap-2 text-sm font-medium text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 px-4 py-2 rounded-lg transition-colors"
            >
              <i className="ph ph-plus-bold"></i> New Server
            </button>
          </div>

          {filteredServers.length === 0 ? (
            <div
              onClick={() => navigate('/add-server')}
              className="border-2 border-dashed border-slate-700/50 hover:border-accent-emerald/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 hover:bg-accent-emerald/10 text-slate-400 hover:text-accent-emerald flex items-center justify-center text-xl mb-3 transition-colors">
                <i className="ph ph-plus"></i>
              </div>
              <h4 className="text-white font-medium mb-1">
                {filter === 'mine' ? 'You don\'t own any servers yet' : 'No servers found!'}
              </h4>
              <p className="text-xs text-slate-500">
                {filter === 'mine'
                  ? 'Create your first server to get started'
                  : 'Deploy your first Vanilla, Spigot, or Paper instance'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServers.map((server) => {
                const isOwner = canModifyServer(server);

                return (
                  <div
                    key={server.id}
                    className="group bg-card backdrop-blur-md border border-white/5 hover:border-accent-emerald/50 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                          <i className="ph ph-sword text-xl text-slate-400"></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-pixel text-sm text-white">{server.name}</h4>
                            {isOwner && (
                              <span className="text-[10px] bg-accent-emerald/20 text-accent-emerald px-2 py-0.5 rounded-full border border-accent-emerald/30">
                                OWNED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse shadow-[0_0_8px_#10b981]"></span>
                            <span className="text-xs text-accent-emerald font-medium">Online</span>
                          </div>
                        </div>
                      </div>
                      {isOwner && (
                        <button
                          onClick={() => navigate(`/edit-server/${server.id}`)}
                          className="text-slate-500 hover:text-white transition-colors p-2 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                          <i className="ph ph-pencil-simple"></i>
                        </button>
                      )}
                    </div>

                    <div className="bg-slate-900/50 rounded-xl p-3 flex justify-between items-center mb-4 border border-white/5">
                      <code className="text-sm text-accent-cyan font-mono">{server.ip_address}</code>
                      <button className="text-slate-400 hover:text-white transition-colors">
                        <i className="ph ph-copy"></i>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Version: <span className="text-white">{server.version}</span>
                      </span>
                      <span className="text-slate-400">
                        <i className="ph ph-users text-accent-emerald"></i> {server.game_mode}
                      </span>
                    </div>

                    {isOwner && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                        <button
                          onClick={() => navigate(`/edit-server/${server.id}`)}
                          className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(server.id)}
                          className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {!isOwner && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs text-slate-500 text-center">
                          <i className="ph ph-lock-key"></i>Only admin or owner can modify
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
