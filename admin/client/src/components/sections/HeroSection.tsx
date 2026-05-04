import { useState } from 'react';
import { Layers, Plus, Trash2, GripVertical } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { SiteContent, Stat } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function HeroSection({ content, update }: Props) {
  const hero = content.hero;
  const [newText, setNewText] = useState('');

  const setHero = (field: string, value: any) => update('hero', { ...hero, [field]: value });

  const addTypewriterText = () => {
    const t = newText.trim();
    if (!t) return;
    setHero('typewriterTexts', [...(hero.typewriterTexts || []), t]);
    setNewText('');
  };

  const removeTypewriterText = (i: number) =>
    setHero('typewriterTexts', hero.typewriterTexts.filter((_, idx) => idx !== i));

  const moveText = (i: number, dir: -1 | 1) => {
    const arr = [...hero.typewriterTexts];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setHero('typewriterTexts', arr);
  };

  const updateStat = (i: number, field: keyof Stat, value: string) => {
    const stats = hero.stats.map((s, idx) => idx === i ? { ...s, [field]: value } : s);
    setHero('stats', stats);
  };

  const addStat = () => setHero('stats', [...(hero.stats || []), { value: '', label: '' }]);
  const removeStat = (i: number) => setHero('stats', hero.stats.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <Layers size={20} className="text-[#22C55E]" /> Hero Section
      </h1>

      {/* Typewriter Texts */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-300">Typewriter Texts</h2>
          <p className="text-xs text-zinc-500 mt-1">These cycle through in the hero headline. Drag arrows to reorder.</p>
        </div>

        <div className="space-y-2">
          {(hero.typewriterTexts || []).map((text, i) => (
            <div key={i} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 group">
              <GripVertical size={14} className="text-zinc-600 shrink-0" />
              <span className="flex-1 text-sm text-zinc-200">{text}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => moveText(i, -1)} disabled={i === 0} className="text-zinc-500 hover:text-zinc-200 disabled:opacity-30 px-1 text-xs">↑</button>
                <button onClick={() => moveText(i, 1)} disabled={i === (hero.typewriterTexts.length - 1)} className="text-zinc-500 hover:text-zinc-200 disabled:opacity-30 px-1 text-xs">↓</button>
                <button onClick={() => removeTypewriterText(i)} className="text-red-500/60 hover:text-red-400 px-1">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTypewriterText()}
            placeholder='e.g. "SEO Expert"'
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all"
          />
          <Button onClick={addTypewriterText} icon={<Plus size={14} />}>Add</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-300">Stats Bar</h2>
            <p className="text-xs text-zinc-500 mt-1">Numbers shown below the hero text</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addStat} icon={<Plus size={13} />}>Add Stat</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(hero.stats || []).map((stat, i) => (
            <div key={i} className="flex gap-2 items-start bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input label="Value" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="50+" />
                <Input label="Label" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Projects Completed" />
              </div>
              <button onClick={() => removeStat(i)} className="mt-6 text-red-500/60 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Preview</h2>
        <div className="bg-zinc-950 rounded-xl p-4 space-y-3">
          <p className="text-sm text-zinc-400">Hi, I'm <span className="text-zinc-100 font-semibold">{content.personal?.name}</span></p>
          <div className="flex flex-wrap gap-2">
            {(hero.typewriterTexts || []).map((t, i) => (
              <span key={i} className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-2 border-t border-zinc-800">
            {(hero.stats || []).map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold text-[#22C55E]">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
