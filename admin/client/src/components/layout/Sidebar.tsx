import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, Layers, Briefcase, Wrench,
  BookOpen, Award, Star, HelpCircle, FileText,
  Image, Settings, ChevronRight, X,
} from 'lucide-react';

const nav = [
  { label: 'Overview', icon: LayoutDashboard, to: '/admin' },
  { label: 'Images', icon: Image, to: '/admin/images' },
  { label: 'Personal Info', icon: User, to: '/admin/personal' },
  { label: 'Hero', icon: Layers, to: '/admin/hero' },
  { label: 'About', icon: FileText, to: '/admin/about' },
  { label: 'Experience', icon: Briefcase, to: '/admin/experience' },
  { label: 'Services', icon: Wrench, to: '/admin/services' },
  { label: 'Case Studies', icon: BookOpen, to: '/admin/case-studies' },
  { label: 'Certifications', icon: Award, to: '/admin/certifications' },
  { label: 'Skills', icon: Star, to: '/admin/skills' },
  { label: 'Why Work With Me', icon: HelpCircle, to: '/admin/why' },
  { label: 'SEO Proposal', icon: FileText, to: '/admin/seo-proposal' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
];

interface SidebarProps { mobileOpen: boolean; onClose: () => void; }

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-40 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col
        transition-transform duration-300 lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-black font-bold text-sm">A</div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">Admin Panel</p>
              <p className="text-[10px] text-zinc-500">Portfolio CMS</p>
            </div>
          </div>
          <button className="lg:hidden text-zinc-500 hover:text-zinc-300" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-0.5">
            {nav.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                    isActive
                      ? 'bg-[#22C55E]/10 text-[#22C55E] font-medium'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={isActive ? 'text-[#22C55E]' : 'text-zinc-500 group-hover:text-zinc-300'} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={14} className="text-[#22C55E]" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-800">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-[#22C55E] transition-colors"
          >
            View Live Site →
          </a>
        </div>
      </aside>
    </>
  );
}
