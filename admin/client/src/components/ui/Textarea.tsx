import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>}
      <textarea
        ref={ref}
        rows={3}
        className={`w-full bg-zinc-900 border ${error ? 'border-red-500/50' : 'border-zinc-700'} rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 focus:ring-1 focus:ring-[#22C55E]/30 transition-all resize-y ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-zinc-600">{hint}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
export default Textarea;
