/**
 * @fileoverview Graph Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Maintenance from '../modules/maintenance/maintenance.model.js';
import Contractor from '../modules/contractor/contractor.model.js';
import Resident from '../modules/resident/resident.model.js';

import Asset from '../modules/asset/asset.model.js'; 
import wordOrder from '../modules/workorder/workOrder.model.js';


export const getGraphData = async (req, res) => {
  try {
    // Define the case count (modify the criteria based on your needs, e.g., overdue cases)
    const caseCountPromise = Maintenance.countDocuments({ status: 'overdue' });

    // Get the total count of contractors
    const contractorCountPromise = Contractor.countDocuments();

    // Get the total count of residents
    const residenceCountPromise = Resident.countDocuments();

    // Get the total count of assets
    const assetsCountPromise = Asset.countDocuments();
    const workOrderCountPromise = wordOrder.countDocuments();

    // Await all counts in parallel
    const [caseCount, contractorCount, residenceCount, assetsCount,wordOrderCount] = await Promise.all([
      caseCountPromise,
      contractorCountPromise,
      residenceCountPromise,
      assetsCountPromise,
    workOrderCountPromise,
    ]);

    // Return the counts as a JSON response
    res.status(200).json({
      caseCount,
      contractorCount,
      residenceCount,
      assetsCount,
      wordOrderCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching graph data', error: error.message });
  }
};
