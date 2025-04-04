import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const fetchSlots = createAsyncThunk('slots/fetchSlots', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/slots`);
   
    response.data.sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison !== 0) return dateComparison;
  
      return a.time.localeCompare(b.time);
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching slots:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch slots');
  }
});

const initialState = {
  availableSlots: [], 
  groupedSlots: {},   
  status: 'idle', 
  error: null,
};


const groupSlotsByDate = (slots) => {
  return slots.reduce((acc, slot) => {
    const date = slot.date; 
    if (!acc[date]) {
      acc[date] = [];
    }
    
    if (!slot.isBooked) {
        acc[date].push({ time: slot.time, id: slot._id }); 
    }
    return acc;
  }, {});
};


const slotsSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableSlots = action.payload;
        state.groupedSlots = groupSlotsByDate(action.payload); 
        state.error = null;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong fetching slots';
      });
  },
});

export default slotsSlice.reducer;