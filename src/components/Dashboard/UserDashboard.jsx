import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import Error from "./Error";
import NewsCard from "./NewsCard";

const UserDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 50;
  const MAX_PAGE_BUTTONS = 5;

  const fetchNews = async (query, page, type, sortBy, timeRange) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://hn.algolia.com/api/v1/search", {
        params: {
          query: query || "",
          page: page - 1,
          tags: type || "story",
          numericFilters: timeRange || "",
          hitsPerPage: itemsPerPage,
        },
      });
      setNews(response.data.hits || []);
      setTotalPages(response.data.nbPages || 1);
    } catch {
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const type = searchParams.get("type") || "";
    const timeRange = searchParams.get("timeRange") || "";

    const numericFilters =
      timeRange === "last24"
        ? `created_at_i>${Math.floor(Date.now() / 1000) - 86400}`
        : timeRange === "pastWeek"
        ? `created_at_i>${Math.floor(Date.now() / 1000) - 604800}`
        : timeRange === "pastMonth"
        ? `created_at_i>${Math.floor(Date.now() / 1000) - 2592000}`
        : timeRange === "pastYear"
        ? `created_at_i>${Math.floor(Date.now() / 1000) - 31536000}`
        : "";

    fetchNews(query, page, type, "", numericFilters);
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - MAX_PAGE_BUTTONS + 1);
    }

    const pageButtons = [];

    if (startPage > 1) {
      pageButtons.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="w-7 h-6 rounded border border-gray-400 text-gray-800"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <span key="start-ellipsis" className="mx-1">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-7 h-6 rounded border ${
            currentPage === i
              ? "text-orange-500 border-orange-500"
              : "border-gray-400 text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="end-ellipsis" className="mx-1">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="w-7 h-6 rounded border border-gray-400 text-gray-800"
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="min-h-screen bg-[#F6F6EF] max-w-[1280px] mx-auto">
      <Header
        onSearch={(searchTerm) => handleFilterChange("query", searchTerm)}
      />
      <div className="p-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : (
          <>
            <div className="flex items-center gap-4 ml-4 mb-4">
              <div className="flex items-center gap-1">
                <label htmlFor="type" className="block text-sm mb-1">
                  Type
                </label>
                <select
                  id="type"
                  className="border p-1 rounded"
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  value={searchParams.get("type") || ""}
                >
                  <option value="">All</option>
                  <option value="story">Stories</option>
                  <option value="comment">Comments</option>
                  <option value="ask_hn">Ask HN</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <label htmlFor="timeRange" className="block text-sm mb-1">
                  Time Range
                </label>
                <select
                  id="timeRange"
                  className="border p-1 rounded"
                  onChange={(e) =>
                    handleFilterChange("timeRange", e.target.value)
                  }
                  value={searchParams.get("timeRange") || ""}
                >
                  <option value="">All Time</option>
                  <option value="last24">Last 24 Hours</option>
                  <option value="pastWeek">Past Week</option>
                  <option value="pastMonth">Past Month</option>
                  <option value="pastYear">Past Year</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              {news.length ? (
                news.map((item) => (
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
              {renderPagination()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
