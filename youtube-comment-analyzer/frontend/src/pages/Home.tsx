import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
// import SentimentStats from "../components/SentimentStats";
// import KeywordsList from "../components/KeywordsList";
// import CommentCard from "../components/CommentCard";
import { useFetchComments } from "../hooks/useFetchComments";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, videoId, setVideoId, fetchComments } =
    useFetchComments();

  // Redirect to insights once data is available
  useEffect(() => {
    if (data) {
      navigate("/insights", { state: { data } });
    }
  }, [data, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        YouTube Sentiment Analysis
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Video ID..."
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="flex-grow px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={fetchComments}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Analyze
        </Button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Fetching comments...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!data && !loading && !error && (
        <p className="text-center text-gray-500">Enter a video ID to begin.</p>
      )}
    </div>
  );
};

export default Home;
