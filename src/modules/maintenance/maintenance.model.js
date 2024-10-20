/**
 * @fileoverview Maintenance Model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose  from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["overdue", "completed", "scheduled"],
    required: true,
  },
  pdfURL: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance;