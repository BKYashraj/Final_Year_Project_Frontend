import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Heroimage from "../assets/Home Page Images/Hero.png";
import ProjectIdea from "../assets/Home Page Images/blockchain.png";
import Nav from "./Nav";
import Footer from "./Footer"
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
      <Nav />
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
      <Footer></Footer>
    </div>
  );
};

export default Home;
