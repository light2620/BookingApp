import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/booking`, bookingData);
      return response.data; 
    } catch (error) {
      console.error("Error creating booking:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

const initialState = {
  bookingDetails: null, 
  status: 'idle', 
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {

    resetBookingState: (state) => {
      state.bookingDetails = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookingDetails = action.payload.booking; 
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong with the booking';
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;