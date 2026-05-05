import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiEndpoints } from "../api/apiEnpoints";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

function Course() {
  const [book, setBook] = useState([]);
  const [filters, setFilters] = useState({ query: "", location: "", type: "" });

  const getBook = async () => {
    try {
      const hasFilters = filters.query || filters.location || filters.type;
      const url = hasFilters
        ? apiEndpoints.SEARCH_BOOKS(filters.query, filters.location, filters.type)
        : apiEndpoints.GET_BOOKS;
      const res = await axios.get(url);
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getBook();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-4xl font-semibold">
          Discover books people nearby are ready to share
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Search by title, author, genre, location, or availability. Send a borrow or swap request and track the handoff from your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <input
            name="query"
            value={filters.query}
            onChange={handleChange}
            className="input input-bordered bg-white dark:bg-slate-800"
            placeholder="Title, author, genre"
          />
          <input
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="input input-bordered bg-white dark:bg-slate-800"
            placeholder="Location"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="select select-bordered bg-white dark:bg-slate-800"
          >
            <option value="">All types</option>
            <option value="lend">Lend</option>
            <option value="swap">Swap</option>
            <option value="donate">Donate</option>
          </select>
          <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-0" type="submit">
            Search
          </button>
        </form>

        <Link to="/">
          <button className="mt-6 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors duration-300 mx-auto">
            <FaArrowLeft /> Back to Home
          </button>
        </Link>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {book.length > 0 ? (
          book.map((item) => <Cards key={item.id || item._id} item={item} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mt-12">
            <FaBookOpen className="text-5xl mb-3 text-emerald-500" />
            <p className="text-lg">No books available at the moment.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Course;
