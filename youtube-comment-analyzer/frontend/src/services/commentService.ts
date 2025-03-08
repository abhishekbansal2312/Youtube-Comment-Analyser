import api from "./api";
import { SentimentData } from "../types";

export const fetchVideoComments = async (
  videoId: string
): Promise<SentimentData> => {
  const response = await api.get<SentimentData>(`/comments/${videoId}`);
  return response.data;
};
