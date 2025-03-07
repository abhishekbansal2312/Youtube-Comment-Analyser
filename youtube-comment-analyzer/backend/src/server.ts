import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("YouTube Comment Analyzer Backend is Running 🚀");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
