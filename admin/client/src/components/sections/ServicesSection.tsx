import { useState } from 'react';
import { Wrench, Plus, Trash2, X } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SiteContent, Service } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

const blankService = (): Service => ({ title: '', description: '', icon: 'Globe', tags: [] });

const iconOptions = ['Globe', 'Zap', 'RefreshCw', 'Settings', 'Star', 'Code', 'BarChart', 'Users', 'Target', 'Award'];

function ServiceForm({ item, onChange }: { item: Service; onChange: (s: Service) => void }) {
  const [tagInput, setTagInput] = useState('');
  const set = (field: keyof Service, val: any) => onChange({ ...item, [field]: val });

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    set('tags', [...(item.tags || []), t]);
    setTagInput('');
  };
  const removeTag = (i: number) => set('tags', (item.tags || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <Input label="Service Title" value={item.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Technical SEO & Performance" />
      <Textarea label="Description" rows={3} value={item.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe this service..." />
      <div>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Icon Name</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {iconOptions.map((icon) => (
            <button
              key={icon}
              onClick={() => set('icon', icon)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${item.icon === icon ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(item.tags || []).map((tag, i) => (
            <span key={i} className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2 py-1 rounded-full">
              {tag}
              <button onClick={() => removeTag(i)} className="text-zinc-500 hover:text-red-400 transition-colors"><X size={11} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder='e.g. "WordPress"'
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all"
          />
          <Button variant="secondary" size="sm" onClick={addTag} icon={<Plus size={13} />}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection({ content, update }: Props) {
  const services = content.services || [];
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [editItem, setEditItem] = useState<Service>(blankService());
  const [newItem, setNewItem] = useState<Service>(blankService());

  const save = (i: number, item: Service) => {
    const arr = services.map((s, idx) => idx === i ? item : s);
    update('services', arr);
    setEditIdx(null);
  };
  const remove = (i: number) => { if (confirm('Delete this service?')) update('services', services.filter((_, idx) => idx !== i)); };
  const saveNew = () => { update('services', [...services, newItem]); setNewItem(blankService()); setAddingNew(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Wrench size={20} className="text-[#22C55E]" /> Services
        </h1>
        <Button size="sm" icon={<Plus size={13} />} onClick={() => { setNewItem(blankService()); setAddingNew(true); }}>
          Add Service
        </Button>
      </div>

      <div className="space-y-3">
        {services.map((svc, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0">
              <span className="text-[#22C55E] text-xs font-mono">{svc.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-zinc-200 text-sm">{svc.title || 'Untitled'}</p>
              <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{svc.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(svc.tags || []).map((tag, ti) => (
                  <span key={ti} className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setEditItem({ ...svc }); setEditIdx(i); }} className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all">
                Edit
              </button>
              <button onClick={() => remove(i)} className="text-red-500/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && <p className="text-sm text-zinc-600 text-center py-6">No services yet. Add one above.</p>}
      </div>

      {/* Edit Modal */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Service">
        <div className="space-y-4">
          <ServiceForm item={editItem} onChange={setEditItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={() => save(editIdx!, editItem)}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setEditIdx(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal open={addingNew} onClose={() => setAddingNew(false)} title="Add Service">
        <div className="space-y-4">
          <ServiceForm item={newItem} onChange={setNewItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={saveNew}>Add Service</Button>
            <Button variant="secondary" onClick={() => setAddingNew(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
