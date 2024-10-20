/**
 * @fileoverview Activity model.
 * @author HARIP
 * @created 2024-10-18
 */

import mongoose from 'mongoose';

// Schema for each record (time and action)
const recordSchema = new mongoose.Schema({
  time: { type: String, required: true }, // Time in "hh:mm am/pm" format
  action: { type: String, required: true }, // Action description
});

// Schema for each activity
const activitySchema = new mongoose.Schema({
  date: { type: String, required: true }, // Date in "dd/mm/yyyy" format
  user: { type: String, required: true }, // User name
  record: { type: [recordSchema], required: true }, // Array of records (time and action)
  createdAt: { type: Date, default: Date.now }, // Automatically set creation date
});

// Export the model
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;