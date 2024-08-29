// controllers/applicationController.js
import Application from '../models/Application.js';

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const { userId, workId, status, applicationDate, responseDate } = req.body;
    const newApplication = new Application({ userId, workId, status, applicationDate, responseDate });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get an application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an application
export const updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplication) return res.status(404).json({ message: 'Application not found' });
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
