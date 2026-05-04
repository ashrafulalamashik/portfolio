const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

const portfolioPublic = process.env.PORTFOLIO_PUBLIC_PATH || path.join(__dirname, '../../Portfolio/public');

// ── Storage for profile photo (overwrites profile.png in public) ─────────────
const profileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, portfolioPublic),
  filename: (_req, _file, cb) => cb(null, 'profile.png'),
});

// ── Storage for general uploads (case studies, certs, CV) ────────────────────
const generalStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = req.params.folder || 'uploads';
    const dest = path.join(portfolioPublic, 'uploads', folder);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const imageFilter = (_req, file, cb) => {
  if (/^image\/(jpeg|jpg|png|gif|webp|svg\+xml)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const docFilter = (_req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const uploadProfile = multer({ storage: profileStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadGeneral = multer({ storage: generalStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// CV uses a fixed filename in the public root
const cvStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, portfolioPublic),
  filename: (_req, _file, cb) => cb(null, 'cv-ashraful-alam-ashik.pdf'),
});
const uploadCV = multer({ storage: cvStorage, fileFilter: docFilter, limits: { fileSize: 20 * 1024 * 1024 } });

// POST /api/upload/profile
router.post('/profile', uploadProfile.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: '/profile.png', message: 'Profile photo updated' });
});

// POST /api/upload/image/:folder  (e.g. /api/upload/image/case-studies)
router.post('/image/:folder', uploadGeneral.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `/uploads/${req.params.folder}/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// POST /api/upload/cv
router.post('/cv', uploadCV.single('cv'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: '/cv-ashraful-alam-ashik.pdf', message: 'CV updated' });
});

// DELETE /api/upload/image  — removes a file from uploads folder
router.delete('/image', (req, res) => {
  const { filePath } = req.body;
  if (!filePath || !filePath.startsWith('/uploads/')) {
    return res.status(400).json({ message: 'Invalid file path' });
  }
  const fullPath = path.join(portfolioPublic, filePath);
  try {
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete file', error: err.message });
  }
});

// GET /api/upload/list/:folder  — list files in uploads sub-folder
router.get('/list/:folder', (req, res) => {
  const folderPath = path.join(portfolioPublic, 'uploads', req.params.folder);
  try {
    if (!fs.existsSync(folderPath)) return res.json({ files: [] });
    const files = fs.readdirSync(folderPath).map((f) => ({
      filename: f,
      url: `/uploads/${req.params.folder}/${f}`,
    }));
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
});

module.exports = router;
