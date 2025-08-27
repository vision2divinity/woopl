const cron = require('node-cron');
const { addProductImportJob } = require('../queues/productQueue');
const ImportConfig = require('../models/ImportConfig');
const logger = require('../utils/logger');

class ProductScheduler {
  constructor() {
    this.job = null;
    this.isRunning = false;
  }

  async initialize() {
    // Load configuration from database
    const config = await ImportConfig.findOne({ active: true });
    
    if (config && config.enabled) {
      this.start(config.schedule || '0 0 * * *'); // Default: daily at midnight
    }
  }

  start(schedule = '0 0 * * *') {
    if (this.job) {
      this.stop();
    }

    this.job = cron.schedule(schedule, async () => {
      if (!this.isRunning) {
        await this.runImport();
      }
    });

    this.job.start();
    logger.info('Product import scheduler started');
  }

  stop() {
    if (this.job) {
      this.job.stop();
      this.job = null;
      logger.info('Product import scheduler stopped');
    }
  }

  async runImport() {
    this.isRunning = true;
    logger.info('Starting scheduled product import');

    try {
      const config = await ImportConfig.findOne({ active: true });
      
      if (!config || !config.enabled) {
        logger.info('Import disabled in configuration');
        return;
      }

      // Add job to queue for processing
      await addProductImportJob({
        keywords: config.keywords || ['electronics', 'fashion', 'home'],
        platforms: config.platforms || ['aliexpress', 'alibaba', '1688'],
        limit: config.dailyLimit || 100,
        filters: {
          minPrice: config.minPrice || 5,
          maxPrice: config.maxPrice || 500,
          minRating: config.minRating || 4.0,
          minOrders: config.minOrders || 50
        }
      });

      logger.info('Product import job added to queue');
    } catch (error) {
      logger.error('Scheduled import error:', error);
    } finally {
      this.isRunning = false;
    }
  }

  async pause() {
    if (this.job) {
      this.job.stop();
      await ImportConfig.updateOne({ active: true }, { enabled: false });
      logger.info('Scheduler paused');
    }
  }

  async resume() {
    if (this.job) {
      this.job.start();
      await ImportConfig.updateOne({ active: true }, { enabled: true });
      logger.info('Scheduler resumed');
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      isPaused: this.job ? !this.job.running : true,
      nextRun: this.job?.nextDates(1)[0]
    };
  }
}

module.exports = new ProductScheduler();