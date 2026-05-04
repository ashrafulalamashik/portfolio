const express = require('express');
const Content = require('../models/Content');
const authMiddleware = require('../middleware/auth');
const { generateConfig } = require('../utils/generateConfig');
const fs = require('fs');
const path = require('path');

const router = express.Router();
router.use(authMiddleware);

// ── Helper: get or create the single content document ────────────────────────
async function getOrCreateContent() {
  let content = await Content.findOne();
  if (!content) {
    content = await Content.create({});
  }
  return content;
}

// GET /api/content  — fetch all content
router.get('/', async (_req, res) => {
  try {
    const content = await getOrCreateContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load content', error: err.message });
  }
});

// PUT /api/content  — save draft (update MongoDB only)
router.put('/', async (req, res) => {
  try {
    const content = await getOrCreateContent();
    const updates = req.body;

    // Merge updates into the document
    Object.assign(content, updates);
    content.lastSaved = new Date();
    await content.save();

    res.json({ message: 'Draft saved successfully', lastSaved: content.lastSaved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save draft', error: err.message });
  }
});

// POST /api/content/publish  — save draft + write siteConfig.ts
router.post('/publish', async (req, res) => {
  try {
    const content = await getOrCreateContent();

    // Apply any incoming changes first
    if (Object.keys(req.body).length > 0) {
      Object.assign(content, req.body);
    }
    content.lastSaved = new Date();
    content.lastPublished = new Date();
    await content.save();

    // Generate and write the siteConfig.ts file
    const configPath = process.env.PORTFOLIO_CONFIG_PATH;
    if (!configPath) {
      return res.status(500).json({ message: 'PORTFOLIO_CONFIG_PATH not set in .env' });
    }

    const tsContent = generateConfig(content.toObject());
    fs.writeFileSync(configPath, tsContent, 'utf8');

    res.json({
      message: 'Published successfully — siteConfig.ts updated',
      lastPublished: content.lastPublished,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish', error: err.message });
  }
});

module.exports = router;
