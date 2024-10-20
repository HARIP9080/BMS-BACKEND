
import express from  'express'
import dotenv from  'dotenv'
import connectDB from  './config/db.js'
import cors from  "cors"
import fs from "fs"
import maintenanceRoutes from  './routers/maintenance.routes.js'
import contractorRoutes from  './routers/contractor.routes.js'
import residentRoutes from  './routers/resident.routes.js'
import countsRoutes from  './routers/counts.routes.js'
import activityRoutes from  './routers/activity.routes.js'
import assetRoutes from  './routers/asset.routes.js'
import graphRoutes from  './routers/graph.routes.js' 
import workOrderRoutes from  './routers/workOrder.routes.js'
import recordRoutes from  './routers/record.routes.js'


dotenv.config()

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
  origin:"*"
}))

const uploadDir = "uploads";

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("uploads folder created")
  }
};
ensureDirExists(uploadDir);
// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', maintenanceRoutes);
app.use('/api', contractorRoutes);
app.use('/api', residentRoutes);
app.use('/api', countsRoutes);
app.use('/api', activityRoutes);
app.use('/api', assetRoutes);
app.use('/api', graphRoutes);
app.use('/api', workOrderRoutes);
app.use('/api', recordRoutes);


// Root Route
app.get('/', (req, res) => {
  res.send('Node.js Backend is Running');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
