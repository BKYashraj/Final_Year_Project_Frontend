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
import image1 from "../assets/Home Page Images/image1.jpg";
import image2 from "../assets/Home Page Images/image2.jpg";
import image3 from "../assets/Home Page Images/image3.jpg";

const Home = () => {
  return (
    <div className="bg-teal-100 text-gray-900 mt-10">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center"
      style={{ 
      height: "700px",
      width:"100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "hsla(180, 3.50%, 45.10%, 0.50)", // Black overlay
      backgroundBlendMode: "lighten",
      marginTop: "auto" // Mix image with black
      }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="w-full h-[90vh]"
        >
          {[image1, image2, image3].map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-[90vh]">
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-[#FFDAB9] mb-4">
                  Optimizing Ethanol Supply Chain with Blockchain
                </h1>
                <TypeAnimation
                  sequence={[
                    "Secure Transactions ✅", 1500,
                    "Real-time Monitoring 📊", 1500,
                    "Trust & Transparency 🤝", 1500
                  ]}
                  wrapper="h2"
                  className="text-2xl text-[#FFFDD0] mb-6"
                  repeat={Infinity}
                />
                <p className="max-w-2xl text-lg text-white">
                  Empowering farmers and industries through decentralized, transparent, and efficient supply chain solutions.
                </p>
                <div className="mt-6 flex space-x-4">
                  <Link to="/" className="bg-teal-300 text-gray-800 px-6 py-3 rounded-md">
                    Explore More
                  </Link>
                  <Link to="/auth/signup" className="bg-teal-300 text-gray-800 px-6 py-3 rounded-md">
                    Join Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* Key Features */}
      {/* Key Features */}
<section className="py-16  bg-teal-100 text-center overflow-hidden">
<div className="container mx-auto px-4">
  <h2 className="text-3xl font-bold mb-6 text-[#5A4534]">Why Choose Our Solution?</h2>
  <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  pagination={{ clickable: true }} // Simple pagination
  autoplay={{ delay: 3000 }}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="w-full max-w-6xl mx-auto pb-10" // Padding bottom for pagination dots
>
  {[
    { title: "🔒 Secure Transactions", desc: "Tamper-proof blockchain records for every ethanol transaction." },
    { title: "📊 Real-Time Tracking", desc: "Monitor ethanol movement from farm to industry instantly." },
    { title: "🌿 Sustainable & Transparent", desc: "Enhancing trust and reducing inefficiencies." },
    { title: "⚡ Automated Smart Contracts", desc: "Ensures seamless and fraud-proof transactions." },
    { title: "📉 Cost Efficiency", desc: "Eliminating middlemen to maximize profits for farmers and industries." }
  ].map((feature, index) => (
    <SwiperSlide key={index} className="flex items-center justify-center text-[#5A4534]">
      <motion.div className="p-6 bg-teal-50 rounded-lg shadow-md h-[200px] flex flex-col justify-center w-full"
        whileHover={{ scale: 1.05 }}>
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-center">{feature.desc}</p>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

</div>

</section>
<style>
{`
  .swiper-pagination {
    position: relative !important;
    margin-top: 16px !important;
  }
  .swiper-wrapper {
    display: flex !important;
  }
`}
</style>

      
      {/* How It Works */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#5A4534]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            "Farmers record ethanol production on blockchain.",
            "Smart contracts enable automated, secure transactions.",
            "Industries receive verified ethanol supply seamlessly."
          ].map((step, index) => (
            <motion.div key={index} className="p-6 bg-teal-100 rounded-lg" whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-semibold mb-2 text-[#5A4534]">Step {index + 1}</h3>
              <p className="text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Testimonials & Impact */}
      <section className="py-16 bg-teal-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#5A4534]">Success Stories</h2>
        <Swiper modules={[Navigation, Pagination, Autoplay]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} className="w-full max-w-3xl mx-auto">
          {["Using blockchain, we have improved efficiency by 40%!", "Transparency has eliminated fraud in ethanol supply.", "Farmers now receive fair pricing instantly."].map((testimonial, index) => (
            <SwiperSlide key={index} className="p-6 bg-teal-50 rounded-lg shadow-md">
              <p className="text-gray-700">“{testimonial}”</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* Call-to-Action */}
      <section className="bg-teal-300 py-12 text-[#5A4534] text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Blockchain Revolution in Ethanol Supply</h2>
        <p className="text-lg mb-6">Start your journey today and experience a decentralized, transparent ethanol ecosystem.</p>
        <Link to="/auth/signup" className="bg-white text-[#5A4534] px-6 py-3 rounded-md hover:bg-gray-200">Get Started Now</Link>
      </section>
      
      <Footer />
    </div>
  );
};
{/* <h1 class="text-5xl font-bold text-[#FFDAB9] mb-4">Optimizing Ethanol Supply Chain with Blockchain</h1> */}
export default Home;
