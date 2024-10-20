/**
 * @fileoverview Maintenance Routes.
 * @author HARIP
 * @created 2024-10-18
 */

import express from "express";
const router = express.Router();
import * as maintenanceController from "../modules/maintenance/maintenance.controller.js";
import { upload } from "../helper/multer.js";
import { fileURLToPath } from "url";
import path from "path";

router.get("/maintenance/overdue", maintenanceController.getOverdueMaintenance);
router.get("/maintenance", maintenanceController.getAllMaintenance);
router.get("/maintenance/:id", maintenanceController.getMaintenanceById);
router.post(
  "/maintenance",
  upload.single("file"),
  maintenanceController.createMaintenance
);
router.put("/maintenance/:id", maintenanceController.updateMaintenance);
router.delete("/maintenance/:id", maintenanceController.deleteMaintenance);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace("/routers", "");
router.get("/download/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error during download:", err);
      res.status(404).send("File not found.");
    }
  });
});

export default router;
