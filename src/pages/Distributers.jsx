import { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

const Distributers = () => {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.data);
  const distributorId = userData?.id;

  useEffect(() => {
    const fetchEthanolLots = async () => {
      setLoading(true);
      try {
        // Replace this with actual lots or mock from backend
        const response = await axiosInstance.get("/distributor/getAllEthanolLots");
        setFactories(response.data.data.lots || []);
      } catch (err) {
        console.error("Failed to fetch ethanol lots:", err);
        setError("Failed to load ethanol lots.");
      } finally {
        setLoading(false);
      }
    };

    fetchEthanolLots();
  }, []);

  const handlePayFactory = async (factoryId) => {
    setPaymentSuccess(false);
    setPaymentError(null);
    try {
      await axiosInstance.post("/distributor/payFactory", {
        distributorId,
        factoryId,
      });
      setPaymentSuccess(true);
    } catch (err) {
      console.error("Payment failed:", err);
      setPaymentError("Payment failed. Please try again.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {userData?.distributorName || "Distributor"}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Available Ethanol Lots
      </h3>

      {loading && <p className="text-blue-500">Loading lots...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {factories.length === 0 && !loading && (
        <p className="text-gray-600">No ethanol lots available at the moment.</p>
      )}
      {paymentSuccess && (
        <p className="text-green-600 mb-2">Payment successful!</p>
      )}
      {paymentError && (
        <p className="text-red-600 mb-2">{paymentError}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factories.map((lot) => (
          <div
            key={lot._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <p className="text-gray-800 font-semibold mb-2">
              <span className="font-bold">Factory Name:</span> {lot.factoryName}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Quantity:</span> {lot.quantity} liters
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Price per liter:</span> ₹{lot.pricePerLiter}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Total Price:</span> ₹{lot.quantity * lot.pricePerLiter}
            </p>
            <button
              onClick={() => handlePayFactory(lot.factoryId)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Factory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Distributers;
