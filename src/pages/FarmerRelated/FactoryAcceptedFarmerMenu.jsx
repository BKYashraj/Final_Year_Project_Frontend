import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Helper/axiosInstance';
import { useSelector } from 'react-redux';

function FactoryAcceptedFarmerMenu() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const farmerData = useSelector((state) => state.auth.data);
  const farmerId = farmerData.id;

  const getApprovedFactories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/farmers/${farmerId}`);
      console.log(response);
      setFactories(response.data.data.factories);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Factories</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factories.map((factory) => (
          <div key={factory._id} className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">{factory.factoryName}</h2>
            <p className="text-gray-600 mt-2"><strong>Address:</strong> {factory.factoryAddress}</p>
            <p className="text-gray-600"><strong>Contact Person:</strong> {factory.contactPersonName}</p>
            <p className="text-gray-600"><strong>GST Number:</strong> {factory.gstNumber}</p>
            <p className="text-gray-600"><strong>Types of Crops Used:</strong> {factory.typesOfCropsUsed.join(', ')}</p>
            <p className="text-gray-600"><strong>Subsidy or Incentive Schemes:</strong> {factory.subsidyOrIncentiveSchemes}</p>
            <button
              onClick={() => handleMakeContract(factory._id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Make Contract
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FactoryAcceptedFarmerMenu;
