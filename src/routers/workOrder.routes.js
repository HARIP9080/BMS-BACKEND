/**
 * @fileoverview  WorkOrder Routes.
 * @author HARIP
 * @created 2024-10-18
 */
import express from 'express';
const router = express.Router();
import * as workOrderController from '../modules/workorder/wordOrder.controller.js';

// Route to create a new work order
router.post('/work-orders', workOrderController.createWorkOrder);

// Route to get all work orders
router.get('/work-orders', workOrderController.getAllWorkOrders);

// Route to get a single work order by ID
router.get('/work-orders/:id', workOrderController.getWorkOrderById);

// Route to update a work order by ID
router.put('/work-orders/:id', workOrderController.updateWorkOrder);

// Route to delete a work order by ID
router.delete('/work-orders/:id', workOrderController.deleteWorkOrder);

export default router;
