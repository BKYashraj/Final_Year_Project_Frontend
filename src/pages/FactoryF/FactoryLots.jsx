import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import { useSelector } from "react-redux";

function FactoryLots() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const factoryData = useSelector((state) => state.auth.data);
  const factoryId = factoryData?.id;

  const fetchLots = async () => {
    try {
      const response = await axiosInstance.get(`/factory/getLots/${factoryId}`);
      setLots(response.data.lots || []);
    } catch (error) {
      console.error("Error fetching lots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (factoryId) fetchLots();
  }, [factoryId]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ethanol Lots</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading lots...</p>
        ) : lots.length === 0 ? (
          <p className="text-center text-gray-500">No ethanol lots found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {lots.map((lot, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-xl shadow-sm border hover:shadow-lg transition duration-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Lot #{index + 1}</h2>
                <p><span className="font-medium">Quantity:</span> {lot.quantity} L</p>
                <p><span className="font-medium">Price/Liter:</span> ₹{lot.pricePerLiter}</p>
                <p><span className="font-medium">Production Date:</span> {new Date(lot.productionDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Location:</span> {lot.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FactoryLots;
