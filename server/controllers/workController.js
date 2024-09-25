import Work from '../models/Work.js';
import jwt from 'jsonwebtoken'; // For JWT authentication

// Create a new job post
export const createWork = async (req, res) => {
  const {
    jobTitle,
    description,
    postalAddress,
    area,
    postalCode,
    city,
    date,
    startingTime,
    duration,
    maxPerHourAmount,
    totalAmount,
  } = req.body;

  // Input validation (this could be moved to a validation module)
  if (!jobTitle || !description || !postalAddress || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields: jobTitle, description, postalAddress, totalAmount' });
  }

  try {
    // Create new work post
    const newWork = new Work({
      jobTitle,
      description,
      postalAddress,
      area,
      postalCode,
      city,
      date,
      startingTime,
      duration,
      maxPerHourAmount,
      totalAmount,
    });

    await newWork.save();

    // Return the newly created job post with status 201
    return res.status(201).json({ message: 'Job post created successfully', newWork });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating job post', error: error.message });
  }
};

// Get all job posts
export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find();
    return res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching job posts', error: error.message });
  }
};

// Get a single job post by ID
export const getWorkById = async (req, res) => {
  const { id } = req.params;

  try {
    const work = await Work.findById(id);

    if (!work) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching job post', error: error.message });
  }
};

// Update a job post
export const updateWork = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedWork = await Work.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedWork) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.status(200).json({ message: 'Job post updated successfully', updatedWork });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating job post', error: error.message });
  }
};

// Delete a job post
export const deleteWork = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting job post', error: error.message });
  }
};

// Middleware for verifying JWT
export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user to the request
    next();  // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
