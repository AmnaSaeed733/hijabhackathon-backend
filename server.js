require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const ratingRoutes = require('./routes/rating');

const app = express();

const allowedOrigins = [
  'https://hijabhackathon-frontend-4yf1f4xl4-amnas-projects-65af5582.vercel.app',
  'https://hijabhackathon-frontend.vercel.app'
];

app.use(express.json());

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/reviews', ratingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
