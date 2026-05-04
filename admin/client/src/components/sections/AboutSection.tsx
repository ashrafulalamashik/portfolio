import { FileText, Plus, Trash2 } from 'lucide-react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { SiteContent } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function AboutSection({ content, update }: Props) {
  const about = content.about;
  const set = (field: string, value: any) => update('about', { ...about, [field]: value });

  const updateParagraph = (i: number, val: string) => {
    const arr = [...about.paragraphs];
    arr[i] = val;
    set('paragraphs', arr);
  };
  const addParagraph = () => set('paragraphs', [...about.paragraphs, '']);
  const removeParagraph = (i: number) => set('paragraphs', about.paragraphs.filter((_, idx) => idx !== i));

  const updateQuickStat = (i: number, field: 'value' | 'label', val: string) => {
    const arr = about.quickStats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    set('quickStats', arr);
  };
  const addQuickStat = () => set('quickStats', [...(about.quickStats || []), { value: '', label: '' }]);
  const removeQuickStat = (i: number) => set('quickStats', about.quickStats.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <FileText size={20} className="text-[#22C55E]" /> About Section
      </h1>

      {/* Bio Paragraphs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Bio Paragraphs</h2>
            <p className="text-xs text-zinc-500 mt-1">Each entry is a separate paragraph in the About section</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addParagraph} icon={<Plus size={13} />}>Add Paragraph</Button>
        </div>

        <div className="space-y-3">
          {(about.paragraphs || []).map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="mt-2.5 text-xs text-zinc-600 w-5 shrink-0 text-right">{i + 1}</span>
              <Textarea
                className="flex-1"
                rows={3}
                value={para}
                onChange={(e) => updateParagraph(i, e.target.value)}
                placeholder="About paragraph text..."
              />
              <button onClick={() => removeParagraph(i)} className="mt-2.5 text-red-500/60 hover:text-red-400 transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Quick Stats</h2>
            <p className="text-xs text-zinc-500 mt-1">Highlight numbers (e.g. 200+ Team Members)</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addQuickStat} icon={<Plus size={13} />}>Add Stat</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(about.quickStats || []).map((stat, i) => (
            <div key={i} className="flex gap-2 items-start bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input label="Value" value={stat.value} onChange={(e) => updateQuickStat(i, 'value', e.target.value)} placeholder="200+" />
                <Input label="Label" value={stat.label} onChange={(e) => updateQuickStat(i, 'label', e.target.value)} placeholder="Team Members" />
              </div>
              <button onClick={() => removeQuickStat(i)} className="mt-6 text-red-500/60 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
