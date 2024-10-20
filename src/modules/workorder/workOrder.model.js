/**
 * @fileoverview WorkOrder Model.
 * @author HARIP
 * @created 2024-10-18
 */
import mongoose from 'mongoose';

const workOrderSchema = new mongoose.Schema({
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor', // Reference to the Contractor model
    required: true,
  },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  dueDate: { type: Date, required: true },
  sentDate: { type: Date }, // Optional sent date field
  createdAt: { type: Date, default: Date.now },
});

// Export the model
 const WorkOrder= mongoose.model('WorkOrder', workOrderSchema);
export default WorkOrder;