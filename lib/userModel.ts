import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: 'UUID',
      default: () => randomUUID()
    },
    email: {
      type: String,
      require: [true]
    },
    name: {
      type: String,
      require: [true]
    },
    auth0UserId: {
      type: String,
      require: [true]
    },
    memberIds: [String]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
