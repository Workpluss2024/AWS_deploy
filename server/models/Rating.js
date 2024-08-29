import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ratingSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },  // ID of the user being rated
  rating: Number,                                       // Numerical rating given to the user
  NumberOfRatings: Number,                              // Total number of ratings received
  reviewByEmployer: String,                             // Text content of the review given by the employer
  reviewDate: {
    type: Date,
    default: Date.now
  },                                   
});

export default model('Rating', ratingSchema);
