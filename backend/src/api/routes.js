const express = require('express');
const router = express.Router();
const scheduler = require('../schedulers/productScheduler');
const ImportLog = require('../models/ImportLog');
const ImportConfig = require('../models/ImportConfig');
const { getQueueStatus } = require('../queues/productQueue');

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalImported: await ImportLog.countDocuments({ status: 'success' }),
      importedToday: await ImportLog.countDocuments({
        status: 'success',
        createdAt: { $gte: today }
      }),
      failedImports: await ImportLog.countDocuments({ status: 'failed' }),
      schedulerStatus: scheduler.getStatus(),
      queueStatus: await getQueueStatus()
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get import history
router.get('/imports/history', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const imports = await ImportLog.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ImportLog.countDocuments();

    res.json({
      imports,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Scheduler control
router.post('/scheduler/pause', async (req, res) => {
  try {
    await scheduler.pause();
    res.json({ message: 'Scheduler paused successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/scheduler/resume', async (req, res) => {
  try {
    await scheduler.resume();
    res.json({ message: 'Scheduler resumed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/scheduler/trigger', async (req, res) => {
  try {
    await scheduler.runImport();
    res.json({ message: 'Import triggered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configuration
router.get('/config', async (req, res) => {
  try {
    const config = await ImportConfig.findOne({ active: true });
    res.json(config || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/config', async (req, res) => {
  try {
    const config = await ImportConfig.findOneAndUpdate(
      { active: true },
      { ...req.body, active: true },
      { new: true, upsert: true }
    );
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual product approval
router.get('/products/pending', async (req, res) => {
  try {
    const pendingProducts = await ImportLog.find({ status: 'pending' })
      .limit(20)
      .exec();
    res.json(pendingProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/products/approve/:id', async (req, res) => {
  try {
    const product = await ImportLog.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedAt: new Date() },
      { new: true }
    );
    
    // Trigger actual import to WooCommerce
    // ... import logic here
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/products/reject/:id', async (req, res) => {
  try {
    const product = await ImportLog.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', rejectedAt: new Date(), reason: req.body.reason },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;