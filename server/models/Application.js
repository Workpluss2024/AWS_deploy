import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const applicationSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  workId: { type: Schema.Types.ObjectId, ref: 'Work' },
  status: String,
  applicationDate: {
    type: Date,
    default: Date.now
  },
  responseDate: Date,
});

export default model('Application', applicationSchema);
