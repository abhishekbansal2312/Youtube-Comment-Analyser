import React from "react";
import { SentimentSummary } from "../types/index";

interface CommentStatisticsProps {
  total: number;
  sentiment: {
    summary?: SentimentSummary;
  };
}

const CommentStatistics: React.FC<CommentStatisticsProps> = ({
  total,
  sentiment,
}) => {
  const summary = sentiment?.summary || {
    Agree: { count: 0, percentage: "0%" },
    Disagree: { count: 0, percentage: "0%" },
    Neutral: { count: 0, percentage: "0%" },
    totalComments: 0,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        Comment Statistics
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

export default CommentStatistics;
