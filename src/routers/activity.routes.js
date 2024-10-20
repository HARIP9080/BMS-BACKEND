/**
 * @fileoverview Activity Routes.
 * @author HARIP
 * @created 2024-10-18
 */

import express from 'express';
const router = express.Router();
import * as activityController  from '../modules/activity/activity.controller.js';

router.post('/activities', activityController.createActivity);

router.get('/activities', activityController.getAllActivities);

router.get('/activities/:id', activityController.getActivityById);

router.put('/activities/:id', activityController.updateActivity);

router.delete('/activities/:id', activityController.deleteActivity);

export default router;
