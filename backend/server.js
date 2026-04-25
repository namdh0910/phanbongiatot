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
const sellerRoutes = require('./routes/sellerApplicationRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/users', userRoutes);

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
