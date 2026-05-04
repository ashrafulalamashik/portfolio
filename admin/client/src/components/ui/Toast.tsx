import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToast, ToastType } from '../../contexts/ToastContext';

const icons: Record<ToastType, JSX.Element> = {
  success: <CheckCircle size={18} className="text-[#22C55E]" />,
  error: <XCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-blue-400" />,
};

const borders: Record<ToastType, string> = {
  success: 'border-[#22C55E]/40',
  error: 'border-red-500/40',
  info: 'border-blue-500/40',
};

export default function Toast() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 bg-zinc-900 border ${borders[t.type]} rounded-xl px-4 py-3 shadow-2xl pointer-events-auto min-w-[280px] max-w-sm animate-in slide-in-from-right-4`}
        >
          {icons[t.type]}
          <span className="text-sm text-zinc-100 flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
