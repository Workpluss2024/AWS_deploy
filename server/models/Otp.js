import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const otpSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  otp: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  email: String,
  expiryDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m',  // OTP will expire after 5 minutes
  }
});

export default model('Otp', otpSchema);
