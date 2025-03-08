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
    return;
  }

  let allComments: {
    maskedUsername: string;
    text: string;
    postedAt: string;
  }[] = [];
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
          postedAt: snippet.publishedAt,
        });
      });

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    if (allComments.length === 0) {
      res.status(200).json({ message: "No comments found" });
      return;
    }

    // Perform sentiment analysis and keyword extraction
    const commentTexts = allComments.map((c) => c.text);
    const sentimentResults = await analyzeSentiment(commentTexts);
    const keywordResults = extractKeywords(commentTexts);

    // Structure the comments for MongoDB
    const commentsToSave = allComments.map((comment, index) => ({
      maskedUsername: comment.maskedUsername,
      commentText: comment.text,
      sentiment: sentimentResults.results?.[index]?.toLowerCase() || "neutral",
      keywords: keywordResults?.[index] || [],
      timestamp: new Date(comment.postedAt),
    }));

    // Upsert: Insert new or update existing document
    await CommentModel.findOneAndUpdate(
      { videoId },
      { $set: { videoId }, $push: { comments: { $each: commentsToSave } } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      videoId,
      comments: allComments,
      sentiment: sentimentResults,
      keywords: keywordResults,
      message: "Comments saved successfully",
    });
  } catch (error) {
    console.error("Error fetching or saving comments:", error);
    res.status(500).json({ error: "Failed to fetch or save comments" });
  }
};
