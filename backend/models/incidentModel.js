import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Severity must be either Low, Medium, or High'
    }
  },
  reported_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for formatted date
incidentSchema.virtual('formattedDate').get(function() {
  return this.reported_at.toISOString();
});

// Set toJSON option to include virtuals
incidentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;