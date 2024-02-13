import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // name : String,
    // email : String,
    // isActive : Boolean
    username: {
      type: String,
      required: true,
      uniqe: true,
      lowercase: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
    },
    passeord: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
