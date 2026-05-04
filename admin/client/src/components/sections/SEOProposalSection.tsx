import { useState } from 'react';
import { FileText, Plus, Trash2, X, Star } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { SiteContent, Plan } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

const blankPlan = (): Plan => ({ name: '', price: '', period: 'month', description: '', features: [''], highlighted: false, badge: '' });

function PlanForm({ item, onChange }: { item: Plan; onChange: (p: Plan) => void }) {
  const [featInput, setFeatInput] = useState('');
  const set = (field: keyof Plan, val: any) => onChange({ ...item, [field]: val });

  const addFeat = () => {
    const t = featInput.trim();
    if (!t) return;
    set('features', [...(item.features || []), t]);
    setFeatInput('');
  };
  const removeFeat = (i: number) => set('features', (item.features || []).filter((_, idx) => idx !== i));
  const updateFeat = (i: number, val: string) => {
    const arr = [...(item.features || [])];
    arr[i] = val;
    set('features', arr);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Plan Name" value={item.name} onChange={(e) => set('name', e.target.value)} placeholder="Growth SEO Plan" />
        <Input label="Badge (optional)" value={item.badge || ''} onChange={(e) => set('badge', e.target.value)} placeholder="Most Popular" />
        <Input label="Price" value={item.price} onChange={(e) => set('price', e.target.value)} placeholder="$350" />
        <Input label="Period" value={item.period} onChange={(e) => set('period', e.target.value)} placeholder="month" />
      </div>
      <Textarea label="Description" rows={2} value={item.description} onChange={(e) => set('description', e.target.value)} placeholder="Ideal for growing businesses..." />
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={item.highlighted} onChange={(e) => set('highlighted', e.target.checked)} className="w-4 h-4 accent-[#22C55E]" />
        <span className="text-sm text-zinc-300">Highlighted (featured plan)</span>
      </label>

      <div>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Features</label>
        <div className="space-y-2 mb-2">
          {(item.features || []).map((f, i) => (
            <div key={i} className="flex gap-2">
              <input value={f} onChange={(e) => updateFeat(i, e.target.value)} placeholder="Feature description..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all" />
              <button onClick={() => removeFeat(i)} className="text-red-500/60 hover:text-red-400 transition-colors px-2"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={featInput} onChange={(e) => setFeatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeat()}
            placeholder="Add a feature..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all" />
          <Button variant="secondary" size="sm" onClick={addFeat} icon={<Plus size={13} />}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default function SEOProposalSection({ content, update }: Props) {
  const proposal = content.seoProposal;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Plan>(blankPlan());
  const [addingNew, setAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Plan>(blankPlan());
  const [newTerm, setNewTerm] = useState('');

  const setProposal = (field: string, val: any) => update('seoProposal', { ...proposal, [field]: val });

  const savePlan = (i: number, item: Plan) => {
    setProposal('plans', (proposal.plans || []).map((p, idx) => idx === i ? item : p));
    setEditIdx(null);
  };
  const removePlan = (i: number) => {
    if (confirm('Delete this plan?')) setProposal('plans', (proposal.plans || []).filter((_, idx) => idx !== i));
  };
  const saveNew = () => { setProposal('plans', [...(proposal.plans || []), newItem]); setNewItem(blankPlan()); setAddingNew(false); };

  const addTerm = () => { const t = newTerm.trim(); if (!t) return; setProposal('paymentTerms', [...(proposal.paymentTerms || []), t]); setNewTerm(''); };
  const removeTerm = (i: number) => setProposal('paymentTerms', (proposal.paymentTerms || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <FileText size={20} className="text-[#22C55E]" /> SEO Proposal Page
      </h1>

      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Page Header</h2>
        <Input label="Title" value={proposal.title} onChange={(e) => setProposal('title', e.target.value)} placeholder="SEO Proposal" />
        <Input label="Subtitle" value={proposal.subtitle} onChange={(e) => setProposal('subtitle', e.target.value)} placeholder="Choose the plan that fits your business goals" />
      </div>

      {/* Plans */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">Pricing Plans</h2>
          <Button size="sm" icon={<Plus size={13} />} onClick={() => { setNewItem(blankPlan()); setAddingNew(true); }}>Add Plan</Button>
        </div>

        <div className="space-y-3">
          {(proposal.plans || []).map((plan, i) => (
            <div key={i} className={`border rounded-xl p-4 flex items-start gap-4 ${plan.highlighted ? 'bg-[#22C55E]/5 border-[#22C55E]/30' : 'bg-zinc-800/50 border-zinc-700'}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-zinc-200 text-sm">{plan.name || 'Untitled'}</p>
                  {plan.highlighted && <span className="flex items-center gap-1 text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full"><Star size={9} />{plan.badge || 'Featured'}</span>}
                </div>
                <p className="text-lg font-bold text-[#22C55E]">{plan.price}<span className="text-xs text-zinc-500 font-normal">/{plan.period}</span></p>
                <p className="text-xs text-zinc-500">{plan.features?.length || 0} features</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditItem({ ...plan }); setEditIdx(i); }} className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all">Edit</button>
                <button onClick={() => removePlan(i)} className="text-red-500/60 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Payment Terms</h2>
        <div className="space-y-2">
          {(proposal.paymentTerms || []).map((term, i) => (
            <div key={i} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2">
              <span className="text-sm text-zinc-300 flex-1">{term}</span>
              <button onClick={() => removeTerm(i)} className="text-zinc-600 hover:text-red-400 transition-colors"><X size={13} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newTerm} onChange={(e) => setNewTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTerm()}
            placeholder="e.g. Monthly payment in advance"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#22C55E]/60 transition-all" />
          <Button variant="secondary" size="sm" onClick={addTerm} icon={<Plus size={13} />}>Add</Button>
        </div>
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Plan" width="max-w-2xl">
        <div className="space-y-4">
          <PlanForm item={editItem} onChange={setEditItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={() => savePlan(editIdx!, editItem)}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setEditIdx(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal open={addingNew} onClose={() => setAddingNew(false)} title="Add Plan" width="max-w-2xl">
        <div className="space-y-4">
          <PlanForm item={newItem} onChange={setNewItem} />
          <div className="flex gap-2 pt-2">
            <Button onClick={saveNew}>Add Plan</Button>
            <Button variant="secondary" onClick={() => setAddingNew(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
