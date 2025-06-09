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
    <div>

      

      <header className="bg-teal-300 text-white py-3 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        {/* Logo */}
        <h1 className="text-xl font-bold text-[#5A4534]">Factory</h1>
      
        {/* Profile Dropdown */}
        <div className="relative">
          <img
            src={image1} // Default profile pic
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />



          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg p-2">
              <p className="text-center font-semibold">{"Factory"}</p>
              <button
                className="w-full bg-red-600 text-white mt-2 py-1 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
{/* <button
          type="button"
                  onClick={approvedfarmers}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Approved Farmers
                </button> */}
      



      <h1 className="text-2xl font-bold mb-4">Farmer Requests </h1>

      {/*farmer request*/ }

       <h1>Factory Dashboard</h1>

      <button onClick={() => navigate('/factory/lots')}>
        View Ethanol Lots
      </button>

     <button
  onClick={() => navigate('/factory/add-lot', { state: { factoryId } })}
>
  Add New Ethanol Lot
</button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-6">
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

      {/*div containing both */}
      <div className="flex h-screen bg-gray-100 p-4 space-x-4">
        {/*previous orders*/ }
        <div className="w-1/4 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Previous Orders</h2>
          <div>
            {previousOrders.map((order) => (
              <div
                key={order.id}
                className="border-b p-3 text-sm flex flex-col"
              >
                <span className="font-bold">{order.id}</span>
                <span>{order.date}</span>
                <span
                  className={
                    order.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>


        <div className=" p-4">
                 <h1 className="text-2xl font-bold mb-4">Approved Farmer Details</h1>
        
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Approwedfarmers.map((farmer) => (
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

        

      </div>
    </div>
  );
}

export default FactoryMenu;