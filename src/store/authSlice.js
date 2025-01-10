import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/apis/axios.js';
import toast from 'react-hot-toast';



// Async thunk for checking authentication
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.get('/auth/check');
          return response.data;
     } catch (error) {
          return rejectWithValue(error.response?.data?.message || 'Failed to check authentication');
     }
});

// Async thunk for logging out
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post('/auth/logout');
          toast.success("Logout Successfully")
          return response.data;
     } catch (error) {
          return rejectWithValue(error.response?.data?.message || 'Failed to logout');
     }
});

// Auth slice
const authSlice = createSlice({
     name: 'auth',
     initialState: {
          authUser: null,
          isCheckingAuth: true,
          error: null,
     },
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(checkAuth.pending, (state) => {
                    state.isCheckingAuth = true;
               })
               .addCase(checkAuth.fulfilled, (state, action) => {
                    state.authUser = action.payload;
                    state.isCheckingAuth = false;
               })
               .addCase(checkAuth.rejected, (state, action) => {
                    state.authUser = null;
                    state.error = action.payload;
                    state.isCheckingAuth = false;
               })
               .addCase(logout.fulfilled, (state) => {
                    state.authUser = null;
                    state.isCheckingAuth = false;
               })
               .addCase(logout.rejected, (state, action) => {
                    state.error = action.payload;
               });
     },
});

export default authSlice.reducer;
