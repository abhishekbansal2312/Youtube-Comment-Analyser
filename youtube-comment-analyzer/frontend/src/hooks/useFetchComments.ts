import { useState, useEffect } from "react";
import { SentimentData } from "../types/index";
import { fetchVideoComments } from "../services/commentService";

export const useFetchComments = (initialVideoId: string = "") => {
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string>(initialVideoId);

  const fetchComments = async (id: string = videoId) => {
    if (!id.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const responseData = await fetchVideoComments(id);
      setData(responseData);
    } catch (err) {
      setError("Failed to fetch comments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  return {
    data,
    loading,
    error,
    videoId,
    setVideoId,
    fetchComments,
  };
};
