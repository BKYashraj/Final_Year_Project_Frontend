import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav=()=>{

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

    return(
        <header className={`fixed top-0 w-full transition-all duration-300 ${isSticky ? "bg-teal-300  py-2" : "bg-teal-300  py-3"}`}>

        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Ethanol Supply Chain</h1>
          <nav className="hidden md:flex space-x-4 font-semibold justify-between items-center text-xl">
          <Link to="/home" className="hover:text-gray-700">
              Home
            </Link>
          <Link to="/about" className="hover:text-gray-700">
              About
            </Link>
            <Link to="/features" className="hover:text-gray-700">
              Features
            </Link>
            <Link to="/contact" className="hover:text-gray-700">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
  
  <Link to="/auth/signin">
              <button className="px-4 py-2 text-lg text-black font-bold bg-orange-500 rounded-md shadow-lg hover:bg-yellow-700 ">
                Login
              </button>
            </Link>
            <Link to="/auth/signup">
            <button className="px-4 py-2 text-lg text-black font-bold bg-orange-500 rounded-md shadow-lg hover:bg-yellow-700 ">
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
       
      </header>
    );
};

export default Nav;