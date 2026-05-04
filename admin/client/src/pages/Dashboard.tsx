import { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { contentApi } from '../services/api';
import { SiteContent } from '../types';
import { useToast } from '../contexts/ToastContext';

// Section editors
import Overview from '../components/sections/Overview';
import ImageManager from '../components/sections/ImageManager';
import PersonalInfo from '../components/sections/PersonalInfo';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ServicesSection from '../components/sections/ServicesSection';
import CaseStudiesSection from '../components/sections/CaseStudiesSection';
import CertificationsSection from '../components/sections/CertificationsSection';
import SkillsSection from '../components/sections/SkillsSection';
import WhyWorkWithMe from '../components/sections/WhyWorkWithMe';
import SEOProposalSection from '../components/sections/SEOProposalSection';
import SettingsSection from '../components/sections/SettingsSection';

export default function Dashboard() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [savedContent, setSavedContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Load content on mount
  useEffect(() => {
    contentApi.get()
      .then((data) => { setContent(data); setSavedContent(data); })
      .catch((err) => setLoadError(err.message));
  }, []);

  const isDirty = JSON.stringify(content) !== JSON.stringify(savedContent);

  const handleSaveDraft = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await contentApi.saveDraft(content);
      setSavedContent({ ...content, lastSaved: res.lastSaved });
      setContent((c) => c ? { ...c, lastSaved: res.lastSaved } : c);
      showToast('Draft saved successfully ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }, [content, showToast]);

  const handlePublish = useCallback(async () => {
    if (!content) return;
    setPublishing(true);
    try {
      const res = await contentApi.publish(content);
      setSavedContent({ ...content, lastPublished: res.lastPublished });
      setContent((c) => c ? { ...c, lastPublished: res.lastPublished } : c);
      showToast('Published! siteConfig.ts updated ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Publish failed', 'error');
    } finally {
      setPublishing(false);
    }
  }, [content, showToast]);

  const update = useCallback(<K extends keyof SiteContent>(section: K, value: SiteContent[K]) => {
    setContent((c) => c ? { ...c, [section]: value } : c);
  }, []);

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-400 text-sm p-8 text-center">
        Failed to load content: {loadError}
        <br />Make sure the server is running and MongoDB is connected.
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-8 h-8 border-2 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sectionProps = { content, update };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — offset for sidebar on desktop */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          saving={saving}
          publishing={publishing}
          lastSaved={content.lastSaved}
          lastPublished={content.lastPublished}
          isDirty={isDirty}
        />

        <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full">
          <Routes>
            <Route index element={<Overview content={content} />} />
            <Route path="images" element={<ImageManager content={content} update={update} />} />
            <Route path="personal" element={<PersonalInfo {...sectionProps} />} />
            <Route path="hero" element={<HeroSection {...sectionProps} />} />
            <Route path="about" element={<AboutSection {...sectionProps} />} />
            <Route path="experience" element={<ExperienceSection {...sectionProps} />} />
            <Route path="services" element={<ServicesSection {...sectionProps} />} />
            <Route path="case-studies" element={<CaseStudiesSection {...sectionProps} />} />
            <Route path="certifications" element={<CertificationsSection {...sectionProps} />} />
            <Route path="skills" element={<SkillsSection {...sectionProps} />} />
            <Route path="why" element={<WhyWorkWithMe {...sectionProps} />} />
            <Route path="seo-proposal" element={<SEOProposalSection {...sectionProps} />} />
            <Route path="settings" element={<SettingsSection {...sectionProps} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
