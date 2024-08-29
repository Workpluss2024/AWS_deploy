import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const workSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  workTitle: String,
  workSubTitle: String,
  workDescription: String,
  averagePayPerHour: Number,
  status: String,
  fieldsWorked: [String], // Array of fields or industries the user has worked in
  successfulJobsCount: Number, // Total number of jobs successfully completed by the user
  applications: [{
    applicantId: { type: Schema.Types.ObjectId, ref: 'User' },
    applicationDate: Date,
    status: String,
  }],
  feedback: [{
    fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    date: Date,
  }],
});

export default model('Work', workSchema);
