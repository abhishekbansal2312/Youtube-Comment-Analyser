import { api } from "./api";

export const fetchComments = async (videoId: string) => {
  try {
    const response = await api.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
