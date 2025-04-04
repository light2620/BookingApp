import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String, // YYYY-MM-DD
  time: String, // HH:mm
  googleMeetLink: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const BookingModel = mongoose.model('Booking', bookingSchema);

export {BookingModel}
