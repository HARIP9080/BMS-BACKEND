/**
 * @fileoverview Resident Routes.
 * @author HARIP
 * @created 2024-10-18
 */


import express from 'express';
const router = express.Router();
import * as residentController from '../modules/resident/resident.controller.js';

router.get('/residents', residentController.getAllResidents);
router.get('/residents/:id', residentController.getResidentById);
router.post('/residents', residentController.createResident);
router.put('/residents/:id', residentController.updateResident);
router.delete('/residents/:id', residentController.deleteResident);

router.get('/residents/pending-updates', residentController.getPendingResidentUpdates);

export default router;
