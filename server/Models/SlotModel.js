import mongoose from "mongoose"

const slotSchema = new mongoose.Schema({
    date: {
      type: String, 
      required: true,
    },
    time: {
      type: String, 
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    day: {
      type: String,
      required: true, 
    }
  });


  const slotModel = mongoose.model("slot",slotSchema);

  export {slotModel};