export interface Comment {
  text: string;
  author: string;
  postedAt: string;
  maskedUsername: string;
}

export interface SentimentSummary {
  totalComments: number;
  Agree: { count: number; percentage: string };
  Disagree: { count: number; percentage: string };
  Neutral: { count: number; percentage: string };
}

export interface SentimentData {
  comments: Comment[];
  sentiment: {
    results: SentimentResults[]; // Updated from string[] to SentimentResults[]
    summary: SentimentSummary;
  };
  keywords: string[];
}

export enum SentimentResults {
  AGREE = "Agree",
  NEUTRAL = "Neutral",
  DISAGREE = "Disagree",
}
