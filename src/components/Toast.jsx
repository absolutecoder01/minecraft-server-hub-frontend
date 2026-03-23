import { useEffect } from 'react';

export function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: 'ph-warning-circle'
    },
    success: {
      bg: 'bg-accent-emerald/20',
      border: 'border-accent-emerald/50',
      text: 'text-accent-emerald',
      icon: 'ph-check-circle'
    },
    info: {
      bg: 'bg-accent-cyan/20',
      border: 'border-accent-cyan/50',
      text: 'text-accent-cyan',
      icon: 'ph-info'
    }
  };

  const style = styles[type] || styles.error;

  return (
    <div className={`fixed top-6 right-6 z-50 ${style.bg} ${style.border} border backdrop-blur-md rounded-xl p-4 shadow-2xl animate-slide-in flex items-center gap-3 min-w-[300px]`}>
      <i className={`ph ${style.icon} text-xl ${style.text}`}></i>
      <p className={`text-sm font-medium ${style.text} flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <i className="ph ph-x text-lg"></i>
      </button>
    </div>
  );
}
