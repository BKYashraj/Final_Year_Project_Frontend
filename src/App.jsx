import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Farmer from "./pages/Farmer";
import Factory from "./pages/Factory";

export default function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/factory" element={<Factory />} />
      </Routes>
    </>
  )
}