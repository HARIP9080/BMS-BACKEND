/**
 * @fileoverview Counts Routes.
 * @author HARIP
 * @created 2024-10-18
 */

import express from 'express';
const router = express.Router();
import * as countsController  from '../modules/counts.controller.js';

router.get('/counts', countsController.getCounts);
export default router;
