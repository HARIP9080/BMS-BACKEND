/**
 * @fileoverview Graph Routes.
 * @author HARIP
 * @created 2024-10-18
 */
import express from 'express';
const router = express.Router();
import * as graphController from '../modules/graph.controller.js';

router.get('/graph-data', graphController.getGraphData);

export default router;
