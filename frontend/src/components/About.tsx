import {
  FaLeaf,
  FaUsers,
  FaGlobe,
  FaSignInAlt,
  FaBook,
  FaExchangeAlt,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to <span className="text-pink-500">BookSwap !!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Discover, share, and exchange books effortlessly — join a community
          that celebrates reading and sustainability.
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-10 transition-all duration-300">
        {/* Why BookSwap */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-pink-500 flex items-center gap-2">
            {/* <FaLeaf className="text-pink-500" /> */}
            Why BookSwap?
          </h2>
          <ul className="list-none text-gray-700 dark:text-gray-300 space-y-3 text-lg leading-relaxed">
            <li className="flex items-start gap-2">
              <FaLeaf className="text-pink-500 mt-1" />
              <span>
                <strong>Sustainable:</strong> Extend the life of books and
                reduce waste.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaGlobe className="text-pink-500 mt-1" />
              <span>
                <strong>Inclusive:</strong> Discover titles across genres and
                languages.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaUsers className="text-pink-500 mt-1" />
              <span>
                <strong>Community:</strong> Connect with book lovers and
                exchange ideas.
              </span>
            </li>
          </ul>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-pink-500 flex items-center gap-2">
            {/* <FaBook className="text-pink-500" /> */}
            How It Works?
          </h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-3 text-lg leading-relaxed">
            <li className="flex items-start gap-2">
              <FaSignInAlt className="text-pink-500 mt-1" />
              <span>
                <strong>Sign Up:</strong> Create your profile and join the
                community.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaBook className="text-pink-500 mt-1" />
              <span>
                <strong>List Books:</strong> Add the books you’d like to swap.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaSearch className="text-pink-500 mt-1" />
              <span>
                <strong>Browse:</strong> Explore available books that catch your
                eye.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaExchangeAlt className="text-pink-500 mt-1" />
              <span>
                <strong>Exchange:</strong> Connect and swap to enjoy your new
                reads.
              </span>
            </li>
          </ol>
        </section>

        {/* Join Us */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-pink-500">
            Join Us Today!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Begin your reading journey with BookSwap and be part of a growing
            global circle of book lovers.
          </p>
          {/* CTA Button */}
          <button>
            <a
              href="/Signup"
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Get Started <FaArrowRight className="text-sm" />
            </a>
          </button>
          {/* <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md">
            Get Started
          </button> */}
        </section>
      </div>
    </div>
  );
};

export default About;
