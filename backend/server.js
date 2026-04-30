const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security: Limit request body size (prevent payload attacks)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS - only allow trusted origins
app.use(cors({ 
  origin: [
    'http://localhost:3000', 
    'https://phanbongiatot.com', 
    'https://www.phanbongiatot.com',
    'https://phanbongiatot.vercel.app',
    /\.vercel\.app$/ 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Logging: only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route files
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const leadRoutes = require('./routes/leadRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const orderRoutes = require('./routes/orderRoutes');
const socialRoutes = require('./routes/socialRoutes');
const couponRoutes = require('./routes/couponRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const sellerApplicationRoutes = require('./routes/sellerApplicationRoutes');
const userRoutes = require('./routes/userRoutes');
const flashSaleRoutes = require('./routes/flashSaleRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/posts', blogRoutes); // Alias for compatibility
app.use('/api/leads', leadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin/reviews', reviewRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sellers', sellerApplicationRoutes); // Use the application routes first
app.use('/api/sellers', sellerRoutes); // Then the general seller routes (will be merged)
app.use('/api/users', userRoutes);
app.use('/api/flash-sales', flashSaleRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/seller/products', require('./routes/sellerProductRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/combos', require('./routes/comboRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Phân Bón Giá Tốt API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler — không leak stack trace ra client
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});
