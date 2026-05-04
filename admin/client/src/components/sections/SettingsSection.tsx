import { useState } from 'react';
import { Settings, KeyRound, FileText, BarChart3, Globe, CheckCircle } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { SiteContent } from '../../types';
import { authApi, settingsApi, uploadApi } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

export default function SettingsSection({ content, update }: Props) {
  const { showToast } = useToast();
  const settings = content.settings || { googleAnalyticsId: '', siteTitle: '', metaDescription: '' };

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');

  // Settings save state
  const [settingsSaving, setSettingsSaving] = useState(false);

  const setSettings = (field: string, val: string) =>
    update('settings', { ...settings, [field]: val });

  const handleSaveSettings = async () => {
    setSettingsSaving(true);
    try {
      await settingsApi.save(settings);
      showToast('Settings saved ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save settings', 'error');
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPassError('');
    if (newPass !== confirmPass) { setPassError('New passwords do not match'); return; }
    if (newPass.length < 6) { setPassError('Password must be at least 6 characters'); return; }
    setPassLoading(true);
    try {
      await authApi.changePassword(currentPass, newPass);
      showToast('Password changed successfully ✓');
      setCurrentPass(''); setNewPass(''); setConfirmPass('');
    } catch (err) {
      setPassError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };

  const handleCVUpload = async (file: File) => {
    try {
      await uploadApi.cv(file);
      update('personal', { ...content.personal, cvPath: '/cv-ashraful-alam-ashik.pdf' });
      showToast('CV uploaded ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <Settings size={20} className="text-[#22C55E]" /> Settings
      </h1>

      {/* Site Meta */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <Globe size={15} className="text-[#22C55E]" /> Site Meta
        </h2>
        <Input
          label="Site Title"
          value={settings.siteTitle}
          onChange={(e) => setSettings('siteTitle', e.target.value)}
          placeholder="Ashraful Alam Ashik | Portfolio"
        />
        <Textarea
          label="Meta Description"
          rows={2}
          value={settings.metaDescription}
          onChange={(e) => setSettings('metaDescription', e.target.value)}
          placeholder="SEO Specialist, Web Designer & Digital Operations Manager..."
          hint="Keep under 160 characters for best SEO results"
        />
        <Input
          label="Google Analytics ID"
          value={settings.googleAnalyticsId}
          onChange={(e) => setSettings('googleAnalyticsId', e.target.value)}
          placeholder="G-XXXXXXXXXX"
          hint="Leave blank to disable analytics"
        />
        <div className="flex items-center gap-2 pt-1">
          <Button
            onClick={handleSaveSettings}
            loading={settingsSaving}
            icon={<CheckCircle size={14} />}
            variant="primary"
            size="sm"
          >
            Save Settings
          </Button>
        </div>
      </div>

      {/* CV Upload */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <FileText size={15} className="text-[#22C55E]" /> CV / Resume
        </h2>
        <p className="text-xs text-zinc-500">
          Current path: <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">{content.personal?.cvPath || '/cv-ashraful-alam-ashik.pdf'}</code>
        </p>
        <div
          className="border-2 border-dashed border-zinc-700 hover:border-[#22C55E]/50 rounded-xl p-6 text-center cursor-pointer transition-all"
          onClick={() => document.getElementById('settings-cv-input')?.click()}
        >
          <input
            id="settings-cv-input"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCVUpload(f); }}
          />
          <FileText size={28} className="text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-400">Click to upload new CV (PDF)</p>
          <p className="text-xs text-zinc-600 mt-1">Max 20 MB · Replaces the current download CV</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <KeyRound size={15} className="text-[#22C55E]" /> Change Admin Password
        </h2>

        {passError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
            {passError}
          </div>
        )}

        <Input
          label="Current Password"
          type="password"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          placeholder="Enter current password"
        />
        <Input
          label="New Password"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="At least 6 characters"
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Repeat new password"
          error={confirmPass && newPass !== confirmPass ? 'Passwords do not match' : undefined}
        />
        <Button
          onClick={handleChangePassword}
          loading={passLoading}
          variant="secondary"
          icon={<KeyRound size={14} />}
          disabled={!currentPass || !newPass || !confirmPass}
        >
          Change Password
        </Button>
      </div>

      {/* Info box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <BarChart3 size={15} className="text-[#22C55E]" /> System Info
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            ['Services', content.services?.length ?? 0],
            ['Case Studies', content.caseStudies?.length ?? 0],
            ['Skills', content.skills?.length ?? 0],
            ['Certifications', content.certifications?.length ?? 0],
            ['Experience Items', (content.experience?.previous?.length ?? 0) + 1],
            ['SEO Plans', content.seoProposal?.plans?.length ?? 0],
          ].map(([label, val]) => (
            <div key={label} className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2 flex items-center justify-between">
              <span className="text-zinc-500">{label}</span>
              <span className="font-semibold text-[#22C55E]">{val}</span>
            </div>
          ))}
        </div>
        <p className="text-zinc-600 text-xs pt-2">
          Last saved: {content.lastSaved ? new Date(content.lastSaved).toLocaleString() : 'Never'} &nbsp;·&nbsp;
          Last published: {content.lastPublished ? new Date(content.lastPublished).toLocaleString() : 'Never'}
        </p>
      </div>
    </div>
  );
}
