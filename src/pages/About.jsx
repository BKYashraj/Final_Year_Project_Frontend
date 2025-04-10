import React from "react";
import ProjectIdea from "../assets/Home Page Images/blockchain.png";
import Nav from "./Nav";
import Footer from "./Footer";
const About = () => {
    return (
        <section id="about">
            <Nav />
                <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-center mb-6">Projet Idea</h2>
                <div className="flex justify-center items-center p-6">
                    <img
                    src={ProjectIdea}
                    alt="Hackathon"
                    width={700}
                    height={700}
                    className="opacity-100"
                    />
                </div>

                <p className="text-center text-xl max-w-2xl mx-auto">
                    Our mission is to revolutionize the ethanol supply chain with
                    cutting-edge technology. We believe in creating a transparent and
                    efficient system that benefits producers, distributors, and the
                    environment alike.
                </p>
                </div>
                <Footer />
        </section>
            

    );};

export default About;
