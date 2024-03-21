import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

// Simulate a static token for authentication
const STATIC_TOKEN = 'static-token';

export const login = createAsyncThunk('auth/login', async (params) => {
  // Simulate API call
  const response = await simulateLoginRequest(params);

  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return a static token
  return { token: STATIC_TOKEN, user: response.user };
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Clear the token
  localStorage.removeItem('token');
  localStorage.clear();

  // Return a static response
  return { user: null };
});


// Simulated login request function
const simulateLoginRequest = async (credentials) => {
  // Simulate a successful login
  return { user: { username: credentials.username } };
};




const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  token: null, // Add token to the initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token; // Store the token
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null; // Clear the token on logout
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

