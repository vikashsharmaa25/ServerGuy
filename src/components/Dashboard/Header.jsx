import React, { useState } from "react";
import { FaSearch, FaCog } from "react-icons/fa";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Pass the search input to the parent component
  };

  return (
    <header className="bg-orange-500 p-2 flex items-center justify-between text-white">
      <div className="flex items-center space-x-2 max-w-[200px]">
        <div className="border border-white text-white font-light min-w-9 max-w-9 min-h-9 max-h-9 flex items-center justify-center text-3xl">
          H
        </div>
        <div className="text-black font-normal sm:block hidden">
          <h1 className="text-lg leading-tight whitespace-nowrap">Search</h1>
          <h1 className="text-lg leading-tight whitespace-nowrap">
            Hacker News
          </h1>
        </div>
      </div>

      <div className="flex items-center bg-white px-2 w-full max-w-4xl mx-4 relative">
        <FaSearch className="text-orange-400 text-lg mr-2 w-8" />
        <input
          type="text"
          placeholder="Search stories by title, URL, or author"
          value={searchInput}
          onChange={handleSearch}
          className="w-full bg-transparent py-1 text-gray-700 outline-none h-10"
        />
        <div className="sm:flex hidden space-x-2 items-center absolute right-4">
          <span className="text-sm hidden md:block text-gray-700">
            Search by
          </span>
          <img
            src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg"
            alt="Algolia"
            className="w-16"
          />
        </div>
      </div>
      <FaCog className="cursor-pointer text-gray-800 text-xl" />
    </header>
  );
};

export default Header;
