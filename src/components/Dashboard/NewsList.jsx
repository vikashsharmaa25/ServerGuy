import React, { useState } from "react";
import NewsCard from "./NewsCard";

const NewsList = ({ news }) => {
  const [searchBy, setSearchBy] = useState("title");
  const [sortBy, setSortBy] = useState("popularity");
  const [timeFilter, setTimeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredNews = news
    .filter((item) => {
      if (searchBy === "title") {
        return item.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (searchBy === "author") {
        return item.author?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "popularity") return b.points - a.points;
      if (sortBy === "comments") return b.num_comments - a.num_comments;
      return 0;
    })
    .filter((item) => {
      if (timeFilter === "last24h") {
        const oneDayAgo = new Date().getTime() - 24 * 60 * 60 * 1000;
        return new Date(item.created_at).getTime() > oneDayAgo;
      }
      return true; // "all" time filter
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="searchBy" className="font-normal text-xs">
            Search
          </label>
          <select
            id="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-1 py-[2px] text-sm"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="font-normal text-xs">
            By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-1 py-[2px] text-sm"
          >
            <option value="popularity">Popularity</option>
            <option value="comments">Comments</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="timeFilter" className="font-normal text-xs">
            For
          </label>
          <select
            id="timeFilter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-1 py-[2px] text-sm"
          >
            <option value="all">All Time</option>
            <option value="last24h">Last 24 Hours</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        {paginatedNews.length > 0 ? (
          paginatedNews.map((item) => (
            <NewsCard
              key={item.objectID}
              title={item.title}
              author={item.author}
              url={item.url}
              points={item.points}
              num_comments={item.num_comments}
              created_at={item.created_at}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No news found.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-7 h-6 rounded border ${
              currentPage === index + 1
                ? "text-orange-500 border border-orange-500"
                : "border-gray-400 borde text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
