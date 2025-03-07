import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: String,
  comment: String,
  maskedUsername: String,
  sentiment: String, // Agree, Disagree, Neutral
  keywords: [String],
  timestamp: Date,
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
