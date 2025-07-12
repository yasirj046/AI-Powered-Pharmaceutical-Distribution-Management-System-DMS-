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
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'yasir460',
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });

// Base Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
