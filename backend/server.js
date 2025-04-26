import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import incidentRoutes from "./routes/incidentRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://gouravsittam:BixBie2C7oFv2j4Z@devspark.yx5wf.mongodb.net/humanchain"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api", incidentRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HumanChain AI Safety Incident Log API" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
