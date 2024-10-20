/**
 * @fileoverview Activity controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Activity from './activity.model.js';

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { date, user, record } = req.body;

    // Validate the request
    if (!date || !user || !record) {
      return res.status(400).json({ message: 'Date, user, and record fields are required.' });
    }

    // Create and save the new activity
    const newActivity = new Activity({ date, user, record });
    await newActivity.save();

    res.status(201).json({ message: 'Activity created successfully', activity: newActivity });
  } catch (error) {
    res.status(500).json({ message: 'Error creating activity', error: error.message });
  }
};

// Get all activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }); // Sort by the latest activities
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
};

// Get a single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error: error.message });
  }
};

// Update an activity by ID
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, user, record } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { date, user, record },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity updated successfully', activity: updatedActivity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating activity', error: error.message });
  }
};

// Delete an activity by ID
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error: error.message });
  }
};
