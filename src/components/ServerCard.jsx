export function ServerCard({ server, onEdit, onDelete }) {
  const isOnline = server.status === 'online';

  return (
    <div className="bg-nexus-card rounded-xl border border-nexus-border p-6 hover:border-nexus-primary transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={server.image_url || '/placeholder.png'}
            alt={server.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-bold">{server.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-nexus-success' : 'bg-nexus-danger'}`} />
              <span className={`text-sm ${isOnline ? 'text-nexus-success' : 'text-nexus-danger'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <p>{server.ip_address}</p>
        <p>Version: {server.version}</p>
        <p>{server.game_mode}</p>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-nexus-border">
        <button
          onClick={() => onEdit(server.id)}
          className="flex-1 py-2 bg-nexus-hover rounded-lg hover:bg-nexus-border transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(server.id)}
          className="flex-1 py-2 bg-nexus-danger/20 text-nexus-danger rounded-lg hover:bg-nexus-danger/30 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
