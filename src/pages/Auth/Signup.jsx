import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, distributorCreateAccount, factoryCreateAccount } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpState, setSignUpState] = useState({ 
    role: "", 
    cropTypes: [],
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    mobileNumber: "",
    aadhar: "",
    farmerId:"",
    gatNo:"",
    state:"",
    district:"",
    totalLandArea:"",
    factoryName:"",
    factoryAddress:"",
    factoryContactPerson:"",
    factoryContactNumber:"",
    factoryEmail:"",
    factoryPassword:"",
    factoryConfirmPassword:"",
    factoryRegNo:"",
    factoryGstNo:"",
    factoryTargetProduction:"",
    factoryPreviousProduction:"",
    storageCapacity:"",
    existingFarmers:"",
    factoryCropTypes: [],
    subsidySchemes:"",
    distributorName:"",
    distributorAddress:"",
    distributorContactPerson:"",
    distributorContactNo:"",
    distributorEmail:"",
    distributorPassword:"",
    distributorConfirmPassword:"",
    distributorRegNo:"",
    distributorGstNo:"",
    monthlyEthanolRequirement:"",
    licenses:"",
    existingFactories:"",
    productsRequiringEthanol:"",
    prefferedEthanolType:"",
    bankAccount: "",
    ifscCode: "",
  });

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

  function factoryHandleUserInput(e){
    const { name, value, checked } = e.target;
    if (name==="factoryCropTypes") {
      let factoryUpdatedCrops = [...signUpState.factoryCropTypes];

      if (checked) {
        factoryUpdatedCrops.push(value);
      } else {
        factoryUpdatedCrops=factoryUpdatedCrops.filter(crop => crop !== value)
      }
      setSignUpState({ ...signUpState, [name]: factoryUpdatedCrops });

    } else {
      setSignUpState({ ...signUpState, [name]: value });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(signUpState);
    let apiResponse=null;
    if (signUpState.role === "Farmer"){
      apiResponse = await dispatch(createAccount(signUpState));
    }
    else if(signUpState.role === "Factory"){
      apiResponse = await dispatch(factoryCreateAccount(signUpState));

    }
    else if(signUpState.role === "Distributor"){
      apiResponse = await dispatch(distributorCreateAccount(signUpState));

    }
    
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
<input type="text" name="bankAccount" placeholder="Bank Account Number"  id="bankAccount" value={signUpState.bankAccount} onChange={handleUserInput} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300"
  />
              <input type="text" name="ifsc" placeholder="ifsc" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="state" placeholder="State" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="district" placeholder="District" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="totalLandArea" placeholder="Total Land Area in Acres" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
            </>
          )}

{signUpState.role === "Factory" && (
            <>
              <input type="text" name="factoryName" placeholder="Factory Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryAddress" placeholder="Factory Address" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryContactPerson" placeholder="Contact Person Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="tel" name="factoryContactNumber" placeholder="Contact Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="email" name="factoryEmail" placeholder="Email ID" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="factoryPassword" placeholder="Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="password" name="factoryConfirmPassword" placeholder="Confirm Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryRegNo" placeholder="Factory Registration Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryGstNo" placeholder="GST Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryTargetProduction" placeholder="Target Production (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="factoryPreviousProduction" placeholder="Previous Year Production (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="storageCapacity" placeholder="Storage Capacity (in tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <input type="text" name="existingFarmers" placeholder="Number of Existing Farmers" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
              <div className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300">
                <label className="block mb-2 font-medium text-gray-700">Select Types of Crops Used</label>
                {['Sugarcane', 'Maize', 'Sorghum', 'Wheat', 'Barley', 'Corn', 'Banana Pseudo Stem'].map((crop) => (
                  <div key={crop} className="flex items-center gap-2">
                    <input type="checkbox" name="factoryCropTypes" value={crop} onChange={factoryHandleUserInput} checked={signUpState.factoryCropTypes.includes(crop)} />
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
    <input type="text" name="distributorContactPerson" placeholder="Contact Person Name" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="tel" name="distributorContactNumber" placeholder="Contact Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="email" name="distributorEmail" placeholder="Email ID" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="password" name="distributorPassword" placeholder="Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="password" name="distributorConfirmPassword" placeholder="Confirm Password" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="text" name="distributorRegNo" placeholder="Distributor Registration Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="text" name="distributorGstNo" placeholder="GST Number" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />

    <input type="text" name="monthlyEthanolRequirement" placeholder="Monthly Ethanol Requirement (in liters/tons)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="text" name="licenses" placeholder="Licenses & Compliance Approvals (Excise License, Pollution Control, etc.)" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />
    <input type="text" name="existingFactories" placeholder="Number of Existing Factories" required onChange={handleUserInput} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300" />

    {/* Multiple Choice: Products Requiring Ethanol */}
    <label className="block font-semibold mt-2">Products Requiring Ethanol</label>
    <div className="grid grid-cols-2 gap-2">
      {["Petroleum", "Pharmaceuticals", "Beverages", "Chemicals", "Cosmetics"].map((product) => (
        <label key={product} className="flex items-center">
          <input type="checkbox" name="productsRequiringEthanol" value={product} onChange={handleUserInput} className="mr-2" />
          {product}
        </label>
      ))}
    </div>


    {/* Multiple Choice: Preferred Ethanol Type */}
    <label className="block font-semibold mt-2">Preferred Ethanol Type</label>
    <div className="grid grid-cols-2 gap-2">
      {["Anhydrous", "Hydrous", "Bioethanol", "Synthetic Ethanol", "Denatured Ethanol", "Rectified Spirit", "Absolute Ethanol", "Fuel Ethanol"].map((type) => (
        <label key={type} className="flex items-center">
          <input type="checkbox" name="preferredEthanolType" value={type} onChange={handleUserInput} className="mr-2" />
          {type}
        </label>
      ))}
    </div>

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
