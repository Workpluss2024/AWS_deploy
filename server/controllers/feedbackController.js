// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const { userId, workId, content, ratingId, feedbackDate } = req.body;
    const newFeedback = new Feedback({ userId, workId, content, ratingId, feedbackDate });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a feedback
export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFeedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a feedback
export const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
