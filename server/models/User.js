import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
  },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: { type: String, required: true },
  authenticationMode: String,
  accountCreationDate: Date,
  lastModifiedDate: Date,
  isActive: Boolean,
  isVerified: Boolean,
  profilePic: String,
  dob: Date,
  address: String,
  baseLocation: String,
  subLocation: String,
  workType: String,
  workId: [{ type: Schema.Types.ObjectId, ref: 'Work' }],
  experience: Number,
  profession: String,
  currentEmployeerName: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  isDocumentVerified: Boolean,
  governmentIdType: String,
  governmentIdNumber: String,
  lastLogin: Date
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model('User', userSchema);
