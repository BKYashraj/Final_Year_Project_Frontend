import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Scroll offset for fixed navbar height (e.g. 64px)
      const yOffset = -64; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "bg-green-800 bg-opacity-90 backdrop-blur-md shadow-lg py-2"
          : "bg-green-700 py-4"
      }`}
      style={{ height: "64px" }} // Set fixed height for consistent offset
    >
      <div className="container mx-auto flex justify-between items-center px-6 h-full">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-extrabold tracking-wide cursor-pointer text-green-100 hover:text-green-200 transition-colors duration-200"
        >
          Ethanol Supply Chain
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 font-semibold items-center text-lg text-green-100">
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-green-300 transition-colors duration-200 cursor-pointer bg-transparent border-none"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("working")}
            className="hover:text-green-300 transition-colors duration-200 cursor-pointer bg-transparent border-none"
          >
            Working
          </button>
          <button
            onClick={() => scrollToSection("technologies")}
            className="hover:text-green-300 transition-colors duration-200 cursor-pointer bg-transparent border-none"
          >
            Technologies
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/auth/signin">
            <button className="px-5 py-2 text-lg font-bold text-green-900 bg-green-200 rounded-full shadow-md hover:bg-green-300 transition-colors duration-300">
              Login
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="px-5 py-2 text-lg font-bold text-green-900 bg-green-200 rounded-full shadow-md hover:bg-green-300 transition-colors duration-300">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-green-200" id="menu-toggle" aria-label="Toggle menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Nav;
