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

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: [
    'http://localhost:3000', 
    'https://phanbongiatot.com', 
    'https://phanbongiatot.vercel.app',
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ] 
}));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));

// Route files
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const leadRoutes = require('./routes/leadRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const { protect } = require('./middleware/authMiddleware');

const aiRoutes = require('./routes/aiRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Phân bón giá tốt API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
