import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
