import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: { type: String, required: true, index: true }, // Indexed for faster queries
  comments: [
    {
      maskedUsername: { type: String, required: true },
      commentText: { type: String, required: true },
      sentiment: {
        type: String,
        enum: ["agree", "disagree", "neutral"],
        required: true,
      },
      keywords: [{ type: String }],
      timestamp: { type: Date, default: Date.now },
    },
  ],
  sentiment: { type: Object },
  keywords: [{ type: String }],
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
