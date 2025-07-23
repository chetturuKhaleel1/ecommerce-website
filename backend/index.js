// import packages 
import './config/loadEnv.js';
// import dotenv from 'dotenv';
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";

// utils
import connectDB from './config/db.js';

// ✅ Proper dotenv config


const port = process.env.PORT || 5000;

// DB connection
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// serve static uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


console.log("✅ ENV TEST:", {
  id: process.env.RAZORPAY_KEY_ID,
  secret: process.env.RAZORPAY_KEY_SECRET,
});

app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
