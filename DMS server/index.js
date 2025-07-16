const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./app/routes/userRoute');
const brandRoutes = require('./app/routes/brandRoute');
const employeeRoutes = require('./app/routes/employeeRoute');
const groupRoutes = require('./app/routes/groupRoute');
const subgroupRoutes = require('./app/routes/subgroupRoute');
const productRoutes = require('./app/routes/productRoute');
const areaRoutes = require('./app/routes/areaRoute');
const subAreaRoutes = require('./app/routes/subAreaRoute');
const customerRoutes = require('./app/routes/customerRoute');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Disable ETag generation to prevent 304 responses
app.set('etag', false);

// Add global no-cache headers
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/subgroups', subgroupRoutes);
app.use('/api/products', productRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/subareas', subAreaRoutes);
app.use('/api/customers', customerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || 'pharmaceutical_dms',
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
