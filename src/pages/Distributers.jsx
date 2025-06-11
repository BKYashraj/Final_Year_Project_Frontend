import { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import image1 from "../assets/Home Page Images/profile.jpg"; // replace with actual image

const Distributors = () => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const userData = useSelector((state) => state.auth.data);
  const distributorId = userData?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEthanolLots = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/distributor/getAllEthanolLots");
        setLots(response.data.data.lots || []);
      } catch (err) {
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
      await axiosInstance.post("/distributor/payFactory", { distributorId, factoryId });
      setPaymentSuccess(true);
    } catch (err) {
      setPaymentError("Payment failed. Please try again.");
    }
  };

  const handleLogout = () => {
      dispatch(logout()); // Dispatch logout action
      window.location.href = "/"; // Redirect to login page
    };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
              <h1 className="text-2xl font-bold">Distributors Dashboard</h1>
              <div className="relative">
                <img
                  src={image1}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg p-2">
                    <p className="text-center font-semibold">Distributor</p>
                   <button
                className="w-full bg-red-600 text-white mt-2 py-1 rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
                  </div>
                )}
              </div>
            </header>

      {/* Ethanol Lots Section */}
      <section className="px-6 py-6">
        <h2 className="text-xl font-semibold mb-4">Available Ethanol Lots</h2>

        {loading && <p className="text-blue-600">Loading lots...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {paymentSuccess && <p className="text-green-600 mb-2">✅ Payment successful!</p>}
        {paymentError && <p className="text-red-600 mb-2">{paymentError}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.length > 0 ? (
            lots.map((lot) => (
              <div
                key={lot._id}
                className="bg-white p-4 rounded shadow border border-gray-200"
              >
                <h3 className="text-lg font-bold">{lot.factoryName}</h3>
                <p><span className="font-medium">Name of Factory:</span> {lot.name}</p>
                <p><span className="font-medium">Quantity:</span> {lot.quantity} liters</p>
                <p><span className="font-medium">Price/Liter:</span> ₹{lot.pricePerLiter}</p>
                <p><span className="font-medium">Total:</span> ₹{lot.quantity * lot.pricePerLiter}</p>
                <button
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  onClick={() => handlePayFactory(lot.factoryId)}
                >
                  Pay Factory
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-500">No ethanol lots available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Distributors;
