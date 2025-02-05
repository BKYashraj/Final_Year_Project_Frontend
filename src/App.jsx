import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Farmer from "./pages/Farmer";
import Factory from "./pages/Factory";
import Distributers from "./pages/Distributers";
import FactoryMenu from "./pages/FactoryF/FactoryMenu";

export default function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/factory/factoryMenu" element={<FactoryMenu />} />
          <Route path="/distributer" element={<Distributers />} />
      </Routes>
    </>
  )
}