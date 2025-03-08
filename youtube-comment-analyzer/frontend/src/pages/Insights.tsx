import React from "react";
import { useLocation } from "react-router-dom";
import SentimentDistribution from "../components/SentimentDistribution";
import CommentStatistics from "../components/CommentStatistics";
import KeywordsList from "../components/KeywordsList";
import CommentCard from "../components/CommentCard";
import { SentimentData } from "../types/index";

const Insights: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data as SentimentData | null;
  console.log("Data received in Insights:", data);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full p-8  text-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Insights</h1>
          <p className="text-center text-gray-500">
            No data available. Please analyze a video first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b  py-10">
      <div className="max-w-5xl mx-auto p-8  text-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Insights</h1>

        {/* Sentiment Distribution */}
        {data.sentiment?.results && (
          <div className="mb-8 p-6  rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Sentiment Distribution
            </h2>
            <SentimentDistribution data={data.sentiment.results} />
          </div>
        )}

        {/* Comment Statistics */}
        {data.sentiment?.summary ? (
          <div className="mb-8 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Comment Statistics
            </h2>
            <CommentStatistics
              total={data.comments?.length || 0}
              sentiment={data.sentiment}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No sentiment data available.
          </p>
        )}

        {/* Keywords List */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Keywords</h2>
          <KeywordsList keywords={data.keywords} />
        </div>

        {/* Comments Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Comments & Sentiments
          </h2>
          <ul className="space-y-4">
            {data.comments.map((comment, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow">
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
