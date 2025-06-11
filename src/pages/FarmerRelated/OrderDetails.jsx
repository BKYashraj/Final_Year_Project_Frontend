import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../Helper/axiosInstance'; // adjust path as needed

const OrderTransparency = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);

  const { farmerId, factoryId ,transactionHash ,status,amount} = state || {};
  

  useEffect(() => {
    const fetchData = async () => {
      if (farmerId && factoryId) {
        try {
          console.log("Sending POST with:", farmerId, factoryId);
          const response = await axiosInstance.post('/transparency', {
            farmerId,
            factoryId,
          });
          console.log("✅ FULL DATA:", response.data);
          setData(response.data);
        } catch (error) {
          console.error("❌ Fetch error:", error);
        }
      }
    };

    fetchData();
  }, [farmerId, factoryId]);

  if (!state) return <p>No data passed</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🔍 Transaction Transparency</h2>

      <div className="mb-4">
        <h3 className="font-semibold">👨‍🌾 Farmer</h3>
        <p><strong>Name:</strong> {data.farmer?.fullName || 'N/A'}</p>
        <p><strong>Mobile:</strong> {data.farmer?.mobileNumber || 'N/A'}</p>
      
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">🏭 Factory</h3>
        <p><strong>Name:</strong> {data.factory?.factoryName || 'N/A'}</p>
        <p><strong>Contact:</strong> {data.factory?.contactNumber || 'N/A'}</p>
          <p><strong>TransactionHash for factory to farmer Payment</strong> {transactionHash|| 'N/A'}</p>
        <p><strong>Payment Status</strong> {status|| 'N/A'}</p>
        <p><strong>Amount transfer to farmer</strong> {amount|| 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">🏪 Distributor</h3>
        <p><strong>Name:</strong> {data.distributor?.distributorName || 'N/A'}</p>
        <p><strong>Contact:</strong> {data.distributor?.contactNumber || 'N/A'}</p>
        <p><strong>Email:</strong> {data.distributor?.email || 'N/A'}</p>
        <p><strong>TransactionHash for Distributor to factory Payment</strong> {data.tx?.transactionHash || 'N/A'}</p>
        <p><strong>Block For Distributor to factory Paymen</strong> {data.tx?.blockNo || 'N/A'}</p>     
      </div>

       
    </div>
  );
};

export default OrderTransparency;
