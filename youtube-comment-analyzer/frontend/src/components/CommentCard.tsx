import React from "react";

interface CommentProps {
  author: string;
  text: string;
  publishedAt: string;
}

const CommentCard: React.FC<CommentProps> = ({ author, text, publishedAt }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold">{author}</h3>
      <p>{text}</p>
      <span className="text-sm text-gray-400">{publishedAt}</span>
    </div>
  );
};

export default CommentCard;
