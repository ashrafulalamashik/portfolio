import { useState } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SiteContent, ExperienceItem } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

const blank = (): ExperienceItem => ({ title: '', company: '', period: '', location: '', description: [''] });

// ── Sub-form (always rendered; controlled by parent state) ────────────────────
function ExperienceForm({ item, onChange }: { item: ExperienceItem; onChange: (item: ExperienceItem) => void }) {
  const set = (field: keyof ExperienceItem, val: any) => onChange({ ...item, [field]: val });

  const updateDesc = (i: number, val: string) => {
    const arr = [...(item.description || [])];
    arr[i] = val;
    set('description', arr);
  };
  const addDesc = () => set('description', [...(item.description || []), '']);
  const removeDesc = (i: number) => set('description', (item.description || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Job Title"  value={item.title}    onChange={(e) => set('title', e.target.value)}    placeholder="SEO Specialist" />
        <Input label="Company"   value={item.company}  onChange={(e) => set('company', e.target.value)}  placeholder="Future Minds Academy" />
        <Input label="Period"    value={item.period}   onChange={(e) => set('period', e.target.value)}   placeholder="Nov 2024 – Present" />
        <Input label="Location"  value={item.location} onChange={(e) => set('location', e.target.value)} placeholder="Bogura, Bangladesh" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Responsibilities</label>
          <button onClick={addDesc} className="text-xs text-[#22C55E] hover:underline flex items-center gap-1">
            <Plus size={12} /> Add line
          </button>
        </div>
        {(item.description || []).map((d, i) => (
          <div key={i} className="flex gap-2">
            <Textarea
              value={d}
              rows={2}
              onChange={(e) => updateDesc(i, e.target.value)}
              placeholder="Describe a responsibility…"
              className="flex-1"
            />
            <button
              onClick={() => removeDesc(i)}
              className="mt-1 text-red-500/60 hover:text-red-400 transition-colors shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Compact card shown in the list ───────────────────────────────────────────
function ExperienceCard({
  item, label, onEdit, onDelete,
}: { item: ExperienceItem; label: string; onEdit: () => void; onDelete?: () => void }) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
          {label}
        </span>
        <p className="font-semibold text-zinc-200 text-sm mt-1">{item.title || 'Untitled'}</p>
        <p className="text-xs text-zinc-500">{item.company} · {item.period}</p>
        <p className="text-xs text-zinc-600 mt-0.5">{item.description?.length || 0} bullet point(s)</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all"
        >
          Edit
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-500/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Inline edit modal with its own isolated state ────────────────────────────
function EditModal({
  open, onClose, title, initial, onSave,
}: { open: boolean; onClose: () => void; title: string; initial: ExperienceItem; onSave: (item: ExperienceItem) => void }) {
  const [item, setItem] = useState<ExperienceItem>(initial);

  // Reset local state whenever the modal opens with a new item
  // (key prop on the modal caller handles this — see usage below)
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        <ExperienceForm item={item} onChange={setItem} />
        <div className="flex gap-2 pt-2">
          <Button onClick={() => onSave(item)}>Save Changes</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

// ── Main section component ───────────────────────────────────────────────────
export default function ExperienceSection({ content, update }: Props) {
  const exp = content.experience;

  const [editingCurrent, setEditingCurrent] = useState(false);
  const [editingPrevIdx, setEditingPrevIdx]  = useState<number | null>(null);
  const [addingNew, setAddingNew]            = useState(false);
  const [newItem, setNewItem]                = useState<ExperienceItem>(blank());

  const setExp = (field: string, val: any) => update('experience', { ...exp, [field]: val });

  const saveCurrent = (item: ExperienceItem) => { setExp('current', item); setEditingCurrent(false); };
  const savePrev    = (i: number, item: ExperienceItem) => {
    const arr = [...exp.previous]; arr[i] = item;
    setExp('previous', arr); setEditingPrevIdx(null);
  };
  const removePrev  = (i: number) => {
    if (!confirm('Remove this position?')) return;
    setExp('previous', exp.previous.filter((_, idx) => idx !== i));
  };
  const saveNew     = (item: ExperienceItem) => {
    setExp('previous', [...(exp.previous || []), item]);
    setAddingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Briefcase size={20} className="text-[#22C55E]" /> Experience
        </h1>
        <Button size="sm" icon={<Plus size={13} />} onClick={() => { setNewItem(blank()); setAddingNew(true); }}>
          Add Position
        </Button>
      </div>

      {/* Current position */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Current Position</h2>
        <ExperienceCard item={exp.current} label="Current" onEdit={() => setEditingCurrent(true)} />
      </div>

      {/* Previous positions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Previous Positions</h2>
        <div className="space-y-2">
          {(exp.previous || []).length === 0 && (
            <p className="text-sm text-zinc-600 text-center py-4">No previous positions yet.</p>
          )}
          {(exp.previous || []).map((item, i) => (
            <ExperienceCard
              key={i}
              item={item}
              label={`Position ${i + 1}`}
              onEdit={() => setEditingPrevIdx(i)}
              onDelete={() => removePrev(i)}
            />
          ))}
        </div>
      </div>

      {/* Edit current — use key to reset inner state when reopened */}
      <EditModal
        key={editingCurrent ? 'current-open' : 'current-closed'}
        open={editingCurrent}
        onClose={() => setEditingCurrent(false)}
        title="Edit Current Position"
        initial={exp.current}
        onSave={saveCurrent}
      />

      {/* Edit previous */}
      {editingPrevIdx !== null && (
        <EditModal
          key={`prev-${editingPrevIdx}`}
          open={true}
          onClose={() => setEditingPrevIdx(null)}
          title={`Edit Position ${editingPrevIdx + 1}`}
          initial={exp.previous[editingPrevIdx]}
          onSave={(item) => savePrev(editingPrevIdx, item)}
        />
      )}

      {/* Add new */}
      <EditModal
        key={addingNew ? 'new-open' : 'new-closed'}
        open={addingNew}
        onClose={() => setAddingNew(false)}
        title="Add New Position"
        initial={newItem}
        onSave={saveNew}
      />
    </div>
  );
}
