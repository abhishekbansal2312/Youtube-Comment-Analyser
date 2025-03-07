import { Request, Response } from "express";
import axios from "axios";

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { videoId } = req.params;
  const apiKey = "AIzaSyAven7EzDHPyOOHgEvqxCP4Sm-lFTGdd8E";

  if (!videoId) {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: "Missing API key in environment variables" });
    return;
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          part: "snippet",
          videoId,
          key: apiKey,
          maxResults: 20,
        },
      }
    );

    // Ensure response contains items before mapping
    if (!response.data.items) {
      res.status(404).json({ error: "No comments found for this video" });
      return;
    }

    const comments = response.data.items.map((item: any) => ({
      author:
        item.snippet?.topLevelComment?.snippet?.authorDisplayName || "Unknown",
      text:
        item.snippet?.topLevelComment?.snippet?.textDisplay ||
        "No text available",
      publishedAt:
        item.snippet?.topLevelComment?.snippet?.publishedAt || "Unknown date",
    }));

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);

    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error:
          error.response?.data?.error?.message || "Failed to fetch comments",
      });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
