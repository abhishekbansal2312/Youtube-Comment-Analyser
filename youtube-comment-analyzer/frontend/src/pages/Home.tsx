import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useFetchComments } from "../hooks/useFetchComments";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, videoId, setVideoId, fetchComments } =
    useFetchComments();
  const [inputUrl, setInputUrl] = useState("");

  // Extract video ID from a full YouTube URL
  const extractVideoId = (url: string) => {
    const match =
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([\w-]+)/);
    console.log(match, " match");

    return match ? match[1] : url; // If a match is found, return video ID; otherwise, return input
  };

  // Handle input change and extract video ID
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    setVideoId(extractVideoId(e.target.value));
  };

  // Redirect to insights once data is available
  useEffect(() => {
    if (data) {
      navigate("/insights", { state: { data } });
    }
  }, [data, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
      <div className="max-w-3xl w-full bg-white text-gray-900 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          YouTube Sentiment Analysis 🎥
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Enter a YouTube video URL or ID to analyze its comments.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Paste YouTube video URL or ID..."
            value={inputUrl}
            onChange={handleInputChange}
            className="flex-grow px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={() => fetchComments()}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Analyze
          </Button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Fetching comments...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!data && !loading && !error && (
          <p className="text-center text-gray-500">
            Enter a video ID or URL to begin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
