import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SentimentDistribution from "../components/SentimentDistribution";
import CommentStatistics from "../components/CommentStatistics";
import KeywordsList from "../components/KeywordsList";
import CommentCard from "../components/CommentCard";
import { SentimentData } from "../types/index";
import MonthlyContributionChart from "../components/MonthlyContributionChart";

const Insights: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data as SentimentData | null;
  const [showAllComments, setShowAllComments] = useState(false);

  console.log("Data received in Insights:", data);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full p-8 text-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Insights</h1>
          <p className="text-center text-gray-500">
            No data available. Please analyze a video first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b py-10">
      <div className="max-w-5xl mx-auto p-8 bg-white text-gray-900 rounded-lg shadow-lg">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-center flex-grow">
            Insights Sentiment YouTube
          </h1>
        </div>

        {/* Sentiment Distribution & Comment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
          {/* Sentiment Distribution */}
          {data.sentiment?.results && (
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-2">
                Sentiment Distribution
              </h2>
              <SentimentDistribution data={data.sentiment.results} />
            </div>
          )}

          {/* Comment Statistics */}
          <div className="p-4 border rounded-lg">
            {data.sentiment?.summary ? (
              <>
                <h2 className="text-lg font-semibold mb-2">
                  Comment Statistics
                </h2>
                <CommentStatistics
                  total={data.comments?.length || 0}
                  sentiment={data.sentiment}
                />
              </>
            ) : (
              <p className="text-center text-gray-500">
                No sentiment data available.
              </p>
            )}
          </div>
        </div>

        {/* Keywords & Monthly Contributions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 mt-6">
          {/* Extracted Keywords */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Extracted Keywords</h2>
            <KeywordsList keywords={data.keywords} />
          </div>

          {/* Monthly Contribution Chart */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Monthly Contributions
            </h2>
            <MonthlyContributionChart comments={data.comments} />
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6 mt-6 bg-gray-50 rounded-lg">
          <h1 className="text-xl font-semibold text-center mb-6">
            Comments with Data Masking
          </h1>

          {/* Toggle Show All Comments */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {showAllComments ? "Hide Comments" : "Show All Comments"}
            </button>
          </div>

          <ul className="space-y-4">
            {data.comments
              .slice(0, showAllComments ? data.comments.length : 5)
              .map((comment, index) => (
                <li
                  key={index}
                  className="p-4 bg-white border rounded-lg shadow"
                >
                  <CommentCard
                    comment={comment}
                    sentiment={data.sentiment.results[index]}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Insights;
