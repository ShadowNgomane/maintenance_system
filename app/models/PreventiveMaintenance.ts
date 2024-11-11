import mongoose, { Schema, Document } from 'mongoose';
import { MaintenanceItem } from "@/app/types/PreventiveMaintenance"

const MaintenanceItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  workOrderTitle: { type: String, required: true },
  workOrderDescription: { type: String, required: true },
  image: { type: String, required: true },
  schedules: { type: Number, required: true },
  category: { type: String, required: true },
  asset: { type: String, required: true },
  assignedTo: {
    name: { type: String, required: true },
    avatar: { type: String, required: false },
  },
  additionalWorkers: { type: [String], required: true },
  team: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  checklist: { type: [String], required: true },
  dateCreated: { type: String, required: true },
});

export default mongoose.models.PreventiveMaintenance || mongoose.model<MaintenanceItem>('PreventiveMaintenance', MaintenanceItemSchema); 