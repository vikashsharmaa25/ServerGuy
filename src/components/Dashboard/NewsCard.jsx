import React from "react";

const NewsCard = ({ title, author, url, points, num_comments, created_at }) => {
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString()
    : "N/A";

  const safeTitle = title || "No Title Available";
  const safeAuthor = author || "Unknown Author";
  const safePoints = points !== undefined ? points : 0;
  const safeComments = num_comments !== undefined ? num_comments : 0;
  const safeUrl = url || "#";

  return (
    <div className="text-sm border-b border-gray-200 px-4">
      <div className="flex items-center gap-2 flex-wrap break-words">
        <h1 className="text-black font-semibold text-md">{safeTitle}</h1>
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-normal text-sm"
        >
          {safeUrl !== "#" ? `( ${safeUrl} )` : "No URL Provided"}
        </a>
      </div>

      <div className="text-gray-500 text-xs mt-1">
        {safePoints} points | {safeAuthor} | {formattedDate} | {safeComments}{" "}
        comments
      </div>
    </div>
  );
};

export default NewsCard;
