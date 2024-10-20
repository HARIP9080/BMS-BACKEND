/**
 * @fileoverview Record Model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true }, // The name associated with the record
  title: { type: String, required: true }, // The title of the record
  descriptions: { type: String, required: true }, // Descriptions related to the record
  createdDate: { type: Date, default: Date.now }, // Date when the record was created
});

// Export the model
const Record = mongoose.model('Record', recordSchema);
export default Record;