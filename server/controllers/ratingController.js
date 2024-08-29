// controllers/ratingController.js
import Rating from '../models/Rating.js';

// Create a new rating
export const createRating = async (req, res) => {
  try {
    const { UserId, rating, NumberOfRatings, reviewByEmployer, reviewDate } = req.body;
    const newRating = new Rating({ UserId, rating, NumberOfRatings, reviewByEmployer, reviewDate });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a rating by ID
export const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) return res.status(404).json({ message: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a rating
export const updateRating = async (req, res) => {
  try {
    const updatedRating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRating) return res.status(404).json({ message: 'Rating not found' });
    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const deletedRating = await Rating.findByIdAndDelete(req.params.id);
    if (!deletedRating) return res.status(404).json({ message: 'Rating not found' });
    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
