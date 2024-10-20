/**
 * @fileoverview Contractor Model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  insuranceExpiryDate: { type: Date, required: true },
  casStatus: { type: String, enum: ["active", "overdue"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contractor = mongoose.model("Contractor", contractorSchema);
export default Contractor;
