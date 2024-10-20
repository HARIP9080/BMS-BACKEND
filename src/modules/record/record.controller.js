/**
 * @fileoverview Record Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Record  from './record.model.js';

// Create a new record
export const createRecord = async (req, res) => {
  try {
    const { name, title, descriptions, createdDate } = req.body;

    // Create and save the new record
    const newRecord = new Record({ name, title, descriptions, createdDate });
    await newRecord.save();

    res.status(201).json({ message: 'Record created successfully', record: newRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error: error.message });
  }
};

// Get all records
export const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdDate: -1 }); // Sort by the latest createdDate
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

// Get a single record by ID
export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error: error.message });
  }
};

// Update a record by ID
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, descriptions, createdDate } = req.body;

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { name, title, descriptions, createdDate },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record updated successfully', record: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};

// Delete a record by ID
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Record.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
};
