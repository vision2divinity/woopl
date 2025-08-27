require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { initializeScheduler } = require('./schedulers/productScheduler');
const { initializeQueue } = require('./queues/productQueue');
const apiRoutes = require('./api/routes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woopl', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API Routes
app.use('/api', apiRoutes);

// Initialize background services
initializeScheduler();
initializeQueue();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  logger.info(`WooCommerce Import Bot running on port ${PORT}`);
});