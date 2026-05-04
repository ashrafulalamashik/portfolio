import { Menu, Save, Globe, LogOut, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  saving: boolean;
  publishing: boolean;
  lastSaved?: string;
  lastPublished?: string;
  isDirty: boolean;
}

function fmtTime(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Header({
  onMenuClick, onSaveDraft, onPublish, saving, publishing, lastSaved, lastPublished, isDirty,
}: HeaderProps) {
  const { username, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 gap-3">
      <button onClick={onMenuClick} className="lg:hidden text-zinc-400 hover:text-zinc-100 p-1">
        <Menu size={20} />
      </button>

      {/* Timestamps */}
      <div className="hidden md:flex items-center gap-4 text-xs text-zinc-600">
        {lastSaved && (
          <span className="flex items-center gap-1.5">
            <Clock size={11} /> Draft saved {fmtTime(lastSaved)}
          </span>
        )}
        {lastPublished && (
          <span className="flex items-center gap-1.5 text-[#22C55E]/60">
            <Globe size={11} /> Published {fmtTime(lastPublished)}
          </span>
        )}
        {isDirty && <span className="text-amber-500/70">Unsaved changes</span>}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="secondary" size="sm" icon={<Save size={14} />} onClick={onSaveDraft} loading={saving}>
          Save Draft
        </Button>
        <Button variant="primary" size="sm" icon={<Globe size={14} />} onClick={onPublish} loading={publishing}>
          Publish
        </Button>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-zinc-800">
          <span className="text-xs text-zinc-500">{username}</span>
          <button onClick={logout} className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-zinc-900" title="Logout">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
