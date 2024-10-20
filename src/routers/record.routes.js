/**
 * @fileoverview  Record Routes.
 * @author HARIP
 * @created 2024-10-18
 */
import express from 'express';
const router = express.Router();
import * as recordController from '../modules/record/record.controller.js';

// Route to create a new record
router.post('/records', recordController.createRecord);

// Route to get all records
router.get('/records', recordController.getAllRecords);

// Route to get a single record by ID
router.get('/records/:id', recordController.getRecordById);

// Route to update a record by ID
router.put('/records/:id', recordController.updateRecord);

// Route to delete a record by ID
router.delete('/records/:id', recordController.deleteRecord);

export default router;
