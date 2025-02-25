import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === 'true' || false,
  role: localStorage.getItem("role") || "",
  data: (() => {
    const data = localStorage.getItem("data");
    try {
      return JSON.parse(data) || {};
    } catch {
      return {};
    }
  })(),
};

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data) => {
    try {
      const response = axiosInstance.post("/farmers", data);
      console.log("I am here")
      toast.promise(response, {
        loading: "Hold back tight, we are registering your id...",
        success: "Account created successfully",
        error: "Ohh No!, something went wrong. Please try again",
      });

      const apiResponse = await response;
      console.log("My response", apiResponse);
      return apiResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

export const factoryCreateAccount = createAsyncThunk(
  "auth/factoryCreateAccount",
  async (data) => {
    try {
      const response = axiosInstance.post("/factory", data);
      console.log("I am here")
      toast.promise(response, {
        loading: "Hold back tight, we are registering your id...",
        success: "Account created successfully",
        error: "Ohh No!, something went wrong. Please try again",
      });

      const apiResponse = await response;
      console.log("My response", apiResponse);
      return apiResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

export const distributorCreateAccount = createAsyncThunk(
  "auth/distributorCreateAccount",
  async (data) => {
    try {
      const response = axiosInstance.post("/distributor", data);
      console.log("I am here")
      toast.promise(response, {
        loading: "Hold back tight, we are registering your id...",
        success: "Account created successfully",
        error: "Ohh No!, something went wrong. Please try again",
      });

      const apiResponse = await response;
      console.log("My response", apiResponse);
      return apiResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data) => {
  console.log("incoming data to the thunk", data);
  try {
    const response = axiosInstance.post("/auth/login", data);

    toast.promise(response, {
      loading: "Logging in...",
      success: "Logged in successfully",
      error: "Ohh No!, something went wrong. Please try again",
    });

    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
});

export const logout = () => (dispatch) => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  localStorage.removeItem("data");

  dispatch(logoutSuccess());
  toast.success("Logged out successfully");
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // reducer which will execute when the login thunk is fulfilled
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.data?.userRole;
        state.data = action?.payload?.data?.data?.userData;
        
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.data?.userRole);
        localStorage.setItem(
          "data",
          JSON.stringify(action?.payload?.data?.data?.userData)
        );

      })
     
  },
});
export const { logoutSuccess } = AuthSlice.actions;
export default AuthSlice.reducer;
