require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5001'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files (images/docs) from the portfolio's public directory
const portfolioPublicPath = process.env.PORTFOLIO_PUBLIC_PATH || path.join(__dirname, '../portfolio-public');
app.use('/uploads', express.static(path.join(portfolioPublicPath, 'uploads')));
app.use('/profile.png', express.static(path.join(portfolioPublicPath, 'profile.png')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

// ── Serve Admin Client (production) ──────────────────────────────────────────
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use('/admin', express.static(clientBuildPath));
app.get('/admin/*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Root health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── MongoDB Connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Admin server running at http://localhost:${PORT}`);
      console.log(`📊 Dashboard: http://localhost:${PORT}/admin`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
