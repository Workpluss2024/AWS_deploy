import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const orderSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  requestedByid: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Order', orderSchema);
