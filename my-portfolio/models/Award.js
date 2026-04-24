import mongoose from 'mongoose';

const AwardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an award title.'],
    trim: true,
  },
  organization: {
    type: String,
    required: [true, 'Please provide the awarding organization.'],
  },
  year: {
    type: String,
    required: [true, 'Please provide the year.'],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Award || mongoose.model('Award', AwardSchema);
