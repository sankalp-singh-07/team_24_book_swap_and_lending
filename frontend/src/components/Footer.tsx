import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaBookOpen,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 flex flex-col items-center space-y-4 text-center">
        
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium">
          <a href="/about" className="hover:text-pink-500 transition-colors">About</a>
          <a href="/contact" className="hover:text-pink-500 transition-colors">Contact Us</a>
          <a href="/terms" className="hover:text-pink-500 transition-colors">Terms & Conditions</a>
          <a href="/course" className="hover:text-pink-500 transition-colors">Books</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-pink-500 text-xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-pink-600 transition-transform duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-pink-600 transition-transform duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-pink-600 transition-transform duration-300"
          >
            <FaYoutube />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-pink-600 transition-transform duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:contact@bookswap.com"
            className="hover:scale-110 hover:text-pink-600 transition-transform duration-300"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Brand + Description
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-2 text-pink-500 text-2xl font-bold">
            <FaBookOpen />
            <span>BookSwap</span>
          </div>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md">
            Discover and share the joy of reading. A community built by book lovers, for book lovers.
          </p>
        </div> */}

        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
          © 2024 BookSwap — Created and maintained by{" "}
          <span className="text-pink-500 font-semibold">Trupti</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
