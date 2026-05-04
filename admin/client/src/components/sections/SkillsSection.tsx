import { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';
import Button from '../ui/Button';
import { SiteContent } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function SkillsSection({ content, update }: Props) {
  const skills = content.skills || [];
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    const t = newSkill.trim();
    if (!t || skills.includes(t)) return;
    update('skills', [...skills, t]);
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    update('skills', skills.filter((s) => s !== skill));
  };

  const moveSkill = (i: number, dir: -1 | 1) => {
    const arr = [...skills];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    update('skills', arr);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <Star size={20} className="text-[#22C55E]" /> Skills
      </h1>

      {/* Add skill */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-300">Add Skill</h2>
          <p className="text-xs text-zinc-500 mt-1">Skills are shown as pill tags on the portfolio</p>
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            placeholder='e.g. "Technical SEO"'
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all"
          />
          <Button onClick={addSkill} icon={<Plus size={14} />}>Add</Button>
        </div>
      </div>

      {/* Skills grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">All Skills <span className="text-zinc-600 font-normal">({skills.length})</span></h2>
        </div>

        {skills.length === 0 ? (
          <p className="text-sm text-zinc-600 text-center py-6">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <div key={i} className="group flex items-center gap-1 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 rounded-full px-3 py-1.5 transition-all">
                <button onClick={() => moveSkill(i, -1)} disabled={i === 0} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 text-xs hidden group-hover:inline">←</button>
                <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{skill}</span>
                <button onClick={() => moveSkill(i, 1)} disabled={i === skills.length - 1} className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20 text-xs hidden group-hover:inline">→</button>
                <button onClick={() => removeSkill(skill)} className="text-zinc-600 hover:text-red-400 transition-colors ml-0.5 hidden group-hover:inline">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Preview */}
        {skills.length > 0 && (
          <div className="border-t border-zinc-800 pt-4">
            <p className="text-xs text-zinc-600 mb-3">Live Preview</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-zinc-900/50 border border-zinc-700 text-zinc-200 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
