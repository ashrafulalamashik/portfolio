const express = require('express');
const Content = require('../models/Content');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// GET /api/settings
router.get('/', async (_req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) content = await Content.create({});
    res.json(content.settings || {});
  } catch (err) {
    res.status(500).json({ message: 'Failed to load settings', error: err.message });
  }
});

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) content = await Content.create({});
    content.settings = { ...content.settings, ...req.body };
    content.lastSaved = new Date();
    await content.save();
    res.json({ message: 'Settings saved', settings: content.settings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save settings', error: err.message });
  }
});

module.exports = router;
