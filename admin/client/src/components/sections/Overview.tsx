import { LayoutDashboard, User, Briefcase, Wrench, BookOpen, Star, Globe, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteContent } from '../../types';

interface Props { content: SiteContent; }

const shortcuts = [
  { label: 'Personal Info', to: '/admin/personal', icon: User, desc: 'Name, title, contact' },
  { label: 'Experience', to: '/admin/experience', icon: Briefcase, desc: `${0} positions` },
  { label: 'Services', to: '/admin/services', icon: Wrench, desc: 'What you offer' },
  { label: 'Case Studies', to: '/admin/case-studies', icon: BookOpen, desc: 'Portfolio work' },
  { label: 'Skills', to: '/admin/skills', icon: Star, desc: 'Skill tags' },
  { label: 'SEO Proposal', to: '/admin/seo-proposal', icon: Globe, desc: 'Pricing plans' },
];

export default function Overview({ content }: Props) {
  const stats = [
    { label: 'Services', value: content.services?.length ?? 0 },
    { label: 'Case Studies', value: content.caseStudies?.length ?? 0 },
    { label: 'Skills', value: content.skills?.length ?? 0 },
    { label: 'Certifications', value: content.certifications?.length ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <LayoutDashboard size={22} className="text-[#22C55E]" /> Dashboard
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Welcome back, {content.personal?.name?.split(' ')[0] || 'Admin'}. Manage your portfolio content below.
        </p>
      </div>

      {/* Status bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-[#22C55E]">{value}</p>
            <p className="text-xs text-zinc-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Timestamps */}
      {(content.lastSaved || content.lastPublished) && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-wrap gap-4 text-sm">
          {content.lastSaved && (
            <span className="flex items-center gap-2 text-zinc-400">
              <Clock size={14} className="text-zinc-600" />
              Last saved: <strong className="text-zinc-200">{new Date(content.lastSaved).toLocaleString()}</strong>
            </span>
          )}
          {content.lastPublished && (
            <span className="flex items-center gap-2 text-zinc-400">
              <Globe size={14} className="text-[#22C55E]" />
              Last published: <strong className="text-[#22C55E]">{new Date(content.lastPublished).toLocaleString()}</strong>
            </span>
          )}
        </div>
      )}

      {/* Quick nav */}
      <div>
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-3">Quick Edit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {shortcuts.map(({ label, to, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className="bg-zinc-900 border border-zinc-800 hover:border-[#22C55E]/40 rounded-xl p-4 flex items-center gap-3 group transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-[#22C55E]/10 flex items-center justify-center transition-colors">
                <Icon size={16} className="text-zinc-500 group-hover:text-[#22C55E] transition-colors" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{label}</p>
                <p className="text-xs text-zinc-600">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-xl p-5 text-sm space-y-2">
        <p className="font-semibold text-[#22C55E]">How to publish changes</p>
        <ol className="list-decimal list-inside space-y-1 text-zinc-400">
          <li>Edit any section using the sidebar navigation</li>
          <li>Click <strong className="text-zinc-200">Save Draft</strong> to store changes in the database</li>
          <li>Click <strong className="text-zinc-200">Publish</strong> to write the updated <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">siteConfig.ts</code> to the portfolio</li>
          <li>Rebuild or hot-reload the portfolio to see live changes</li>
        </ol>
      </div>
    </div>
  );
}
