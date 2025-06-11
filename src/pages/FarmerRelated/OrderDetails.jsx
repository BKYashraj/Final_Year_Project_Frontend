import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const OrderTransparency = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);

  const { farmerId, factoryId, transactionHash, status, amount } = state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (farmerId && factoryId) {
        try {
          const response = await axiosInstance.post("/transparency", {
            farmerId,
            factoryId,
          });
          setData(response.data);
        } catch (error) {
          console.error("❌ Fetch error:", error);
        }
      }
    };
    fetchData();
  }, [farmerId, factoryId]);

  if (!state) return <p className="text-center mt-10 text-red-600">❌ No data passed</p>;
  if (!data) return <p className="text-center mt-10">Loading transparency data...</p>;

  return (
    <div>
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wide">🌿 Farmer Dashboard</h1>
    
      </header>
    
    <div className="min-h-screen flex flex-col pt-10 items-center bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700 underline decoration-green-400 underline-offset-8">
        🔍 Ethanol Supply Chain Transparency
      </h2>

      <div className="flex items-center space-x-6 overflow-x-auto p-4">
        {/* Farmer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-w-[300px] bg-gradient-to-b from-green-200 to-white border-l-4 border-green-600 p-5 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-3">👨‍🌾 Farmer</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Name:</span> {data.farmer?.fullName || "N/A"}</p>
            <p><span className="font-semibold">Mobile:</span> {data.farmer?.mobileNumber || "N/A"}</p>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
          <ArrowRight size={42} className="text-green-600" />
        </motion.div>

        {/* Factory */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="min-w-[200px] bg-gradient-to-b from-yellow-200 to-white border-l-4 border-yellow-600 p-5 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-yellow-800 mb-3">🏭 Factory</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Name:</span> {data.factory?.factoryName || "N/A"}</p>
            <p><span className="font-semibold">Contact:</span> {data.factory?.contactNumber || "N/A"}</p>
            <p className="break-words">
              <span className="font-semibold">Tx Hash (Factory ➡️ Farmer):</span>
              <span className="text-gray-700 break-all"> {transactionHash || "N/A"}</span>
            </p>
            <p><span className="font-semibold">Status:</span> {status || "N/A"}</p>
            <p><span className="font-semibold">Amount:</span> ₹{amount || "N/A"}</p>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
          <ArrowRight size={42} className="text-green-600" />
        </motion.div>

        {/* Distributor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="min-w-[300px] bg-gradient-to-b from-blue-200 to-white border-l-4 border-blue-600 p-5 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-3">🏪 Distributor</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Name:</span> {data.distributor?.distributorName || "N/A"}</p>
            <p><span className="font-semibold">Contact:</span> {data.distributor?.contactNumber || "N/A"}</p>
            <p><span className="font-semibold">Email:</span> {data.distributor?.email || "N/A"}</p>
            <p className="break-words">
              <span className="font-semibold">Tx Hash (Distributor ➡️ Factory):</span>
              <span className="text-gray-700"> {data.tx?.transactionHash || "N/A"}</span>
            </p>
            <p><span className="font-semibold">Block No:</span> {data.tx?.blockNo || "N/A"}</p>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default OrderTransparency;
