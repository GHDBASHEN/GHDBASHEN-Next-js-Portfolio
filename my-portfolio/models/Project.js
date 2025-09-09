import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description.'],
  },
  projectUrl: {
    type: String,
    required: [true, 'Please provide the project URL.'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);