/**
 * @fileoverview Asset Routes.
 * @author HARIP
 * @created 2024-10-18
 */
import express  from 'express';
const router = express.Router();
import * as assetController from '../modules/asset/asset.controller.js';

router.post('/assets', assetController.createAsset);

router.get('/assets', assetController.getAssets);


export default router;
