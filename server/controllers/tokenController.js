// controllers/tokenController.js
import Token from '../models/Token.js';

// Create a new token
export const createToken = async (req, res) => {
  try {
    const { userId, token, expiryDate, creationDate, lastLogin } = req.body;
    const newToken = new Token({ userId, token, expiryDate, creationDate, lastLogin });
    await newToken.save();
    res.status(201).json(newToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a token by ID
export const getTokenById = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: 'Token not found' });
    res.json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a token
export const updateToken = async (req, res) => {
  try {
    const updatedToken = await Token.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedToken) return res.status(404).json({ message: 'Token not found' });
    res.json(updatedToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a token
export const deleteToken = async (req, res) => {
  try {
    const deletedToken = await Token.findByIdAndDelete(req.params.id);
    if (!deletedToken) return res.status(404).json({ message: 'Token not found' });
    res.json({ message: 'Token deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
