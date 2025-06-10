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
      console.log("9999999999",response)
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);
  };

  

// Approved Farmer Request 

  const getApprovedFarmers = async () => {
    setLoading(true);
    try {
      console.log("aaaaaaaaFcatory id",factoryId);
      const response2 = await axiosInstance.get(`/farmers/approvedFarmer/${factoryId}`);
      
      console.log("9999999999aaaaaaaaa",response2)
      setApprowedfarmers(response2.data.farmers2);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFarmers();
    getApprovedFarmers();
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

  
  const previousOrders = [
    { id: "#1234", date: "2025-02-25", status: "Completed" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold">Factory Dashboard</h1>
        <div className="relative">
          <img
            src={image1}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg p-2">
              <p className="text-center font-semibold">Factory</p>
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

      {/* Farmer Requests */}
      <section className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">Farmer Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {farmers.map((farmer) => (
            <div key={farmer._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{farmer.firstName} {farmer.lastName}</h3>
              <p>Mobile: {farmer.mobileNumber}</p>
              <p>Email: {farmer.email}</p>
              <p>Role: {farmer.role}</p>
              <button
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => approveFactoryForFarmer(farmer._id, factoryId)}
              >
                Accept Request
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 px-6 mt-4">
        <button
          onClick={() => navigate('/factory/lots')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Ethanol Lots
        </button>
        <button
          onClick={() => navigate('/factory/add-lot', { state: { factoryId } })}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add New Ethanol Lot
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6">
        {/* Previous Orders */}
        <div className="lg:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Previous Orders</h2>
          {previousOrders.map((order) => (
            <div key={order.id} className="border-b py-2">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p className={order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>
                {order.status}
              </p>
            </div>
          ))}
        </div>

        {/* Approved Farmers */}
        <div className="lg:w-2/3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Approved Farmer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Approwedfarmers.map((farmer) => (
              <div key={farmer._id} className="bg-gray-50 p-4 rounded shadow">
                <h3 className="text-lg font-bold">{farmer.firstName} {farmer.lastName}</h3>
                <p>Mobile: {farmer.mobileNumber}</p>
                <p>Email: {farmer.email}</p>
                <p>Role: {farmer.role}</p>
                <ProductCard farmer={farmer} factory={factoryData} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FactoryMenu;