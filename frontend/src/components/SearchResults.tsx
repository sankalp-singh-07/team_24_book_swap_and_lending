import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cards from "./Cards";
import { apiEndpoints } from "../api/apiEnpoints";

function SearchResults() {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(apiEndpoints.SEARCH_BOOKS(query));
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };
    if (query) {
      fetchBooks();
    }
  }, [query]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4" style={{ paddingTop: '10%' }}>
      <h1 className="font-semibold text-xl pb-2">Search Results for "{query}"</h1>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <Cards item={book} key={book.id || book._id} />
          ))}
        </div>
      ) : (
        <p>No books found for "{query}".</p>
      )}
    </div>
  );
}

export default SearchResults;
