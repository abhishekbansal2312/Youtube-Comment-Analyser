import React from "react";
import Button from "../components/ui/Button";
import SentimentStats from "../components/SentimentStats";
import KeywordsList from "../components/KeywordsList";
import CommentCard from "../components/CommentCard";
import { useFetchComments } from "../hooks/useFetchComments";

const Home: React.FC = () => {
  const { data, loading, error, videoId, setVideoId, fetchComments } =
    useFetchComments();

  const handleAnalyze = () => {
    fetchComments();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">
        YouTube Comment Sentiment Analysis
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter YouTube Video ID..."
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="flex-grow p-3 rounded-md bg-gray-800 border border-gray-700 text-white outline-none"
        />
        <Button onClick={handleAnalyze}>Analyze</Button>
      </div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!data && !loading && !error && (
        <p className="text-center text-gray-400">
          Enter a video ID to analyze comments.
        </p>
      )}

      {data && (
        <div>
          <SentimentStats summary={data.sentiment.summary} />
          <KeywordsList keywords={data.keywords} />

          <h2 className="text-xl font-semibold text-center mb-4">
            Comments & Sentiments
          </h2>
          <ul className="space-y-4">
            {data.comments.map((comment, index) => (
              <li key={index}>
                <CommentCard
                  comment={comment}
                  sentiment={data.sentiment.results[index]}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
