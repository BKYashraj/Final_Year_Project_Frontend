import React from 'react';
import { useState } from "react";
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';

function FactoryMenu() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFarmer = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      const response = await axiosInstance.get("/farmers/getFarmer");
      console.log(response)

      console.log(response.data.farmers)
      setFarmers(response.data.farmers);

      console.log(farmers);
     
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
    setLoading(false);

  };


  return (
    <div className="p-4">
      <h1> hello </h1>
      <button className="btn btn-primary" onClick={getFarmer}>
                Get Farmer List
        </button>

        <button onClick={getFarmer} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Loading..." : "Show Farmers"}
      </button>

      {farmers.length > 0 && (
        <table className="mt-4 w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">First Name</th>
              <th className="border border-gray-400 p-2">Last Name</th>
              <th className="border border-gray-400 p-2">Mobile</th>
              <th className="border border-gray-400 p-2">Email</th>
              <th className="border border-gray-400 p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
            
              <tr key={farmer._id} className="text-center">
                <td className="border border-gray-400 p-2">{farmer.firstName}</td>
                <td className="border border-gray-400 p-2">{farmer.lastName}</td>
                <td className="border border-gray-400 p-2">{farmer.mobileNumber}</td>
                <td className="border border-gray-400 p-2">{farmer.email}</td>
                <td className="border border-gray-400 p-2">{farmer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}



    </div>


    
  )
}

export default FactoryMenu
