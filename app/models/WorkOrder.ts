import mongoose, { Schema } from 'mongoose';

const workOrderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  startDate: { type: Date },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  category: { type: String, required: true },
  hasInfo: { type: Boolean, default: false },
  hasRecurring: { type: Boolean, default: false },
  workOrderNumber: { type: Number, unique: true, required: true }
}, {
  timestamps: true
});

export default mongoose.models.WorkOrder || mongoose.model('WorkOrder', workOrderSchema); 