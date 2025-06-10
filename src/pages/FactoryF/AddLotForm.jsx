import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import { useSelector } from "react-redux";

function AddLotForm() {
  const { state } = useLocation();
  const factoryId = state?.factoryId;

  const distributorData = useSelector((state) => state.auth.data);
  const distributorName = distributorData.name;

  const [formData, setFormData] = useState({
    quantity: "",
    pricePerLiter: "",
    productionDate: "",
    location: "",
    name: distributorName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!factoryId) {
      toast.error("Factory ID is missing.");
      return;
    }

    try {
      const response = await axiosInstance.post("/factory/addLot", {
        ...formData,
        factoryId,
      });

      if (response.data.success) {
        toast.success("Ethanol lot added!");
      } else {
        toast.error("Failed to add lot.");
      }
    } catch (error) {
      console.error("Error adding ethanol lot:", error);
      toast.error("Server error while adding lot.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Ethanol Lot
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity (Liters)</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Liter</label>
            <input
              type="number"
              name="pricePerLiter"
              value={formData.pricePerLiter}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price per liter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Production Date</label>
            <input
              type="date"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Add Lot
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLotForm;
