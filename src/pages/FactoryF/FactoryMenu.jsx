import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function FactoryMenu() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const factoryData = useSelector((state) => state.auth.data);
  const factoryId = factoryData.id;
  const getFarmers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/farmers/getFarmer");
      setFarmers(response.data.farmers);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFarmers();
  }, []);


  const approvedfarmers = (e) => {
    e.preventDefault();
    // alert(
    //   `Proposal Sent to ${selectedFactory.name}:\nQuantity: ${formData.quantity}\nDelivery Date: ${formData.deliveryDate}`
    // );
    // closeModal();
    navigate("/approvedFactories");
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

  return (
    <div className="p-4">

<button
          type="button"
                  onClick={approvedfarmers}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Approved Farmers
                </button>
      <h1 className="text-2xl font-bold mb-4">Farmer Details</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmers.map((farmer) => (
          <div key={farmer._id} className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">{farmer.firstName} {farmer.lastName}</h2>
            <p className="text-gray-600 mt-2"><strong>Mobile:</strong> {farmer.mobileNumber}</p>
            <p className="text-gray-600"><strong>Email:</strong> {farmer.email}</p>
            <p className="text-gray-600"><strong>Role:</strong> {farmer.role}</p>
            <p className="text-gray-600"><strong>Role:</strong> {farmer._id}</p>
            <p className="text-gray-600"><strong>Role:</strong> {factoryData.id}</p>
            <p>{farmer._id}</p>
            <button 
              onClick={() => approveFactoryForFarmer(farmer._id, factoryId)} 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Accept Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FactoryMenu;