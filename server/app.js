// Using ES Modules import syntax
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes with ES Module syntax
import userRoutes from './routes/userRoutes.js';
import workRoutes from './routes/workRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import listRoutes from './routes/staticlistRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

// Database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
  process.exit(1); // Terminate app if database connection fails
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/works', workRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/otp', otpRoutes);

// Define a route for the root of the app
app.get('/', (req, res) => {
  res.send('Welcome to the Workpluss Daily Wage Jobs Application API!');
});

// Set the port the server will listen on
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
