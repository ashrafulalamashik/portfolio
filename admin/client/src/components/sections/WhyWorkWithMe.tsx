import { useState } from 'react';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { SiteContent, WhyItem } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function WhyWorkWithMe({ content, update }: Props) {
  const items = content.whyWorkWithMe || [];
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const updateItem = (i: number, field: keyof WhyItem, val: string) => {
    const arr = items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    update('whyWorkWithMe', arr);
  };

  const addItem = () => update('whyWorkWithMe', [...items, { title: '', description: '' }]);
  const removeItem = (i: number) => {
    if (confirm('Remove this point?')) update('whyWorkWithMe', items.filter((_, idx) => idx !== i));
  };

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    update('whyWorkWithMe', arr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <HelpCircle size={20} className="text-[#22C55E]" /> Why Work With Me
        </h1>
        <Button size="sm" icon={<Plus size={13} />} onClick={addItem}>Add Point</Button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] text-xs font-bold">{i + 1}</span>
                <span className="text-sm font-medium text-zinc-300">Point {i + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 text-xs px-2 py-1 border border-zinc-800 rounded-lg">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 text-xs px-2 py-1 border border-zinc-800 rounded-lg">↓</button>
                <button onClick={() => removeItem(i)} className="text-red-500/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <Input
              label="Title"
              value={item.title}
              onChange={(e) => updateItem(i, 'title', e.target.value)}
              placeholder="e.g. Proven Leadership Experience"
            />
            <Textarea
              label="Description"
              rows={2}
              value={item.description}
              onChange={(e) => updateItem(i, 'description', e.target.value)}
              placeholder="Explain why this makes you a great choice..."
            />
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-zinc-600 text-center py-6">No points added yet.</p>}
      </div>
    </div>
  );
}
