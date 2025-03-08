import React from "react";
import Card from "./ui/Card";
import { Comment } from "../types/index";

interface CommentCardProps {
  comment: Comment;
  sentiment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, sentiment }) => {
  const sentimentColor =
    sentiment === "Agree"
      ? "text-green-400"
      : sentiment === "Disagree"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <Card>
      <p className="font-semibold text-blue-400">{comment.maskedUsername}</p>
      <p className="text-gray-300">{comment.text}</p>
      <p className={`mt-2 text-sm font-semibold ${sentimentColor}`}>
        {sentiment}
      </p>
    </Card>
  );
};

export default CommentCard;
