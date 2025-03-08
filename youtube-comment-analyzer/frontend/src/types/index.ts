export interface Comment {
  maskedUsername: string;
  text: string;
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
    results: string[];
    summary: SentimentSummary;
  };
  keywords: string[];
}
