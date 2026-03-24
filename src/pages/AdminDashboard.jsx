import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api/api';
import { Layout } from '../components/Layout';
import { StatChart } from '../components/StatChart';

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const showToast = (message, type = 'error') => {
      setToast({ message, type });
    };

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getStats();
        const usersData = await adminAPI.getUsers();
        setStats(data);
        setUsers(usersData);
        setLoading(false);
        setUsersLoading(false);
      } catch (e) {
        showToast(e.message);
        setLoading(false);
        setUsersLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Layout><p className="text-white">Loading...</p></Layout>;

  if (usersLoading) {
    return <p className="text-white">Loading users...</p>;
  }

  if (!users || users.length === 0) {
    return <p className="text-slate-400">No users found</p>;
  }

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 text-accent-emerald flex items-center justify-center text-2xl">
              <i className="ph ph-users"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.total_user_count || 0}</p>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-2xl">
              <i className="ph ph-hard-drives"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Total Servers</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.total_server_count || 0}</p>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent-purple/20 text-accent-purple flex items-center justify-center text-2xl">
              <i className="ph ph-shield-star"></i>
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Total Admins</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.total_admin_count || 0}</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Platform Users</h3>
              <p className="text-sm text-slate-400">Manage all registered accounts and their permissions.</p>
            </div>
            <div className="relative w-full md:w-64">
              <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Servers</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          user.role === 'admin'
                            ? 'bg-gradient-to-br from-accent-purple to-pink-500'
                            : user.status === 'suspended'
                            ? 'bg-red-900/30 border border-red-500/30 text-red-400'
                            : 'bg-slate-800 border border-slate-700 text-slate-400'
                        }`}>
                          {user.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className={`font-medium ${user.status === 'suspended' ? 'text-white line-through' : 'text-white'}`}>
                            {user.username}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{user.servers_count + " Active"}</td>
                    <td className="py-4 px-6">
                      {user.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-accent-purple/10 text-accent-purple text-xs font-medium border border-accent-purple/20">
                          <i className="ph ph-shield-star"></i> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
                          User
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {user.status === 'online' ? (
                        <span className="text-accent-emerald flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span> Online
                        </span>
                      ) : user.status === 'suspended' ? (
                        <span className="text-red-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Suspended
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Offline
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors p-1">
                        <i className="ph ph-dots-three-outline-vertical text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <StatChart
            type="doughnut"
            data={stats?.users_by_role || {}}
            title="Users by Role"
          />
          <StatChart
            type="bar"
            data={stats?.server_by_game_mode || {}}
            title="Servers by Game Mode"
          />
        </div>
      </div>
    </Layout>
  );
}
