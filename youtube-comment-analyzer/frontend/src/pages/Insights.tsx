import React from "react";
import { useLocation } from "react-router-dom";
import SentimentStats from "../components/SentimentStats";
import KeywordsList from "../components/KeywordsList";
import { SentimentData } from "../types/index";

const Insights: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data as SentimentData | null;

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Insights</h1>
        <p className="text-center text-gray-400">
          No data available. Please analyze a video first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Insights</h1>

      <SentimentStats summary={data.sentiment.summary} />
      <KeywordsList keywords={data.keywords} />

      {/* Additional insights could be added here */}
    </div>
  );
};

export default Insights;
