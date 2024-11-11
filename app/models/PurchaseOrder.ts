import mongoose, { Schema } from 'mongoose';

const purchaseOrderSchema = new Schema({
  title: { type: String, required: true },
  poNumber: { type: String, unique: true, required: true },
  itemsCount: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  createdBy: { type: String, required: true },
  vendor: { type: String, required: true },
  tags: { type: [String], default: [] },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

export default mongoose.models.PurchaseOrder || mongoose.model('PurchaseOrder', purchaseOrderSchema); 