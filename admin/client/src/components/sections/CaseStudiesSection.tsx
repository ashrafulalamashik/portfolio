import { useState } from 'react';
import { BookOpen, Plus, Trash2, Star } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SiteContent, CaseStudy } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

const blank = (): CaseStudy => ({ category: '', title: '', problem: '', solution: '', results: [''], featured: false, image: '' });

function CaseStudyForm({ item, onChange }: { item: CaseStudy; onChange: (c: CaseStudy) => void }) {
  const set = (field: keyof CaseStudy, val: any) => onChange({ ...item, [field]: val });

  const updateResult = (i: number, val: string) => {
    const arr = [...(item.results || [])];
    arr[i] = val;
    set('results', arr);
  };
  const addResult = () => set('results', [...(item.results || []), '']);
  const removeResult = (i: number) => set('results', (item.results || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Category" value={item.category} onChange={(e) => set('category', e.target.value)} placeholder="E-COMMERCE" />
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={item.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-[#22C55E]" />
            <span className="text-sm text-zinc-300">Featured</span>
          </label>
        </div>
      </div>
      <Input label="Title" value={item.title} onChange={(e) => set('title', e.target.value)} placeholder="E-commerce SEO Optimization..." />
      <Input label="Image URL (optional)" value={item.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="/uploads/case-studies/image.jpg" hint="Upload first via Image Manager, then paste path" />
      <Textarea label="Problem" rows={3} value={item.problem} onChange={(e) => set('problem', e.target.value)} placeholder="Describe the client's problem..." />
      <Textarea label="Solution" rows={3} value={item.solution} onChange={(e) => set('solution', e.target.value)} placeholder="Describe your solution..." />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Results</label>
          <button onClick={addResult} className="text-xs text-[#22C55E] hover:underline flex items-center gap-1"><Plus size={12} />Add</button>
        </div>
        <div className="space-y-2">
          {(item.results || []).map((r, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={r}
                onChange={(e) => updateResult(i, e.target.value)}
                placeholder="e.g. Traffic increased by 180%"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all"
              />
              <button onClick={() => removeResult(i)} className="text-red-500/60 hover:text-red-400 transition-colors px-2"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection({ content, update }: Props) {
  const studies = content.caseStudies || [];
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<CaseStudy>(blank());
  const [addingNew, setAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<CaseStudy>(blank());

  const save = (i: number, item: CaseStudy) => {
    update('caseStudies', studies.map((s, idx) => idx === i ? item : s));
    setEditIdx(null);
  };
  const remove = (i: number) => { if (confirm('Delete this case study?')) update('caseStudies', studies.filter((_, idx) => idx !== i)); };
  const saveNew = () => { update('caseStudies', [...studies, newItem]); setNewItem(blank()); setAddingNew(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <BookOpen size={20} className="text-[#22C55E]" /> Case Studies
        </h1>
        <Button size="sm" icon={<Plus size={13} />} onClick={() => { setNewItem(blank()); setAddingNew(true); }}>
          Add Case Study
        </Button>
      </div>

      <div className="space-y-3">
        {studies.map((cs, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">{cs.category}</span>
                {cs.featured && <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full"><Star size={9} />Featured</span>}
              </div>
              <p className="font-semibold text-zinc-200 text-sm mt-1">{cs.title || 'Untitled'}</p>
              <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{cs.problem}</p>
              <p className="text-xs text-zinc-600 mt-1">{cs.results?.length || 0} results listed</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditItem({ ...cs }); setEditIdx(i); }} className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all">Edit</button>
              <button onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {studies.length === 0 && <p className="text-sm text-zinc-600 text-center py-6">No case studies yet.</p>}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Case Study" width="max-w-3xl">
        <div className="space-y-4">
          <CaseStudyForm item={editItem} onChange={setEditItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={() => save(editIdx!, editItem)}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setEditIdx(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal open={addingNew} onClose={() => setAddingNew(false)} title="Add Case Study" width="max-w-3xl">
        <div className="space-y-4">
          <CaseStudyForm item={newItem} onChange={setNewItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={saveNew}>Add Case Study</Button>
            <Button variant="secondary" onClick={() => setAddingNew(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
