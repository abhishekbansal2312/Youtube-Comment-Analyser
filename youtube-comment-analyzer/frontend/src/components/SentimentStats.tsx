import React from "react";
import { SentimentSummary } from "../types/index";

interface SentimentStatsProps {
  summary: SentimentSummary;
}

const SentimentStats: React.FC<SentimentStatsProps> = ({ summary }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        Sentiment Breakdown
      </h2>
      <div className="flex justify-around text-lg mb-6">
        <p className="text-green-400">
          Agree: {summary.Agree.count} ({summary.Agree.percentage})
        </p>
        <p className="text-red-400">
          Disagree: {summary.Disagree.count} ({summary.Disagree.percentage})
        </p>
        <p className="text-yellow-400">
          Neutral: {summary.Neutral.count} ({summary.Neutral.percentage})
        </p>
      </div>
    </div>
  );
};

export default SentimentStats;
