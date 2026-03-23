import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: 'ph-squares-four' },
    { path: '/add-server', label: 'Add Server', icon: 'ph-plus-circle' },
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin Panel', icon: 'ph-shield-star' }] : []),
  ];

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1
            className="font-pixel text-xl text-white tracking-wider cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            NEXUS<span className="text-accent-emerald">HUB</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                location.pathname === item.path
                  ? 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/50'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-transparent'
              }`}
            >
              <i className={`ph ${item.icon} text-xl`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center font-pixel text-xs text-white">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username}</p>
              <p className="text-xs text-slate-400 truncate capitalize">{user?.role}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
              <i className="ph ph-sign-out text-lg"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-slate-900/30 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="font-pixel text-lg text-white">DASHBOARD</h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <i className="ph ph-bell text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-emerald rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
