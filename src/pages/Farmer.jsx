import { useState } from "react";

const FactoryList = () => {
  // Mock data for factories
  const [factories, setFactories] = useState([
    { id: 1, name: "Factory A", rawMaterial: "500 tons of sugarcane", price: "₹40/L" },
    { id: 2, name: "Factory B", rawMaterial: "300 tons of sugarcane", price: "₹38/L" },
    { id: 3, name: "Factory C", rawMaterial: "600 tons of sugarcane", price: "₹42/L" },
  ]);

  // Modal state
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ quantity: "", deliveryDate: "" });

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Proposal Sent to ${selectedFactory.name}:\nQuantity: ${formData.quantity}\nDelivery Date: ${formData.deliveryDate}`
    );
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Factories</h1>
        </div>
      </header>

      {/* Factory List */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {factories.map((factory) => (
            <div
              key={factory.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold mb-2">{factory.name}</h2>
              <p className="text-gray-700 mb-2">Raw Material: {factory.rawMaterial}</p>
              <p className="text-gray-700 mb-4">Current Price: {factory.price}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => openModal(factory)}
              >
                Send Proposal
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedFactory && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Send Proposal to {selectedFactory.name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="deliveryDate" className="block text-gray-700 font-medium mb-2">
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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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

export default FactoryList;
