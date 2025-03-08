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
    <div className="mb-6">
      {/* Agree Bar */}
      <div className="mb-2">
        <p className="text-green-400 font-medium mb-1">
          Agree: {summary.Agree.percentage}
        </p>
        <div className="w-full  rounded-full h-6 overflow-hidden shadow-lg">
          <div
            className="h-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm px-2"
            style={{ width: summary.Agree.percentage }}
          >
            {summary.Agree.percentage !== "0%" && summary.Agree.percentage}
          </div>
        </div>
      </div>

      {/* Neutral Bar */}
      <div className="mb-2">
        <p className="text-yellow-400 font-medium mb-1">
          Neutral: {summary.Neutral.percentage}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-lg">
          <div
            className="h-full bg-yellow-400 text-black flex items-center justify-center font-semibold text-sm px-2"
            style={{ width: summary.Neutral.percentage }}
          >
            {summary.Neutral.percentage !== "0%" && summary.Neutral.percentage}
          </div>
        </div>
      </div>

      {/* Disagree Bar */}
      <div>
        <p className="text-red-400 font-medium mb-1">
          Disagree: {summary.Disagree.percentage}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-lg">
          <div
            className="h-full bg-red-600 text-white flex items-center justify-center font-semibold text-sm px-2"
            style={{ width: summary.Disagree.percentage }}
          >
            {summary.Disagree.percentage !== "0%" &&
              summary.Disagree.percentage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentStatistics;
