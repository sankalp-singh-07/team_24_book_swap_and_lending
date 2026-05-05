import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";
import { useAuth } from "../context/AuthProvider";
import { FaExchangeAlt, FaHandHoldingHeart, FaMapMarkerAlt } from "react-icons/fa";

function BookDetails() {
  const { id } = useParams();
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(apiEndpoints.GET_BOOK_DETAILS(id));
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const sendRequest = async (requestType) => {
    if (!authUser) {
      toast.error("Log in to request this book.");
      return;
    }

    try {
      await axios.post(apiEndpoints.CREATE_REQUEST, {
        requesterId: authUser._id,
        bookId: book.id || book._id,
        requestType,
        message: `I would like to ${requestType} ${book.name}.`,
      });
      toast.success("Request sent.");
      navigate("/account");
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Could not send request.");
    }
  };

  if (loading) {
    return <div className="pt-28 text-center">Loading...</div>;
  }

  if (!book) {
    return <div className="pt-28 text-center">No book details available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 pt-28 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <img
          src={book.image || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"}
          alt={book.name}
          className="w-full max-h-[520px] object-cover rounded-lg shadow"
        />
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            {book.availabilityType || "lend"} · {book.status || "available"}
          </p>
          <h1 className="text-3xl font-bold mt-2">{book.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">by {book.author || "Unknown author"}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded">{book.genre || book.category || "General"}</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded">{book.condition || "Good"}</span>
          <span className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded">
            <FaMapMarkerAlt /> {book.location || "Nearby"}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          {book.description || book.title || "The owner has listed this book for the community. Send a request to start a borrow or swap conversation."}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => sendRequest("borrow")}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded"
          >
            <FaHandHoldingHeart /> Request to Borrow
          </button>
          <button
            onClick={() => sendRequest("swap")}
            className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-700 dark:text-emerald-300 px-5 py-3 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            <FaExchangeAlt /> Propose Swap
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
