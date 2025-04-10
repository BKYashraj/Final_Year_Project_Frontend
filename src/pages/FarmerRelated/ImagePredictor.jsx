import { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";

const classNames = ['Healthy', 'Mosaic', 'RedRot', 'Rust', 'Yellow'];

const remedies = {
  Healthy: "No disease detected. Keep up the good farming practices!",
  Mosaic: "Use disease-free planting material and control aphids with insecticides.",
  RedRot: "Remove and destroy infected plants. Use resistant varieties.",
  Rust: "Apply recommended fungicides and ensure proper field drainage.",
  Yellow: "Maintain soil health and apply suitable fungicides as advised."
};

const diseaseColors = {
  Healthy: "text-green-600",
  Mosaic: "text-orange-500",
  RedRot: "text-red-600",
  Rust: "text-yellow-500",
  Yellow: "text-blue-600"
};

function ImagePredictor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [remedy, setRemedy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post("/api/predict", formData);
      const { prediction, confidence } = res.data;

      // Extract disease class name
      const detectedDisease = classNames.find((cls) =>
        prediction.includes(cls)
      );

      setResult(detectedDisease || "Unknown");
      setConfidence(confidence ? (confidence * 100).toFixed(2) : null);
      setRemedy(remedies[detectedDisease] || "No remedy available.");
    } catch (err) {
      console.error("Prediction error:", err);
      setResult("Error processing the image");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Sugarcane Disease Detection 🌱
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
        >
          Predict
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
          <p className="text-gray-500 text-lg font-medium mb-2">Prediction Result:</p>
          <p className={`text-2xl font-bold ${diseaseColors[result] || "text-black"}`}>
            Disease: {result}
          </p>
          {confidence && (
            <p className="text-md text-gray-700 mt-2">
              Confidence Score: <span className="font-semibold">{confidence}%</span>
            </p>
          )}
          <div className="mt-3 text-sm text-gray-600 bg-green-50 p-3 rounded-md">
            <p className="font-semibold mb-1">Recommended Action:</p>
            <p>{remedy}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePredictor;
