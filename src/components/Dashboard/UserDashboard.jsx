import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import NewsList from "./NewsList";
import Loading from "./Loading";
import Error from "./Error";

const UserDashboard = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      setNews(response.data.hits || []);
      setFilteredNews(response.data.hits || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch news. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = news.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowercasedTerm) ||
        item.author?.toLowerCase().includes(lowercasedTerm) ||
        item.url?.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredNews(filtered);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#F6F6EF] max-w-[1280px] mx-auto">
        <Header onSearch={handleSearch} />
        <div className="p-4">
          {loading ? (
            <Loading />
          ) : error ? (
            <Error message={error} />
          ) : (
            <NewsList news={filteredNews} />
          )}
        </div>
      </div>
      <div className="w-full text-center p-5">
        <h1 className="text-white font-sans">
          About • Setting • Help • API Documentation • Hacker News •
          Fork/Contribute • Cool Apps
        </h1>
      </div>
    </>
  );
};

export default UserDashboard;
