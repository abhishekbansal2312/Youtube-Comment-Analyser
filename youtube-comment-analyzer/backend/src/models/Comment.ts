import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  maskedUsername: { type: String, required: true },
  commentText: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ["agree", "disagree", "neutral"],
    required: true,
  },
  keywords: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
