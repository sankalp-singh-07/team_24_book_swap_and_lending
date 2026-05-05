import React from "react";
import banner from "../../src/assets/Banner.png";
import { FaArrowRight, FaBell, FaBookOpen, FaExchangeAlt } from "react-icons/fa";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold">
            Share shelves, borrow locally, and keep every handoff clear.
          </h1>
          <p className="text-sm md:text-xl">
            BookSwap helps readers list books, discover nearby copies, request borrow or swap exchanges, and track approvals, due dates, returns, and notifications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <span className="inline-flex items-center gap-2"><FaBookOpen className="text-emerald-600" /> Catalog and search</span>
            <span className="inline-flex items-center gap-2"><FaExchangeAlt className="text-emerald-600" /> Borrow or swap</span>
            <span className="inline-flex items-center gap-2"><FaBell className="text-emerald-600" /> Live status alerts</span>
          </div>
          <a
            href="/course"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded shadow-md transition-all duration-300"
          >
            Browse Books <FaArrowRight className="text-sm" />
          </a>
        </div>
      </div>
      <div className="order-1 w-full mt-20 md:w-1/2">
        <img
          src={banner}
          className="md:w-[550px] md:h-[460px] md:ml-12 object-contain"
          alt="Readers sharing books"
        />
      </div>
    </div>
  );
}

export default Banner;
