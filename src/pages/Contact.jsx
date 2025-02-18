import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
const Contact = () => {
    return (
        <section id="contact">
          <Nav />
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
        <Footer />
      </section>
    );};

export default Contact;
