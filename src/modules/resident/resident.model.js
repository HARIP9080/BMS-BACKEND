/**
 * @fileoverview Resident Model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  informationUpdateDate: { type: Date, required: true },
  status: { type: String, enum: ['updated', 'pending'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Resident = mongoose.model('Resident', residentSchema);
export default Resident;