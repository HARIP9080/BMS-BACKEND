

/**
 * @fileoverview Resident Controller.
 * @author HARIP
 * @created 2024-10-18
 */
import Resident from './resident.model.js';

export const createResident = async (req, res) => {
    try {
        const newResident = new Resident(req.body);
        const savedResident = await newResident.save();
        res.status(201).json(savedResident);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllResidents = async (req, res) => {
    try {
        const residents = await Resident.find();
        res.status(200).json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getResidentById = async (req, res) => {
    try {
        const resident = await Resident.findById(req.params.id);
        if (!resident) {
            return res.status(404).json({ error: 'Resident not found' });
        }
        res.status(200).json(resident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateResident = async (req, res) => {
    try {
        const updatedResident = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResident) {
            return res.status(404).json({ error: 'Resident not found' });
        }
        res.status(200).json(updatedResident);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteResident = async (req, res) => {
    try {
        const deletedResident = await Resident.findByIdAndDelete(req.params.id);
        if (!deletedResident) {
            return res.status(404).json({ error: 'Resident not found' });
        }
        res.status(200).json({ message: 'Resident deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPendingResidentUpdates = async (req, res) => {
    try {
        const pendingUpdates = await Resident.find({ status: 'pending' });
        res.status(200).json(pendingUpdates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resident updates', error: error.message });
    }
};
