/**
 * @fileoverview Count Controller.
 * @author HARIP
 * @created 2024-10-18
 */

import Maintenance from '../modules/maintenance/maintenance.model.js';
import Contractor from '../modules/contractor/contractor.model.js';
import Resident from '../modules/resident/resident.model.js';

import Asset from '../modules/asset/asset.model.js'; 
import wordOrder from '../modules/workorder/workOrder.model.js';



export const getCounts = async (req, res) => {
  try {
    // Get the count of overdue maintenance records
    const maintenanceOverdueCountPromise = Maintenance.countDocuments({ status: 'overdue' });

    // Get the count of contractors with expiring insurance
    const currentDate = new Date();
    const contractorInsuranceExpiringCountPromise = Contractor.countDocuments({
      insuranceExpiryDate: { $lte: currentDate },
      casStatus: 'overdue',
    });

    // Get the count of residents with pending information updates
    const residentUpdatePendingCountPromise = Resident.countDocuments({ status: 'pending' });

    // Get the count of assets
    const assetCountPromise = Asset.countDocuments();
    const workOrderCountPromise = wordOrder.countDocuments();

    // Get the total count of residents
    const residentCountPromise = Resident.countDocuments();

    // Get the total count of contractors
    const contractorCountPromise = Contractor.countDocuments();

    // Get the count of overdue contractors
    const contractorOverdueCountPromise = Contractor.countDocuments({ casStatus: 'overdue' });
     // Get the count of active residents
     const activeResidentCountPromise = Resident.countDocuments({ status: 'active' });

     // Get the count of active contractors
     const activeContractorCountPromise = Contractor.countDocuments({ casStatus: 'active' });
     const activeMaintenanceCountPromise = Maintenance.countDocuments({ status: 'scheduled' });



    // Await all counts in parallel
    const [
      maintenanceOverdueCount,
      contractorInsuranceExpiringCount,
      residentUpdatePendingCount,
      assetCount,
      residentCount,
      contractorCount,
      contractorOverdueCount,
      activeResidentCount,
      activeContractorCount,
      activeMaintenanceCount,
      wordOrderCount
    ] = await Promise.all([
      maintenanceOverdueCountPromise,
      contractorInsuranceExpiringCountPromise,
      residentUpdatePendingCountPromise,
      assetCountPromise,
      residentCountPromise,
      contractorCountPromise,
      contractorOverdueCountPromise,
      activeResidentCountPromise,
      activeContractorCountPromise,
      activeMaintenanceCountPromise,
      workOrderCountPromise
    ]);
    const activeCasesCount = activeResidentCount + activeContractorCount + activeMaintenanceCount;


    // Return the counts as a JSON response
    res.status(200).json({
      maintenanceOverdueCount,
      contractorInsuranceExpiringCount,
      residentUpdatePendingCount,
      assetCount,
      residentCount,
      contractorCount,
      contractorOverdueCount,
      activeCasesCount,
      wordOrderCount

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counts', error: error.message });
  }
};
