import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const tokenSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expiryDate: Date,
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
});

export default model('Token', tokenSchema);
