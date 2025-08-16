const express = require('express');
const Review = require('../models/review');

const router = express.Router();

router.post('/',  async (req, res) => {
  const { review } = req.body;
  if (!review) {
    return res.status(400).json({ message: 'Review is required' });
  }
  try {
    const newReview = new Review({ review });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    
    const reviews = await Review.find(); 
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
