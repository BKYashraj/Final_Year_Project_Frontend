import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/Home Page Images/profile.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Slices/AuthSlice";
import ProductCard from '../../components/ProductCard';
import AddLotForm from './AddLotForm';
import FactoryLots from './FactoryLots';


function FactoryMenu() {
  const [farmers, setFarmers] = useState([]);
  const [Approwedfarmers, setApprowedfarmers] = useState([]);
  const [prevOrders, setprevOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const factoryData = useSelector((state) => state.auth.data);
  const factoryId = factoryData.id;





  const [error, setError] = useState(null);
  const factoryID = factoryData.id;


  const getApprovedFactories = async () => {
    console.log("hey useeffect")
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/factory/getApprovedFarmer/${factoryID}`);
      console.log(response);
      //   setFarmers(response.data.data.factories);
      setFarmers(response.data.data);
      console.log(farmers);
    } catch (error) {
      console.error("Error fetching approved factories:", error);
      setError("Failed to load approved factories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovedFactories();
  }, []);







  // Farmer Request 

  const getFarmers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/farmers/getFarmer");
      setFarmers(response.data.farmers);
      console.log("9999999999", response)
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);
  };



  // Approved Farmer Request 

  const getApprovedFarmers = async () => {
    setLoading(true);
    try {
      console.log("aaaaaaaaFcatory id", factoryId);
      const response2 = await axiosInstance.get(`/farmers/approvedFarmer/${factoryId}`);

      console.log("9999999999aaaaaaaaa", response2)
      setApprowedfarmers(response2.data.farmers2);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFarmers();
    getApprovedFarmers();
    preveousOrders();
  }, []);


  const approvedfarmers = (e) => {
    e.preventDefault();
    // alert(
    //   `Proposal Sent to ${selectedFactory.name}:\nQuantity: ${formData.quantity}\nDelivery Date: ${formData.deliveryDate}`
    // );
    // closeModal();
    navigate("/approvedFactories");
  };

  // const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    window.location.href = "/"; // Redirect to login page
  };


  const approveFactoryForFarmer = async (farmerId, factoryId) => {
    try {
      console.log(farmerId, factoryId);
      const response = await axiosInstance.post("/farmers/approve-factory", {
        farmerId,
        factoryId,
      });
      toast.success("Factory approved successfully!");

    } catch (error) {
      console.error(error);
    }
  };


  const preveousOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/factory/PreveousOrders/${factoryID}`);
      console.log("aaa212121", response);
      setprevOrders(response.data.transactions);
    } catch (error) {
      console.error("Error fetching approved factories:", error);
      setError("Failed to load approved factories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800"> 
  {/* ✅ Header */}
  <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
    <h1 className="text-2xl font-bold">🏭 <strong>Factory Dashboard</strong></h1>
    <div className="flex gap-4">
      <button
        onClick={() => navigate('/factory/lots')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        📦 <strong>View Ethanol Lots</strong>
      </button>
      <button
        onClick={() => navigate('/factory/add-lot', { state: { factoryId } })}
        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
      >
        ➕ <strong>Add New Ethanol Lot</strong>
      </button>
    </div>
    <div className="relative ml-4">
      <img
        src={image1}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg p-2">
          <p className="text-center font-semibold">🏭 <strong>Factory</strong></p>
          <button
            className="w-full bg-red-600 text-white mt-2 py-1 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            🔓 <strong>Logout</strong>
          </button>
        </div>
      )}
    </div>
  </header>

  {/* ✅ Farmer Requests */}
  <section className="px-6 py-6">
    <h2 className="text-xl font-bold mb-4">🧑‍🌾 <strong>Farmer Requests</strong></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmers.map((farmer) => (
        <div key={farmer._id} className="bg-white p-5 rounded-xl shadow-md border">
          <h3 className="text-lg font-bold">{farmer.firstName} {farmer.lastName}</h3>
          <p className="text-sm mt-1">📞 <strong>Mobile:</strong> {farmer.mobileNumber}</p>
          <p className="text-sm">📧 <strong>Email:</strong> {farmer.email}</p>
          <p className="text-sm">👤 <strong>Role:</strong> {farmer.role}</p>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => approveFactoryForFarmer(farmer._id, factoryId)}
          >
            ✅ <strong>Accept Request</strong>
          </button>
        </div>
      ))}
    </div>
  </section>

  {/* ✅ Main Content */}
  <div className="flex flex-col lg:flex-row gap-6 px-6 py-4">
    
    {/* 🔄 Previous Orders */}
    <section className="lg:w-[36%] bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">🧾 <strong>Previous Orders</strong></h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {prevOrders.map((order) => (
          <div
            key={order._id}
            className="border-l-4 pl-4 border-green-600 bg-green-50 p-3 rounded shadow-sm"
          >
            <p className="font-semibold">🆔 <strong>Order:</strong> {order._id}</p>
            <p className="text-sm">🏭 <strong>Factory:</strong> {order.factoryId}</p>
            <p className="text-sm">💳 <strong>Payment:</strong> {order.paymentId}</p>
            <p className="text-sm font-semibold">💰 <strong>Amount:</strong> ₹{order.amount}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ✅ Approved Farmers */}
    <div className="lg:w-[64%] bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-4">✅ <strong>Approved Farmer Details</strong></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Approwedfarmers.map((farmer) => (
          <div key={farmer._id} className="bg-gray-50 p-4 rounded shadow-sm border">
            <h3 className="text-lg font-bold">{farmer.firstName} {farmer.lastName}</h3>
            <p className="text-sm mt-1">📞 <strong>Mobile:</strong> {farmer.mobileNumber}</p>
            <p className="text-sm">📧 <strong>Email:</strong> {farmer.email}</p>
            <p className="text-sm">👤 <strong>Role:</strong> {farmer.role}</p>
            <div className="mt-2">
              <ProductCard farmer={farmer} factory={factoryData} amt={Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000}
/>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


  );
}

export default FactoryMenu;