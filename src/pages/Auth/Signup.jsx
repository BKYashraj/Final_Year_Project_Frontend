import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpState, setSignUpState] = useState({ role: "", cropTypes: [] });

  function handleUserInput(e) {
    const { name, value, checked } = e.target;
    if (name === "cropTypes") {
      let updatedCrops = [...signUpState.cropTypes];
      if (checked) {
        updatedCrops.push(value);
      } else {
        updatedCrops = updatedCrops.filter(crop => crop !== value);
      }
      setSignUpState({ ...signUpState, [name]: updatedCrops });
    } else {
      setSignUpState({ ...signUpState, [name]: value });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(signUpState);
    const apiResponse = await dispatch(createAccount(signUpState));
    if (apiResponse.payload.data.success) {
      navigate("/auth/signin");
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-900">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="role" className="block mb-2 font-medium text-gray-700">Role *</label>
            <select name="role" value={signUpState.role} onChange={handleUserInput} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300">
              <option value="">Select a role</option>
              <option value="Farmer">Farmer</option>
              <option value="Factory">Factory</option>
              <option value="Distributor">Distributor</option>
            </select>
          </div>

          {signUpState.role === "Farmer" && (
            <>
              <input type="text" name="name" placeholder="Full Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="address" placeholder="Address" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="tel" name="mobileNumber" placeholder="Mobile Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="email" name="email" placeholder="Email ID" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="password" placeholder="Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="aadhar" placeholder="Aadhar Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="farmerId" placeholder="Farmer ID (Krishi Card, etc.)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="gatNo" placeholder="Gat No (Land/Plot Number)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <div className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300">
                <label className="block mb-2 font-medium text-gray-700">Select Types of Crops Used</label>
                {['Sugarcane', 'Maize', 'Sorghum', 'Wheat', 'Barley', 'Corn', 'Banana Pseudo Stem'].map((crop) => (
                  <div key={crop} className="flex items-center gap-2">
                    <input type="checkbox" name="cropTypes" value={crop} onChange={handleUserInput} checked={signUpState.cropTypes.includes(crop)} />
                    <label>{crop}</label>
                  </div>
                ))}
              </div>
              <input type="text" name="state" placeholder="State" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="district" placeholder="District" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="totalLandArea" placeholder="Total Land Area in Acres" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
            </>
          )}

{signUpState.role === "Factory" && (
            <>
              <input type="text" name="factoryName" placeholder="Factory Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryAddress" placeholder="Factory Address" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="contactPerson" placeholder="Contact Person Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="tel" name="contactNumber" placeholder="Contact Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="email" name="email" placeholder="Email ID" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="password" placeholder="Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryRegNo" placeholder="Factory Registration Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="gstNo" placeholder="GST Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="targetProduction" placeholder="Target Production (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="previousProduction" placeholder="Previous Year Production (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="storageCapacity" placeholder="Storage Capacity (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="existingFarmers" placeholder="Number of Existing Farmers" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <div className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300">
                <label className="block mb-2 font-medium text-gray-700">Select Types of Crops Used</label>
                {['Sugarcane', 'Maize', 'Sorghum', 'Wheat', 'Barley', 'Corn', 'Banana Pseudo Stem'].map((crop) => (
                  <div key={crop} className="flex items-center gap-2">
                    <input type="checkbox" name="cropTypes" value={crop} onChange={handleUserInput} checked={signUpState.cropTypes.includes(crop)} />
                    <label>{crop}</label>
                  </div>
                ))}
              </div>
              <input type="text" name="subsidySchemes" placeholder="Subsidy or Incentive Schemes for Farmers" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
            </>
          )}


          {signUpState.role === "Distributor" && (
            <>
              <input type="text" name="distributorName" placeholder="Distributor Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="distributorAddress" placeholder="Distributor Address" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="contactPerson" placeholder="Contact Person Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="tel" name="contactNumber" placeholder="Contact Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="email" name="email" placeholder="Email ID" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="password" placeholder="Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="distributorRegNo" placeholder="Distributor Registration Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="gstNo" placeholder="GST Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="productsRequiringEthanol" placeholder="Products Requiring Ethanol (Petroleum, Pharmaceuticals, Beverages, Chemicals, etc.)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="monthlyEthanolRequirement" placeholder="Monthly Ethanol Requirement (in liters/tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="preferredEthanolType" placeholder="Preferred Ethanol Type (Anhydrous, Hydrous, Bioethanol, etc.)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="licenses" placeholder="Licenses & Compliance Approvals (Excise License, Pollution Control, etc.)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="existingFactories" placeholder="Number of Existing Factories" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
            </>
          )}

          <button type="submit" className="w-full px-6 py-3 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Create Account</button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">Already have an account? <Link to="/auth/signin" className="text-yellow-500">Login</Link></p>
      </div>
    </section>
  );
}

export default Signup;
