import React from "react";
import img from "../assets/Home Page Images/footer.jpg";

const Footer = () => {
  return (
    <footer
      className="relative bg-gray-900 text-white py-10 px-6 animate-fadeIn"
    >
      <div
        className="absolute inset-0 bg-black opacity-25"
        style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      ></div>
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 animate-slideUp">
        {/* Logo and Description */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <p className="text-lg">
            Blockchain Integrated Ethanol Supply chain 
          </p>
        </div>

        {/* Services */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-teal-500 pb-2">Services</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-teal-400 transition">Transparency</a></li>
            <li><a href="/" className="hover:text-teal-400 transition">Security</a></li>
            <li><a href="/" className="hover:text-teal-400 transition">Sustainability</a></li>
            <li><a href="/" className="hover:text-teal-400 transition">Chain from Farmers to Distributers</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-teal-500 pb-2">Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-teal-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-teal-400 transition">About</a></li>
            <li><a href="/features" className="hover:text-teal-400 transition">Features</a></li>
            <li><a href="/contact" className="hover:text-teal-400 transition">Help</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-teal-500 pb-2">Contact</h3>
          <div className="mt-2 space-y-2">
            <p>Blockchain Integrated Ethanol Supplychain from Farmers to Distributers</p>
            <p>+91-9307338055</p>
            <p>Email: yashrajdesale1@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
