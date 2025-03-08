import React from "react";

interface KeywordsListProps {
  keywords: string[];
}

const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-200 rounded-md text-sm"
            >
              {keyword}
            </span>
          ))
        ) : (
          <p className="text-gray-400">No keywords extracted</p>
        )}
      </div>
    </div>
  );
};

export default KeywordsList;
