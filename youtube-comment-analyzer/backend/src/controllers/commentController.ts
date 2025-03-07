import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { analyzeSentiment } from "../services/geminiService";
import { extractKeywords } from "../services/keywordExtractor";

interface YouTubeCommentResponse {
  items: {
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName: string;
          textDisplay: string;
          publishedAt: string;
        };
      };
    };
  }[];
  nextPageToken?: string;
}

export const getCommentsAndAnalyze = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { videoId } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!videoId) {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: "Missing API key in environment variables" });
    return;
  }

  let allComments: string[] = []; // Store only comment text
  let nextPageToken: string | undefined = undefined;

  try {
    do {
      const response: AxiosResponse<YouTubeCommentResponse> = await axios.get(
        "https://www.googleapis.com/youtube/v3/commentThreads",
        {
          params: {
            part: "snippet",
            videoId,
            key: apiKey,
            maxResults: 100,
            pageToken: nextPageToken,
          },
        }
      );

      if (!response.data.items) break;

      // Extract comments (only text)
      const comments = response.data.items.map(
        (item) => item.snippet.topLevelComment.snippet.textDisplay
      );

      allComments = [...allComments, ...comments];
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    if (allComments.length === 0) {
      res
        .status(200)
        .json({ message: "No comments found", sentiment: [], keywords: [] });
      return;
    }

    // Send comments for analysis
    const sentimentResults = await analyzeSentiment(allComments);
    const keywords = extractKeywords(allComments);

    res.status(200).json({
      comments: allComments,
      sentiment: sentimentResults,
      keywords: keywords,
    });
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
