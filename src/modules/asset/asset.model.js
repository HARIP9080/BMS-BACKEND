/**
 * @fileoverview Asset Model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  asset_name: { type: String, required: true },
  resident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// This will create the relationship to the Resident model
const Asset = mongoose.model('Asset', assetSchema);
export default Asset;
