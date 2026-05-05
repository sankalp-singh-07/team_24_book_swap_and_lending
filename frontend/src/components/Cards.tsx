import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";
import { FaBookOpen, FaExchangeAlt, FaHandHoldingHeart, FaMapMarkerAlt } from "react-icons/fa";

function Cards({ item }) {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const bookId = item.id || item._id;
  const ownerId = item.user;

  const handleRequest = async (type) => {
    if (!authUser) {
      toast.error("Log in to request this book.");
      return;
    }

    if (authUser._id === ownerId) {
      toast.error("This book is already in your library.");
      return;
    }

    try {
      const response = await axios.post(apiEndpoints.CREATE_REQUEST, {
        requesterId: authUser._id,
        bookId,
        requestType: type,
        message: `I would like to ${type} ${item.name}.`,
      });
      toast.success(response.data.message || "Request sent.");
      navigate("/account");
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request.");
    }
  };

  const handleAddToCart = async (type) => {
    if (!authUser) {
      toast.error("Log in to continue.");
      return;
    }

    try {
      await axios.post(apiEndpoints.ADD_TO_CART, {
        userId: authUser._id,
        bookId,
        type,
        price: item.price,
      });
      toast.success("Saved for later.");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error("Failed to save book.");
    }
  };

  const handleCardClick = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="my-5 flex justify-center">
      <article
        onClick={handleCardClick}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 cursor-pointer"
      >
        <figure className="overflow-hidden rounded-t-lg bg-slate-100">
          <img
            src={item.image || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"}
            alt={item.name}
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
          />
        </figure>

        <div className="p-5 space-y-3">
          <h2 className="flex justify-between gap-3 items-start font-semibold text-lg">
            <span className="flex items-center gap-2">
              <FaBookOpen className="text-emerald-600" /> {item.name}
            </span>
            <span className="bg-emerald-100 dark:bg-emerald-600/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-medium capitalize">
              {item.availabilityType || "lend"}
            </span>
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.author ? `by ${item.author}` : item.title}
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{item.genre || item.category || "General"}</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{item.condition || "Good"}</span>
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              <FaMapMarkerAlt /> {item.location || "Nearby"}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {item.description || item.title || "Available for the community."}
          </p>

          <div className="flex justify-between items-center pt-2">
            <div className="font-semibold text-emerald-600 capitalize">
              {item.status || "available"}
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRequest("borrow");
                }}
                className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
              >
                <FaHandHoldingHeart className="text-xs" /> Borrow
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.availabilityType === "swap" ? handleRequest("swap") : handleAddToCart("save");
                }}
                className="flex items-center gap-2 border border-emerald-600 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors duration-200"
              >
                <FaExchangeAlt className="text-xs" /> {item.availabilityType === "swap" ? "Swap" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Cards;
