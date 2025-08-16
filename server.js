require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const ratingRoutes = require('./routes/rating');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://hijabhackathon-frontend-git-main-amnas-projects-65af5582.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
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