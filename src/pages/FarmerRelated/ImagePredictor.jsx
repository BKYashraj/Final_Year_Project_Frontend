import { useState } from "react";
import axios from "axios";
import axiosInstance from '../../Helper/axiosInstance';

function ImagePredictor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
     const res = await axiosInstance.post("/api/predict",formData);
    //   const response = await axiosInstance.post("/farmers/approve-factory", {
    //          farmerId,
    //          factoryId,
    //        });
    // const res = await axios.post("http://localhost:5000/api/predict", formData);
    setResult(res.data.prediction);
  };

  return (
    <div>
      <h2>Upload Sugarcane Leaf Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Predict</button>
      </form>
      {result && <h3>Prediction: {result}</h3>}
    </div>
  );
}

export default ImagePredictor;
