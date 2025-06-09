import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Farmer from "./pages/Farmer";
import Factory from "./pages/Factory";
import Distributers from "./pages/Distributers";
import FactoryMenu from "./pages/FactoryF/FactoryMenu";
import ApprovedFarmer from "./pages/FactoryF/ApprovedFarmer";
import ImagePredictor from "./pages/FarmerRelated/ImagePredictor";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import FactoryLots from "./pages/FactoryF/FactoryLots";
import AddLotForm from "./pages/FactoryF/AddLotForm";
// import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/factory" element={<FactoryMenu />} />
          <Route path="/distributer" element={<Distributers />} />
          <Route path="/approvedFactories" element={<ApprovedFarmer />} />

          <Route path="/image_detection" element={<ImagePredictor />} />
          <Route path="/factory/lots" element={<FactoryLots />} />
           <Route path="/factory/add-lot" element={<AddLotForm />} />

      </Routes>
    </>
  )
}

