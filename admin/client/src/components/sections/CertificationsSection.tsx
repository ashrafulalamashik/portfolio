import { useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SiteContent, Certification } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

const blank = (): Certification => ({ title: '', issuer: '', year: '', icon: 'seo', image: '' });

const iconOptions = ['seo', 'web', 'leadership', 'office', 'award', 'star', 'code'];

function CertForm({ item, onChange }: { item: Certification; onChange: (c: Certification) => void }) {
  const set = (field: keyof Certification, val: string) => onChange({ ...item, [field]: val });
  return (
    <div className="space-y-3">
      <Input label="Certification Title" value={item.title} onChange={(e) => set('title', e.target.value)} placeholder="SEO Certification" />
      <Input label="Issuing Organization" value={item.issuer} onChange={(e) => set('issuer', e.target.value)} placeholder="SEO Expate Bangladesh Ltd." />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Year" value={item.year} onChange={(e) => set('year', e.target.value)} placeholder="2024" />
        <div>
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Icon Key</label>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map((ic) => (
              <button key={ic} onClick={() => set('icon', ic)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all border ${item.icon === ic ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Input label="Image URL (optional)" value={item.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="/uploads/certifications/cert.jpg" />
    </div>
  );
}

export default function CertificationsSection({ content, update }: Props) {
  const certs = content.certifications || [];
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Certification>(blank());
  const [addingNew, setAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Certification>(blank());

  const save = (i: number, item: Certification) => {
    update('certifications', certs.map((c, idx) => idx === i ? item : c));
    setEditIdx(null);
  };
  const remove = (i: number) => { if (confirm('Delete this certification?')) update('certifications', certs.filter((_, idx) => idx !== i)); };
  const saveNew = () => { update('certifications', [...certs, newItem]); setNewItem(blank()); setAddingNew(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Award size={20} className="text-[#22C55E]" /> Certifications
        </h1>
        <Button size="sm" icon={<Plus size={13} />} onClick={() => { setNewItem(blank()); setAddingNew(true); }}>
          Add Certification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certs.map((cert, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0">
              <Award size={18} className="text-[#22C55E]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-zinc-200 text-sm leading-snug">{cert.title || 'Untitled'}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{cert.issuer}</p>
              <p className="text-xs text-zinc-600">{cert.year}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditItem({ ...cert }); setEditIdx(i); }} className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 rounded-lg transition-all">Edit</button>
              <button onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {certs.length === 0 && <p className="text-sm text-zinc-600 col-span-2 text-center py-6">No certifications yet.</p>}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Certification">
        <div className="space-y-4">
          <CertForm item={editItem} onChange={setEditItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={() => save(editIdx!, editItem)}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setEditIdx(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal open={addingNew} onClose={() => setAddingNew(false)} title="Add Certification">
        <div className="space-y-4">
          <CertForm item={newItem} onChange={setNewItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={saveNew}>Add Certification</Button>
            <Button variant="secondary" onClick={() => setAddingNew(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
