import { useEffect, useState } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js"; 

const ReceiptGenerator = ({ transactionHash, provider }) => {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!transactionHash || !provider) return;

      try {
        setLoading(true);
        const txReceipt = await provider.getTransactionReceipt(transactionHash);
        if (txReceipt) {
          setReceipt(txReceipt);

          // Fetch transaction details for additional info
          const tx = await provider.getTransaction(transactionHash);
          setTransactionDetails(tx);
        }
      } catch (error) {
        console.error("Error fetching receipt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [transactionHash, provider]);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    // Title and spacing
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("Transaction Receipt", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Adding transaction details to the PDF
    doc.text(`Transaction Hash: ${receipt.transactionHash}`, 14, 30);
    doc.text(`Block Number: ${receipt.blockNumber}`, 14, 40);
    doc.text(`From (Farmer): ${receipt.from}`, 14, 50);
    doc.text(`To (Distributor): ${receipt.to}`, 14, 60);
    doc.text(`Ethanol Quantity (tons): 200`, 14, 70);
    doc.text(`Price per Ton (ETH): 40`, 14, 80);
    doc.text(`Total Payable Amount: 0.034 ETH`, 14, 90);
    doc.text(`Gas Used: ${receipt.gasUsed.toString()}`, 14, 100);
    doc.text(`Transaction Status: Confirmed`, 14, 110);
    doc.text(`Timestamp: 2024-02-03 14:30 UTC`, 14, 120);

    // Adding lines to improve PDF design
    doc.setLineWidth(0.5);
    doc.line(10, 125, 200, 125); // Horizontal line for separation

    doc.save("receipt.pdf");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-gradient-to-r from-blue-100 to-green-100 shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction Receipt</h2>

      {loading ? (
        <p className="text-gray-600">Loading receipt...</p>
      ) : receipt && transactionDetails ? (
        <div className="space-y-4">
          {/* Transaction Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Transaction Hash</p>
              <p className="font-semibold text-gray-900 break-all">
                {receipt.transactionHash}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Block Number</p>
              <p className="font-semibold text-gray-900">{receipt.blockNumber}</p>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">From (Farmer)</p>
              <p className="font-semibold text-gray-900 break-all">{receipt.from}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">To (Distributor)</p>
              <p className="font-semibold text-gray-900 break-all">{receipt.to}</p>
            </div>
          </div>

          {/* Ethanol Transaction Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Ethanol Quantity (tons)</p>
              <p className="font-semibold text-gray-900">200</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price per Ton (ETH)</p>
              <p className="font-semibold text-gray-900">40</p>
            </div>
          </div>

          {/* Final Price & Gas Used */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Total Payable Amount</p>
              <p className="font-semibold text-gray-900">0.034 ETH</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gas Used</p>
              <p className="font-semibold text-gray-900">{receipt.gasUsed.toString()}</p>
            </div>
          </div>

          {/* Status & Timestamp */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Transaction Status</p>
              <p className="font-semibold text-green-600">Confirmed</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Timestamp</p>
              <p className="font-semibold text-gray-900">2024-02-03 14:30 UTC</p>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadReceipt}
            className="mt-6 py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md hover:bg-gradient-to-r hover:from-blue-700 hover:to-green-700"
          >
            Download Receipt
          </button>
        </div>
      ) : (
        <p className="text-gray-600">No receipt available.</p>
      )}
    </div>
  );
};

export default ReceiptGenerator;
