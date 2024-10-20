/**
 * @fileoverview WorkOrder Controller.
 * @author HARIP
 * @created 2024-10-18
 */
import WorkOrder  from './workOrder.model.js';
import Contractor from  '../contractor/contractor.model.js';

// Create a new work order
export const createWorkOrder = async (req, res) => {
  try {
    const { contractor, description, status, dueDate, sentDate } = req.body;

    // Validate contractor exists
    const contractorExists = await Contractor.findById(contractor);
    if (!contractorExists) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Create and save the new work order
    const newWorkOrder = new WorkOrder({ contractor, description, status, dueDate, sentDate });
    await newWorkOrder.save();

    res.status(201).json({ message: 'Work order created successfully', workOrder: newWorkOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating work order', error: error.message });
  }
};

// Get all work orders
export const getAllWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate('contractor', 'name casStatus') // Populate contractor details
      .sort({ createdAt: -1 });
    res.status(200).json(workOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work orders', error: error.message });
  }
};

// Get a single work order by ID
export const getWorkOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const workOrder = await WorkOrder.findById(id).populate('contractor', 'name casStatus');

    if (!workOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.status(200).json(workOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work order', error: error.message });
  }
};

// Update a work order by ID
export const updateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { contractor, description, status, dueDate, sentDate } = req.body;

    // Check if the contractor exists if a contractor ID is provided
    if (contractor) {
      const contractorExists = await Contractor.findById(contractor);
      if (!contractorExists) {
        return res.status(404).json({ message: 'Contractor not found' });
      }
    }

    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      id,
      { contractor, description, status, dueDate, sentDate },
      { new: true, runValidators: true }
    );

    if (!updatedWorkOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.status(200).json({ message: 'Work order updated successfully', workOrder: updatedWorkOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating work order', error: error.message });
  }
};

// Delete a work order by ID
export const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkOrder = await WorkOrder.findByIdAndDelete(id);

    if (!deletedWorkOrder) {
      return res.status(404).json({ message: 'Work order not found' });
    }

    res.status(200).json({ message: 'Work order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting work order', error: error.message });
  }
};
