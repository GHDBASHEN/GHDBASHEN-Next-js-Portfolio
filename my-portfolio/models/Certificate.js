import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a certificate title.'],
    trim: true,
  },
  issuer: {
    type: String,
    required: [true, 'Please provide the issuing organization.'],
  },
  issueDate: {
    type: String,
    required: [true, 'Please provide the issue date.'],
  },
  certificateUrl: {
    type: String,
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

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
