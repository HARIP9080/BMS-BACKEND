/**
 * @fileoverview Maintenance Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Maintenance from "./maintenance.model.js";

// Create a new maintenance task
export const createMaintenance = async (req, res) => {
  try {
    console.log(req.body);
    const file = req.file;
    const reqData = {
      pdfURL: file.path,
      ...req.body
    }
    const newMaintenance = new Maintenance(reqData);
    const savedMaintenance = await newMaintenance.save();
    res.status(201).json(savedMaintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all maintenance tasks
export const getAllMaintenance = async (req, res) => {
  try {
    const maintenanceList = await Maintenance.find();
    res.status(200).json(maintenanceList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single maintenance task by ID
export const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: "Maintenance task not found" });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a maintenance task by ID
export const updateMaintenance = async (req, res) => {
  try {
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMaintenance) {
      return res.status(404).json({ error: "Maintenance task not found" });
    }
    res.status(200).json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a maintenance task by ID
export const deleteMaintenance = async (req, res) => {
  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMaintenance) {
      return res.status(404).json({ error: "Maintenance task not found" });
    }
    res.status(200).json({ message: "Maintenance task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get overdue maintenance tasks
export const getOverdueMaintenance = async (req, res) => {
  try {
    const overdueMaintenance = await Maintenance.find({ status: "overdue" });
    res.status(200).json(overdueMaintenance);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching overdue maintenance",
        error: error.message,
      });
  }
};
