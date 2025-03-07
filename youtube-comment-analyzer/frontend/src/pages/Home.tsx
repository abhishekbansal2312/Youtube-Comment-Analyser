import React, { useState } from "react";
import { fetchComments } from "../services/commentService";
import CommentCard from "../components/CommentCard";

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchComments(videoId);
      setComments(data);
    } catch (err) {
      setError("Failed to fetch comments. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-black mb-4">
        YouTube Comment Analyzer
      </h1>
      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        className="p-2 border rounded-lg mb-4"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button
        className="bg-blue-500 text-black px-4 py-2 rounded-lg"
        onClick={handleFetchComments}
      >
        Fetch Comments
      </button>

      {loading && <p className="text-white mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 grid gap-4">
        {comments.map((comment, index) => (
          <CommentCard key={index} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Home;
