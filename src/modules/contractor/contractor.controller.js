/**
 * @fileoverview Coontractor Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Contractor from './contractor.model.js';

// Create a new contractor
export const createContractor = async (req, res) => {
    try {
        const newContractor = new Contractor(req.body);
        const savedContractor = await newContractor.save();
        res.status(201).json(savedContractor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all contractors
export const getAllContractors = async (req, res) => {
    try {
        const contractors = await Contractor.find();
        res.status(200).json(contractors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single contractor by ID
export const getContractorById = async (req, res) => {
    try {
        const contractor = await Contractor.findById(req.params.id);
        if (!contractor) {
            return res.status(404).json({ error: 'Contractor not found' });
        }
        res.status(200).json(contractor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a contractor by ID
export const updateContractor = async (req, res) => {
    try {
        const updatedContractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContractor) {
            return res.status(404).json({ error: 'Contractor not found' });
        }
        res.status(200).json(updatedContractor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a contractor by ID
export const deleteContractor = async (req, res) => {
    try {
        const deletedContractor = await Contractor.findByIdAndDelete(req.params.id);
        if (!deletedContractor) {
            return res.status(404).json({ error: 'Contractor not found' });
        }
        res.status(200).json({ message: 'Contractor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Additional method for expiring insurance
export const getExpiringInsurance = async (req, res) => {
    try {
        const today = new Date();
        const expiringContractors = await Contractor.find({
            insuranceExpiryDate: { $lt: today },
            casStatus: 'active'
        });
        res.status(200).json(expiringContractors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
