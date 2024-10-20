/**
 * @fileoverview Asset Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Asset from './asset.model.js';
import Resident from '../resident/resident.model.js';

// Create a new asset
export const createAsset = async (req, res) => {
  try {
    const { asset_name, resident_id } = req.body;

    // Check if the resident exists
    const resident = await Resident.findById(resident_id);
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    // Create and save the new asset
    const newAsset = new Asset({ asset_name, resident_id });
    await newAsset.save();

    res.status(201).json({ message: 'Asset created successfully', asset: newAsset });
  } catch (error) {
    res.status(500).json({ message: 'Error creating asset', error: error.message });
  }
};

// Get all assets with resident details populated
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate('resident_id', 'name status');
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error: error.message });
  }
};
