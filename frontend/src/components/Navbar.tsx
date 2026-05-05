import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { HiOutlineMoon } from "react-icons/hi";
import { FiMenu, FiSearch, FiSun } from "react-icons/fi";

function Navbar() {
  const [authUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const element = document.documentElement;
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme, element]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/course">Browse</Link></li>
      <li><Link to="/add-book">List Book</Link></li>
      <li><Link to="/account">Dashboard</Link></li>
      <li><Link to="/about">About</Link></li>
    </>
  );

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        sticky
          ? "shadow-md bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="navbar flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <div className="dropdown lg:hidden">
              <button tabIndex={0} role="button" className="btn btn-ghost p-2" aria-label="Open navigation">
                <FiMenu className="h-6 w-6" />
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 dark:bg-slate-700 rounded-box w-56 space-y-2"
              >
                {navItems}
                <form onSubmit={handleSearchSubmit} className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books"
                    className="input input-bordered w-full text-sm dark:bg-slate-900 dark:text-white"
                  />
                  <button type="submit" className="btn btn-sm bg-emerald-600 text-white border-0" aria-label="Search">
                    <FiSearch />
                  </button>
                </form>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="btn btn-outline btn-sm mt-3"
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </ul>
            </div>

            <Link to="/" className="text-2xl font-bold cursor-pointer">
              BookSwap
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base gap-2">{navItems}</ul>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit} className="flex items-center border rounded-md px-3 py-1.5 gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-40 md:w-56 dark:text-white"
                  placeholder="Search books"
                />
                <button type="submit" aria-label="Search">
                  <FiSearch className="w-4 h-4 opacity-70" />
                </button>
              </form>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <HiOutlineMoon />}
            </button>

            {authUser ? (
              <Logout />
            ) : (
              <button
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            )}
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
