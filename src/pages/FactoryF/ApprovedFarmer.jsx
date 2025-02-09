import axiosInstance from '../../Helper/axiosInstance';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard';


function ApprovedFarmer() {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const factoryData = useSelector((state) => state.auth.data);
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
  
  return (
    <div className="p-4">
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
            <ProductCard farmer={farmer} factory={factoryData}/>
            {/* <button 
                onClick={() => approveFactoryForFarmer(farmer._id, factoryId)} 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Accept Request
            </button> */}
            </div>
        ))}

        
        <>
       

        </>
</div>
    </div>
  )
}

export default ApprovedFarmer
