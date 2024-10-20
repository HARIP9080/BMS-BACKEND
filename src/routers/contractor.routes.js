/**
 * @fileoverview Contractor Routes.
 * @author HARIP
 * @created 2024-10-18
 */
import express from 'express';
const router = express.Router();
import * as contractorController from '../modules/contractor/contractor.controller.js';

// CRUD Routes
router.get('/contractors', contractorController.getAllContractors);
router.get('/contractors/:id', contractorController.getContractorById);
router.post('/contractors', contractorController.createContractor);
router.put('/contractors/:id', contractorController.updateContractor);
router.delete('/contractors/:id', contractorController.deleteContractor);

// Existing route
router.get('/contractors/insurance-expiring', contractorController.getExpiringInsurance);

export default router;
