import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug log environment variables
// console.log('Environment loaded:', {
//   NODE_ENV: process.env.NODE_ENV,
//   PORT: process.env.PORT,
//   JWT_SECRET: process.env.JWT_SECRET ? '[SET]' : '[NOT SET]'
// });

//cloudinary
import { v2 as cloudinary } from 'cloudinary';

// Models
import User, { createDefaultAdmin } from "./models/User.js";
import Submission from "./models/Submission.js";

// Routes
import submissionRoutes from "./routes/submissionRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import skillingRoutes from "./routes/skillingRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from './routes/upload.routes.js';
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";

// Middleware
import { isAuthenticated, isAdmin } from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    // console.log("MongoDB connected");
    // Create default admin user
    await createDefaultAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// API health check
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working properly" });
});

// User routes (auth & profile)
app.use("/api/users", userRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Admin login route
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // For admin, we'll use the simple credentials
    if (username !== 'admin' || password !== 'admin123') {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token for admin
    const token = jwt.sign(
      { id: 'admin', username, isAdmin: true },
      process.env.JWT_SECRET || 'nexus-club-jwt-secret-key-2024-secure-random-string',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//cloudinary connect
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✨ Manual submission endpoint (if used separately)
app.post("/api/submit-project", async (req, res) => {
  const { name, uid, branch, title, pdfLink } = req.body;
  if (!name || !uid || !branch || !title || !pdfLink) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newSubmission = new Submission({ name, uid, branch, title, pdfLink });
    await newSubmission.save();
    res.status(201).json({ message: "Submission successful." });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Community routes (some public, some protected)
app.use("/api/community", communityRoutes);
app.use("/api/products", productRoutes);
app.use("/api/skilling", skillingRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/submissions/mdm", submissionRoutes)
app.use("/imageapi/imageCloudinarypublic",cloudinaryRoutes)

// Protected routes
app.use("/api/submissions", isAuthenticated, submissionRoutes);
// app.use("/api/products", isAuthenticated, productRoutes);
// app.use("/api/skilling", isAuthenticated, skillingRoutes);
// app.use("/api/events", isAuthenticated, eventRoutes);
app.use("/imageapi/imageCloudinary", isAuthenticated, cloudinaryRoutes)
app.use("/api/orders", isAuthenticated, orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`)
}
);