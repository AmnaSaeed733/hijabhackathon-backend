const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const ratingRoutes = require('./routes/rating');

const app = express();

// ✅ ALLOW THIS FRONTEND DOMAIN (replace if needed)
const allowedOrigins = [
  'https://hijabhackathon-frontend-4yf1f4xl4-amnas-projects-65af5582.vercel.app',
  'http://localhost:3000' // optional for local testing
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ HANDLE PREFLIGHT

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// ✅ CONNECT TO MONGO
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/reviews', ratingRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
