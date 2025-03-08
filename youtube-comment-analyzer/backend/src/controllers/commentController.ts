import { Request, Response, RequestHandler } from "express";
import axios, { AxiosResponse } from "axios";
import { analyzeSentiment } from "../services/geminiService";
import { extractKeywords } from "../services/keywordExtractor";
import { CommentModel } from "../models/Comment";

export const getCommentsAndAnalyze: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { videoId } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!videoId || !apiKey) {
    res.status(400).json({ error: "Video ID and API key are required" });
  }

  let allComments: { maskedUsername: string; text: string }[] = [];
  let nextPageToken: string | undefined = undefined;

  try {
    do {
      const response: AxiosResponse<{ items: any[]; nextPageToken?: string }> =
        await axios.get(
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

      response.data.items.forEach((item: any) => {
        const snippet = item.snippet.topLevelComment.snippet;
        allComments.push({
          maskedUsername: `User_${Math.floor(Math.random() * 1000)}`,
          text: snippet.textDisplay,
        });
      });

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    if (allComments.length === 0) {
      res.status(200).json({ message: "No comments found" });
    }

    // Sentiment analysis & keyword extraction
    const commentTexts = allComments.map((c) => c.text);
    const sentimentResults = await analyzeSentiment(commentTexts);
    const keywords = extractKeywords(commentTexts);

    // Save to MongoDB
    res.status(200).json({
      comments: allComments,
      sentiment: sentimentResults,
      keywords,
    });

    res.status(200).json({
      comments: allComments,
      sentiment: sentimentResults,
      keywords,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
