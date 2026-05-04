import { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Image, FileText, Loader2 } from 'lucide-react';
import { uploadApi } from '../../services/api';
import { SiteContent } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';

interface Props { content: SiteContent; update: (k: keyof SiteContent, v: any) => void; }

function UploadZone({ label, accept, onUpload, preview, hint }: {
  label: string; accept: string; onUpload: (f: File) => Promise<void>; preview?: string; hint?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handle = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setLoading(true);
    try { await onUpload(file); } finally { setLoading(false); }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dragging ? 'border-[#22C55E] bg-[#22C55E]/5' : 'border-zinc-700 hover:border-zinc-500'}`}
      onClick={() => ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />

      {localPreview || preview ? (
        <div className="space-y-3">
          <img src={localPreview || preview} alt="preview" className="w-24 h-24 rounded-xl object-cover mx-auto border border-zinc-700" />
          <p className="text-xs text-zinc-500">{label} — Click to change</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto">
            {loading ? <Loader2 size={20} className="animate-spin text-[#22C55E]" /> : <Upload size={20} className="text-zinc-500" />}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">{label}</p>
            {hint && <p className="text-xs text-zinc-600 mt-1">{hint}</p>}
            <p className="text-xs text-zinc-600 mt-1">Drag & drop or click to browse</p>
          </div>
        </div>
      )}
      {loading && <p className="text-xs text-[#22C55E] mt-2 animate-pulse">Uploading…</p>}
    </div>
  );
}

export default function ImageManager({ content, update }: Props) {
  const { showToast } = useToast();
  const [caseStudyImages, setCaseStudyImages] = useState<{ filename: string; url: string }[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    setLoadingList(true);
    uploadApi.listFolder('case-studies')
      .then((d) => setCaseStudyImages(d.files || []))
      .catch(() => {})
      .finally(() => setLoadingList(false));
  }, []);

  const uploadProfile = async (file: File) => {
    try {
      await uploadApi.profile(file);
      update('personal', { ...content.personal, profileImage: `/profile.png?t=${Date.now()}` });
      showToast('Profile photo updated ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    }
  };

  const uploadCV = async (file: File) => {
    try {
      await uploadApi.cv(file);
      update('personal', { ...content.personal, cvPath: '/cv-ashraful-alam-ashik.pdf' });
      showToast('CV uploaded ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    }
  };

  const uploadCaseStudyImage = async (file: File) => {
    try {
      const res = await uploadApi.image('case-studies', file);
      setCaseStudyImages((prev) => [...prev, { filename: res.filename, url: res.url }]);
      showToast('Image uploaded ✓');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    }
  };

  const deleteImage = async (filePath: string, filename: string) => {
    if (!confirm(`Delete "${filename}"?`)) return;
    try {
      await uploadApi.deleteImage(filePath);
      setCaseStudyImages((prev) => prev.filter((f) => f.url !== filePath));
      showToast('Image deleted');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
        <Image size={20} className="text-[#22C55E]" /> Image Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Profile Photo */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-200 text-sm">Profile Photo</h2>
          <p className="text-xs text-zinc-500">Replaces <code className="bg-zinc-800 px-1 rounded">public/profile.png</code> in the portfolio</p>
          <UploadZone
            label="Profile Photo"
            accept="image/jpeg,image/png,image/webp"
            onUpload={uploadProfile}
            preview={content.personal?.profileImage || '/profile.png'}
            hint="JPG, PNG, WebP — max 5 MB"
          />
        </div>

        {/* CV PDF */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-200 text-sm">CV / Resume (PDF)</h2>
          <p className="text-xs text-zinc-500">Replaces <code className="bg-zinc-800 px-1 rounded">public/cv-ashraful-alam-ashik.pdf</code></p>
          <div
            className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl p-6 text-center cursor-pointer transition-all"
            onClick={() => document.getElementById('cv-input')?.click()}
          >
            <input
              id="cv-input"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCV(f); }}
            />
            <FileText size={32} className="text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">Upload PDF</p>
            <p className="text-xs text-zinc-600 mt-1">Max 20 MB</p>
            {content.personal?.cvPath && (
              <p className="text-xs text-[#22C55E] mt-2">Current: {content.personal.cvPath}</p>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Images */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-zinc-200 text-sm">Case Study Images</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Upload images to use in case studies</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Upload size={13} />}
            onClick={() => document.getElementById('cs-img-input')?.click()}
          >
            Upload
          </Button>
          <input
            id="cs-img-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCaseStudyImage(f); }}
          />
        </div>

        {loadingList ? (
          <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-zinc-600" /></div>
        ) : caseStudyImages.length === 0 ? (
          <p className="text-sm text-zinc-600 text-center py-6">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {caseStudyImages.map(({ url, filename }) => (
              <div key={url} className="relative group rounded-xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-800">
                <img src={url} alt={filename} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => deleteImage(url, filename)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg border border-red-500/40 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 text-[10px] text-zinc-300 bg-black/60 px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {url}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
