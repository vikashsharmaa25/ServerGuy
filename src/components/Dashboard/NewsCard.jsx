import React from "react";

const NewsCard = ({ title, author, url, points, num_comments, created_at }) => {
  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <div className="text-sm border-b border-gray-200">
      <div className="flex items-center gap-2 flex-wrap break-words">
        <h1 className="text-black font-semibold text-md">{title}</h1>
        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-normal text-sm"
        >
          {`( ${url} )` || "No Title Available"}
        </a>
      </div>
      <div className="text-gray-500 text-xs">
        {points} points | {author || "Unknown Author"} | {formattedDate} |{" "}
        {num_comments} comments
      </div>
    </div>
  );
};

export default NewsCard;
