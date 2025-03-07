import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

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

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { videoId } = req.params;
  const apiKey =
    process.env.YOUTUBE_API_KEY || "AIzaSyAven7EzDHPyOOHgEvqxCP4Sm-lFTGdd8E";

  if (!videoId) {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: "Missing API key in environment variables" });
    return;
  }

  let allComments: any[] = [];
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

      // Extract comments
      const comments = response.data.items.map((item) => ({
        author:
          item.snippet.topLevelComment.snippet.authorDisplayName || "Unknown",
        text:
          item.snippet.topLevelComment.snippet.textDisplay ||
          "No text available",
        publishedAt:
          item.snippet.topLevelComment.snippet.publishedAt || "Unknown date",
      }));

      allComments = [...allComments, ...comments];
      nextPageToken = response.data.nextPageToken; // Update token for next request
    } while (nextPageToken); // Continue if there's another page

    res.status(200).json(allComments);
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
