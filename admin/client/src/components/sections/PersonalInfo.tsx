import { User } from 'lucide-react';
import Input from '../ui/Input';
import { SiteContent } from '../../types';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function PersonalInfo({ content, update }: Props) {
  const p = content.personal;
  const set = (field: string, value: string) => update('personal', { ...p, [field]: value });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <User size={20} className="text-[#22C55E]" /> Personal Info
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300">Basic Details</h2>
          <Input label="Full Name" value={p.name} onChange={(e) => set('name', e.target.value)} placeholder="Ashraful Alam Ashik" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Short Name" value={p.shortName} onChange={(e) => set('shortName', e.target.value)} placeholder="AAA" />
            <Input label="Initials" value={p.initials} onChange={(e) => set('initials', e.target.value)} placeholder="AAA" />
          </div>
          <Input label="Job Title" value={p.title} onChange={(e) => set('title', e.target.value)} placeholder="Digital Operation Manager | SEO Specialist" />
          <Input label="Tagline" value={p.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="SEO · Web Design · Digital Operations" />
          <Input label="Experience" value={p.experience} onChange={(e) => set('experience', e.target.value)} placeholder="3+" hint="Shown as '3+ years'" />
          <Input label="Location" value={p.location} onChange={(e) => set('location', e.target.value)} placeholder="Bogura, Bangladesh" />
        </div>

        <div className="space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-zinc-300">Contact & Links</h2>
            <Input label="Phone" value={p.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+8801737940250" />
            <Input label="Email" value={p.email} onChange={(e) => set('email', e.target.value)} placeholder="email@example.com" type="email" />
            <Input label="WhatsApp URL" value={p.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="http://wa.me/+8801737940250" />
            <Input label="LinkedIn URL" value={p.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
            <Input label="CV File Path" value={p.cvPath} onChange={(e) => set('cvPath', e.target.value)} placeholder="/cv-ashraful-alam-ashik.pdf" hint="Use Image Manager to upload a new CV" />
          </div>

          {/* Live preview card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-zinc-300">Preview</h2>
            <div className="flex items-center gap-3">
              <img src={p.profileImage || '/profile.png'} alt="profile" className="w-12 h-12 rounded-xl object-cover border border-zinc-700" />
              <div>
                <p className="font-semibold text-zinc-100 text-sm">{p.name || '—'}</p>
                <p className="text-xs text-zinc-500">{p.title || '—'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-800">
              <div><span className="text-zinc-600">Tagline:</span> <span className="text-zinc-400">{p.tagline || '—'}</span></div>
              <div><span className="text-zinc-600">Location:</span> <span className="text-zinc-400">{p.location?.split(',')[0] || '—'}</span></div>
              <div><span className="text-zinc-600">Phone:</span> <span className="text-zinc-400">{p.phone || '—'}</span></div>
              <div><span className="text-zinc-600">Email:</span> <span className="text-zinc-400">{p.email || '—'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
