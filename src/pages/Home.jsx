import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { TypeAnimation } from "react-type-animation";
import Nav from "./Nav";
import Footer from "./Footer";

const bannerImages = [
  "https://images.pexels.com/photos/16019822/pexels-photo-16019822/free-photo-of-man-carrying-plants-on-a-back-of-a-bicycle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://plus.unsplash.com/premium_photo-1664299124175-e2c793325bfa?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682144397847-f5c82df5476a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
  "https://www.petrolpumpdealerchayan.in/petrol-2023/assets/images/homebanner.jpg"
];

const Home = () => {
  return (
    <div className="bg-[#e6fff5] text-gray-900" id="top">
      <Nav />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="w-full h-screen"
        >
          {bannerImages.map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-screen">
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-green-900 bg-opacity-50 flex flex-col justify-center items-center px-4">
                <h1 className="text-5xl font-extrabold text-white mb-4">
                  Ethanol Supply Chain Reinvented
                </h1>
                <TypeAnimation
                  sequence={[
                    "Empowering Sustainability 🌱", 1500,
                    "Securing Transactions 🔐", 1500,
                    "Driving Trust & Transparency 🤝", 1500
                  ]}
                  wrapper="h2"
                  className="text-2xl text-green-100 mb-6"
                  repeat={Infinity}
                />
                <p className="max-w-3xl text-lg text-white">
                  Integrating blockchain technology for greener, smarter, and more secure ethanol logistics from field to fuel.
                </p>
                <div className="mt-6 flex space-x-4">
                  {/* Removed Learn More button as per your request */}
                  <Link to="/auth/signup" className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100">
                    Get Started
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#e6fff5] text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-green-800">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Multi-Role Login",
                desc: "Dedicated registration and login for Farmers, Factories, and Distributors with secure authentication."
              },
              {
                title: "Role-Based Dashboards",
                desc: "Customized dashboards for stakeholders to view contracts, requests, and transactions."
              },
              {
                title: "Automated Smart Contracts",
                desc: "Smart contracts trigger actions when conditions are met, ensuring efficiency and reducing errors."
              },
              {
                title: "AI-Based Disease Detection",
                desc: "Farmers can upload crop images to detect diseases and receive preventive suggestions."
              },
              {
                title: "Blockchain Data Integrity",
                desc: "On-chain records ensure trust and transparency across the supply chain ecosystem."
              },
              {
                title: "Robust Security",
                desc: "Features strong encryption, authentication, and backup systems to protect sensitive data."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <h3 className="text-xl font-semibold text-green-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="working" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10 text-green-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            {
              title: "1. Decentralized Architecture",
              desc: "Stakeholders register using verifiable credentials on a secure blockchain to ensure transparency and prevent fraud."
            },
            {
              title: "2. Smart Registration",
              desc: "Farmers, factories, and distributors submit essential business and operational data stored in a decentralized system."
            },
            {
              title: "3. Automated Smart Contracts",
              desc: "Smart contracts handle agreements, enforce delivery terms, pricing, and automate validations without manual intervention."
            },
            {
              title: "4. Blockchain Payments",
              desc: "Instant and secure payments are processed via an integrated blockchain gateway, ensuring traceable and trustless transactions."
            },
            {
              title: "5. Hybrid Data Storage",
              desc: "Off-chain data is stored in MongoDB, while Ethereum and IPFS maintain tamper-proof contract metadata and digital records."
            },
            {
              title: "6. End-to-End Workflow",
              desc: "From registration to delivery and payment, the system ensures seamless traceability and optimizes operational efficiency."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 bg-[#e6fff5] rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="text-xl font-bold text-green-800 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10 text-green-900">Technologies</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-left">
          {[
            {
              title: "Frontend",
              descs: [
                "<strong>React.js</strong> for dynamic stakeholder interfaces.",
                "Responsive, role-based dashboards.",
                "User-friendly navigation for all devices."
              ],
              bgColor: "#e6fff5"
            },
            {
              title: "Backend",
              descs: [
                "<strong>Node.js + Express</strong> for APIs and user management.",
                "<strong>MongoDB</strong> for storing contracts and transactions.",
                "Handles authentication and real-time data flow."
              ],
              bgColor: "#f0fff4"
            },
            {
              title: "AI & Blockchain",
              descs: [
                "AI model for crop disease detection from images.",
                "<strong>Blockchain</strong> to log contracts and ensure transparency.",
                "Smart contracts for auto-verifiable transactions."
              ],
              bgColor: "#e6fff5"
            }
          ].map(({ title, descs, bgColor }, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl shadow-md"
              style={{ backgroundColor: bgColor }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-green-800">{title}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2" dangerouslySetInnerHTML={{ __html: descs.map(d => `<li>${d}</li>`).join("") }} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
