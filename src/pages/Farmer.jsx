import { useEffect, useState } from "react";
import abi from "../contractJson/FarmerToFactory.json";
// import { ethers } from 'ethers';
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import ReceiptGenerator from "./ReceiptGenerator";
// import FactoryMenu from "./FactoryF/FactoryMenu";
// import FactoryAcceptedFarmerMenu from "./FarmerRelated/FactoryAcceptedFarmerMenu";
import axiosInstance from "../Helper/axiosInstance";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import image1 from "../assets/Home Page Images/profile.jpg";
// d04356f5ec4b4a5a508600807c69b792b9735629

// d04356f5ec4b4a5a508600807c69b792b9735629

const FactoryList = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const navigate = useNavigate();


  // const [account, setAccount] = useState("Not connected");
  const [transactionHash, setTransactionHash] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Track visibility of the popup
  const [factories, setFactories] = useState([]);
  const [prevOrders, setprevOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form state
  const [formData, setFormData] = useState({ quantity: "", deliveryDate: "" });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const setup = async () => {
      const contractAddress = "0xA2Fb97586Cb2996D2140Bc42f0D852b9D6533C6A";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // Handle account change
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create the contract instance
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.error("Error connecting to Ethereum:", error);
      }
    };

    setup();
  }, []);



  const a = async (event) => {
    event.preventDefault();
    const { contract } = state;

    if (!contract) {
      console.error("Contract not initialized");
      alert("Contract not initialized. Please connect your wallet.");
      return;
    }


    try {
      const factoryAddress = "0x2A6E75985EF4280fC823dcdb9cE7946Cb5A67e9c"; // Replace with actual address
      // 
      // 0xFAae2E0bE213629F62D352CFa2cbF1fa7Eab268e
      // const ton = {value:ethers.utils.parseEther("0.001")}
      // const amount = {value:ethers.utils.parseEther("0.001")}

      const ton = ethers.utils.parseEther("0.001"); // Direct BigNumber value
      const amount = ethers.utils.parseEther("0.001");

      console.log("Factory Address:", factoryAddress);
      console.log("Ton:", ton.toString());
      console.log("Amount:", amount.toString());

      const transaction = await contract.createTransaction(
        factoryAddress,
        ton, // Pass `ton` directly if expected as a BigNumber
        amount // Pass `value` as part of the overrides object
      );

      // Use toast.promise for waiting the transaction and showing appropriate messages
      await toast.promise(
        transaction.wait(), // Wait for the transaction to be mined
        {
          loading: "Hold back tight, we are processing your proposal...",
          success: "Proposal sent successfully to the Factory!",
          error: "Oops! Something went wrong. Please try again.",
        }
      );
      setTransactionHash(transaction.hash); // Store transaction hash
      setShowPopup(true);
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Failed to send proposal. Please try again.");
    }
  };
  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };



  const farmerData = useSelector((state) => state.auth.data);
  const farmerId = farmerData.id;
  // const farmerName = farmerData.name;

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

   const changeLabelApprovedFactories = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/farmers/farmerapprovefactory/${farmerId}`);
      
    } catch (error) {
      console.error("Error fetching approved factories:", error);
      setError("Failed to load approved factories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovedFactories();
    // preveousOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Open modal with selected factory
  const openModal = (factory) => {
    setSelectedFactory(factory);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ quantity: "", deliveryDate: "" });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    window.location.href = "/"; // Redirect to login page
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Proposal Sent to ${selectedFactory.name}:\nQuantity: ${formData.quantity}\nDelivery Date: ${formData.deliveryDate}`
    );
    closeModal();
  };


  const Image_detection= (e) => {
    e.preventDefault();
    // alert(
    //   `Proposal Sent to ${selectedFactory.name}:\nQuantity: ${formData.quantity}\nDelivery Date: ${formData.deliveryDate}`
    // );
    // closeModal();
    navigate("/image_detection");
  };



  // const previousOrders = [
  //   { id: "#1234", date: "2025-02-25", status: "Completed" },
  //   { id: "#1235", date: "2025-02-24", status: "Pending" },
  //   { id: "#1235", date: "2025-02-24", status: "Pending" },
  //   { id: "#1235", date: "2025-02-24", status: "Pending" },
  // ];

// const preveousOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(`/farmers/recentOrder/${farmerId}`);
//       console.log(response);
//       setprevOrders(response.data.transactions);
//     } catch (error) {
//       console.error("Error fetching approved factories:", error);
//       setError("Failed to load approved factories.");
//     } finally {
//       setLoading(false);
//     }
//   };


  return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-sans">
  {/* Header */}
  <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
    <h1 className="text-2xl font-bold tracking-wide">🌿 Farmer Dashboard</h1>

    <div className="flex items-center space-x-4">
      <button
        onClick={Image_detection}
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 shadow"
      >
       Disease Predictor
      </button>

      {/* Profile Dropdown */}
      <div className="relative">
        <img
          src={image1}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg p-4">
            <p className="font-semibold text-center mb-2">{farmerData.name || "Farmer"}</p>
            <button
              className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
              onClick={handleLogout}
            >
              🔒 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>

  {/* Main Layout */}
  <div className="flex p-4 gap-4">
    {/* Sidebar */}
    <aside className="w-2/6 bg-whiteprevOrders rounded-xl shadow p-4 space-y-6">
      {/* Previous Orders */}
     
        {/* <section>
  <h2 className="text-lg font-semibold mb-3">📦 Previous Orders</h2>
  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
  {prevOrders.map((order) => (
    <Link
      to="/order-details"
      state={{
        orderId: order.blockNo,
        farmerId: order.farmerId,
        factoryId: order.factoryId,
        transactionHash: order.transactionHash,
        status: order.status,
        amount: order.amount,
      }}
      key={order._id}
      className="block"
    >
      <div className="border-l-4 pl-3 border-green-600 bg-green-50 p-4 rounded-lg shadow-md hover:bg-green-100 transition-all duration-300">
        <div className="flex flex-col space-y-1 text-sm">
          <p className="font-semibold">
            #️⃣ <span className="text-gray-700">Order ID:</span>{" "}
            <span className="text-green-700">{order.blockNo}</span>
          </p>
          <p className="font-semibold">
            🏭 <span className="text-gray-700">Factory ID:</span>{" "}
            <span className="text-green-700">{order.factoryId}</span>
          </p>
          <p className="font-semibold">
            🔗 <span className="text-gray-700">Transaction Hash:</span>{" "}
            <span className="text-green-700 break-all">{order.transactionHash}</span>
          </p>
          <p className="font-semibold">
            💰 <span className="text-gray-700">Amount:</span> ₹
            <span className="text-green-700">{order.amount}</span>
          </p>
          <p className="font-semibold">
            📦 <span className="text-gray-700">Status:</span>{" "}
            <span className="text-green-700">{order.status}</span>
          </p>

 
          <button
            className="mt-2 self-start bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            🔍 View Transparency
          </button>
        </div>
      </div>
    </Link>
  ))}
</div>

</section> */}

      {/* Rewards */}
      {/* <section>
        <h2 className="text-lg font-semibold mb-3">🎖 Rewards & Certificates</h2>
        <button className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 w-full shadow">
          ⬇️ Download Certificate
        </button>
        <p className="text-sm text-gray-600 mt-1">⏳ Pending approval</p>
      </section> */}

      {/* Reports */}
      {/* <section>
        <h2 className="text-lg font-semibold mb-3">📊 Transparency Reports</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p>● Order History</p>
          <p>● Supply Chain Graph</p>
          <p>● Government Schemes</p>
        </div>
      </section> */}
    </aside>

    {/* Main Content */}
    <main className="flex-1">
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-6">🏭 Requests from Ethanol Factories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factories.map((factory) => (
            <div
              key={factory._id}
              className="bg-green-50 border border-green-200 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-800 uppercase">
                {factory.factoryName}
              </h3>
              <p className="text-gray-700 mt-2">📍 <strong>Address:</strong> {factory.factoryAddress}</p>
              <p className="text-gray-700">📞 <strong>Contact:</strong> {factory.contactPersonName}</p>
              <p className="text-gray-700">🧾 <strong>GST:</strong> {factory.gstNumber}</p>
              <p className="text-gray-700">🌾 <strong>Crops:</strong> {factory.typesOfCropsUsed.join(', ')}</p>
              <p className="text-gray-700">💸 <strong>Incentives:</strong> {factory.subsidyOrIncentiveSchemes}</p>
              <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={changeLabelApprovedFactories}
              >
                ➤ Send Proposal
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>

  {/* Receipt Modal */}
  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[32rem]">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-xl text-gray-700"
        >
          &times;
        </button>
        <ReceiptGenerator transactionHash={transactionHash} provider={state.provider} />
      </div>
    </div>
  )}

  {/* Proposal Modal */}
  {isModalOpen && selectedFactory && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">📤 Send Proposal to {selectedFactory.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">📦 Quantity to Supply (tons)</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">📅 Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              ❌ Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={a}
            >
              ✅ Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

// priya 

export default FactoryList;
