import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const workSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postalAddress: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startingTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,  
    required: true,
  },
  maxPerHourAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

export default model('Work', workSchema);
