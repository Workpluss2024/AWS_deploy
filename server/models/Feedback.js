import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const feedbackSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },  // User who is giving the feedback
  workId: { type: Schema.Types.ObjectId, ref: 'Work' },  // Work/job related to the feedback
  content: String,                                       // Text content of the feedback
  ratingId: { type: Schema.Types.ObjectId, ref: 'Rating' },  // Link to the rating collection
  feedbackDate: {
    type: Date,
    default: Date.now
  },                                    // Date when the feedback was given
});

export default model('Feedback', feedbackSchema);
