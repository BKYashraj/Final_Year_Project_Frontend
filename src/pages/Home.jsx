import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Heroimage from "../assets/Home Page Images/Hero.png";
import ProjectIdea from "../assets/Home Page Images/blockchain.png";
// import security from "../assets/Home Page Images/security.png";
// import decentralization from "../assets/Home Page Images/decentralization.png";
// import transparency from "../assets/Home Page Images/transparency.png";
const Home = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar */}
      <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        isSticky
          ? "bg-green-700 shadow-md py-2"
          : "bg-green-600 shadow-lg py-3"
      }`}
    >
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Ethanol Supply Chain</h1>
          <nav className="hidden md:flex space-x-4 font-semibold justify-between items-center text-xl">
          <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/features" className="hover:text-gray-200">
              Features
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/auth/signin">
              <button className="px-4 py-2 text-lg text-white font-bold bg-gradient-to-r from-green-500 to-blue-500 rounded-md shadow-lg hover:from-blue-500 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300">
                Login
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="px-4 py-2 text-lg text-white font-bold bg-gradient-to-r from-green-500 to-blue-500 rounded-md shadow-lg hover:from-blue-500 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300">
                Register
              </button>
            </Link>
          </div>
          <button className="md:hidden text-white" id="menu-toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* <div
          className="md:hidden bg-green-600 text-white text-lg font-semibold"
          id="mobile-menu"
          style={{ display: "none" }}
        >
          <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
          <Link to="/features" className="hover:text-gray-200">
            Features
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Features
          </Link>
        </div> */}
      </header>

      {/* Hero Section */}
      <section className="bg-green-100 text-gray-800">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-12">
          <div className="lg:w-1/2 space-y-10 text-center  lg:text-left">
            <h2 className="text-2xl font-bold mb-4">
              Transforming the Ethanol Supply Chain
            </h2>
            <p className="pb-8 text-lg">
              Streamlining the journey of ethanol from production to
              distribution with blockchain technology. Reliable, transparent,
              and efficient solutions for a sustainable future.
            </p>
            <a
              href="#features"
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition text-lg"
            >
              Explore Features
            </a>
          </div>
          <div className="lg:w-1/2 pb-6 pl-10">
            <img
              src={Heroimage}
              alt="Hackathon"
              width={600}
              height={600}
              className=" opacity-100 md:opacity-100"
            />
          </div>
        </div>
      </section>

      

      

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-center mb-6">Get in Touch</h2>
          <form className="max-w-2xl mx-auto space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md shadow-md hover:bg-green-700 transition text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-3 text-center text-sm">
        <p>&copy; 2025 Ethanol Supply Chain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
