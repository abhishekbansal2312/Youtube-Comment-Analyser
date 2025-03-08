import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "your-mongodb-connection-string-here";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Wait 10s before timeout
      socketTimeoutMS: 45000, // Increase timeout for operations
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process if connection fails
  }
};
