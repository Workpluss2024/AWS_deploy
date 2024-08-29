// Import the Work model correctly
import Work from '../models/Work.js';

// Function to create a new work/job entry
export async function createWork(req, res) {
  try {
    const work = new Work(req.body);
    await work.save();
    res.status(201).send(work);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Function to retrieve a work/job entry by ID
export async function getWork(req, res) {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).send('Work not found');
    }
    res.send(work);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Function to update a work/job entry by ID
export async function updateWork(req, res) {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!work) {
      return res.status(404).send('Work not found');
    }
    res.send(work);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Function to delete a work/job entry by ID
export async function deleteWork(req, res) {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) {
      return res.status(404).send('Work not found');
    }
    res.send({ message: 'Work successfully deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
}
