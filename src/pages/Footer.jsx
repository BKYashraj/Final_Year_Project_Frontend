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
            Punyashlok Ahilyadevi Holkar Madhyamik Vidyalaya in Ankai, Maharashtra, offers exceptional education and holistic development for student success.
          </p>
        </div>

        {/* Services */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2">Services</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition">Tutoring</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Academic Support</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">Extracurricular Activities</a></li>
            <li><a href="/" className="hover:text-blue-400 transition">College and Career Readiness</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2">Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="/notice" className="hover:text-blue-400 transition">Notices</a></li>
            <li><a href="/achievement" className="hover:text-blue-400 transition">Achievements</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Help</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 transition-transform duration-500 hover:scale-105 animate-fadeIn">
          <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2">Contact</h3>
          <div className="mt-2 space-y-2">
            <p>Punyashlok Ahilyadevi Holkar Madhyamik Vidyalaya, Ankai, Maharashtra, 423104</p>
            <p>+91-8755856858</p>
            <p>Email: pahmvankai@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
