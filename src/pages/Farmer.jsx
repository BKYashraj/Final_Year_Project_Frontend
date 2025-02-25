import { useEffect, useState } from "react";
import abi from "../contractJson/FarmerToFactory.json";
// import { ethers } from 'ethers';
import { ethers } from "ethers";
import toast from "react-hot-toast";
import ReceiptGenerator from "./ReceiptGenerator";
// import FactoryMenu from "./FactoryF/FactoryMenu";
import FactoryAcceptedFarmerMenu from "./FarmerRelated/FactoryAcceptedFarmerMenu";
import axiosInstance from "../Helper/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import image1 from "../assets/Home Page Images/profile.jpg";

const FactoryList = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");
  const [transactionHash, setTransactionHash] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Track visibility of the popup
  const [factories, setFactories] = useState([]);
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

  useEffect(() => {
    getApprovedFactories();
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



  const previousOrders = [
    { id: "#1234", date: "2025-02-25", status: "Completed" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
    { id: "#1235", date: "2025-02-24", status: "Pending" },
  ];



  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-teal-300 text-white py-3 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
  {/* Logo */}
  <h1 className="text-xl font-bold text-[#5A4534]">Farmers</h1>

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
        <p className="text-center font-semibold">{farmerData.name || "Farmer"}</p>
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
        

    {/* Left Sidebar - Previous Orders */}
    <div className="flex h-screen bg-gray-100 p-4 space-x-4">
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
      {/* <FactoryAcceptedFarmerMenu /> */}

      {/* Factory List */}
      <main className="container mx-auto px-4 w-1/2 p-6">
        

        <h1 className="text-xl mb-4 font-bold text-[#5A4534]">
          Request From Factories
        </h1>
        <div className="flex flex-col gap-4">
        {factories.map((factory) => (
          <div key={factory._id} className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold text-[#5A4534] uppercase">{factory.factoryName}</h2>
            <p className="text-[#8B6F56] mt-2"><strong>Address:</strong> {factory.factoryAddress}</p>
            <p className="text-[#8B6F56]"><strong>Contact Person:</strong> {factory.contactPersonName}</p>
            <p className="text-[#8B6F56]"><strong>GST Number:</strong> {factory.gstNumber}</p>
            <p className="text-[#8B6F56]"><strong>Types of Crops Used:</strong> {factory.typesOfCropsUsed.join(', ')}</p>
            <p className="text-[#8B6F56]"><strong>Subsidy or Incentive Schemes:</strong> {factory.subsidyOrIncentiveSchemes}</p>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              onClick={() => openModal(factory)}
            >
              Send Proposal
            </button>
          </div>
        ))}
        </div>
        
      </main>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-128 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl z-60"
            >
              &times;
            </button>

            <ReceiptGenerator
              transactionHash={transactionHash}
              provider={state.provider}
            />
          </div>
        </div>
      )}

      {/* Render ReceiptGenerator here */}
      {transactionHash && (
        <ReceiptGenerator transactionHash={transactionHash} provider={state.provider} />
      )}

      {/* Modal */}
      {isModalOpen && selectedFactory && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              Send Proposal to {selectedFactory.name}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Quantity to Supply (tons)
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter quantity (e.g., 200)"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="deliveryDate"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={a} // Call the a function when the button is clicked
                >
                  Submit Proposal
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
