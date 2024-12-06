import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { useSearchParams } from "react-router-dom";

const NewsList = ({ news }) => {
  const [searchBy, setSearchBy] = useState("title");
  const [sortBy, setSortBy] = useState("popularity");
  const [timeFilter, setTimeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync page number from URL search params
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // Update URL when page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  };

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
    .filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (sourceFilter !== "all" && item.source !== sourceFilter) {
        return false;
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

        <div className="flex items-center gap-2">
          <label htmlFor="categoryFilter" className="font-normal text-xs">
            Category
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-1 py-[2px] text-sm"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sourceFilter" className="font-normal text-xs">
            Source
          </label>
          <select
            id="sourceFilter"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-1 py-[2px] text-sm"
          >
            <option value="all">All Sources</option>
            <option value="bbc">BBC</option>
            <option value="cnn">CNN</option>
            <option value="techcrunch">TechCrunch</option>
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

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-7 h-6 rounded border ${
              currentPage === index + 1
                ? "text-orange-500 border border-orange-500"
                : "border-gray-400 text-gray-800"
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
