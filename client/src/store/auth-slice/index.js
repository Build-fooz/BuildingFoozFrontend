import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  loading: false, 
  success: false, 
  error: null, 
  message:"",
};

//API requests
const BASE_URL = "http://localhost:5000/api/user";

// Thunk to sign up a new user
export const signUpUser = createAsyncThunk(
  "user/register",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/register`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

//log in
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      withCredentials: true,
    });
    console.log("Login response:", response.data);
    return response.data;
  }
);

// log out
export const logoutUser = createAsyncThunk(
  "user/logout",
  async () => {
    const response = await axios.post(`${BASE_URL}/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  }
);


//reset password
export const resetUserPassword = createAsyncThunk(
  'user/resetpassword/:token',
  async (formData, {token}) => {
      const response = await fetch(`/api/resetpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      return response.data;
    } 
);

//OTP
export const sendOtp = createAsyncThunk(
  'user/sendOtp',
  async (formData) => {
      const response = await axios.post(`${BASE_URL}/send-otp`, formData);
      return response.data;
    }
);

//authentication status
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; 

    if (!token) {
      return rejectWithValue("No token found. Skipping authentication check.");
    }

    const config = {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`${BASE_URL}/check-auth`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        return rejectWithValue("Unauthorized: Invalid or expired token");
      }
      throw error;
    }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error?.message || "signup failed.";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error?.message || "Login failed.";
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        
      })
      
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred.';
      })
    
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
