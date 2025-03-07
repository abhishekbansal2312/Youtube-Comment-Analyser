import axios from "axios";

export const analyzeSentiment = async (comments: string[]) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in environment variables");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the sentiment of these comments: ${comments.join(
                  ", "
                )}`,
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    throw new Error("Failed to analyze sentiment");
  }
};
