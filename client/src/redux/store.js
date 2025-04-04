
import { configureStore } from '@reduxjs/toolkit';
import slotsReducer from './slotSlice';
import bookingReducer from "./bookingSlice"
export const store = configureStore({
  reducer: {
    slots: slotsReducer, 
    booking : bookingReducer
  },
});