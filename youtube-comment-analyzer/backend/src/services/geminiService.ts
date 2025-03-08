import axios from "axios";

export const analyzeSentiment = async (
  comments: string[]
): Promise<{
  results: string[];
  summary: {
    totalComments: number;
    Agree: { count: number; percentage: string };
    Disagree: { count: number; percentage: string };
    Neutral: { count: number; percentage: string };
  };
}> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `Analyze the sentiment of each comment and categorize it into one of the following:

    1. "Agree" - The comment supports or aligns with the video's content.
    2. "Disagree" - The comment opposes or criticizes the video's content.
    3. "Neutral" - The comment is unrelated, off-topic, or does not express a clear sentiment.
    
    Analyze carefully and always return one of the three labels.

    Comments:
    ${comments.map((c, i) => `${i + 1}. ${c}`).join("\n")}

    Output format:
    1. Agree
    2. Disagree
    3. Neutral
    ...
    `;

    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const resultText: string =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    if (!resultText) throw new Error("Invalid response from API");

    const results: string[] = resultText.split("\n").map((line: string) => {
      const sentiment = line.split(".")[1]?.trim();
      return ["Agree", "Disagree", "Neutral"].includes(sentiment)
        ? sentiment
        : "Neutral";
    });
    if (results.length !== comments.length) {
      results.length = comments.length;
      results.fill("Neutral", results.length, comments.length);
    }

    // Count occurrences
    const sentimentCounts = {
      Agree: results.filter((s) => s === "Agree").length,
      Disagree: results.filter((s) => s === "Disagree").length,
      Neutral: results.filter((s) => s === "Neutral").length,
    };

    // Calculate percentages
    const totalComments = comments.length;
    const sentimentSummary = {
      totalComments,
      Agree: {
        count: sentimentCounts.Agree,
        percentage:
          ((sentimentCounts.Agree / totalComments) * 100).toFixed(2) + "%",
      },
      Disagree: {
        count: sentimentCounts.Disagree,
        percentage:
          ((sentimentCounts.Disagree / totalComments) * 100).toFixed(2) + "%",
      },
      Neutral: {
        count: sentimentCounts.Neutral,
        percentage:
          ((sentimentCounts.Neutral / totalComments) * 100).toFixed(2) + "%",
      },
    };

    return { results, summary: sentimentSummary };
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    throw new Error("Failed to analyze sentiment");
  }
};
