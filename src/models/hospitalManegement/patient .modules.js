import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    diagnoseWidth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['M', 'F', 'O'],
    },
    admittedIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hosptal',
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model('Patient', patientSchema);
