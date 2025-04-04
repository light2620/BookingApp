import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import { slotRoute } from "./Routes/slot.route.js";
import { bookingRoute } from "./Routes/booking.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

app.get("/",(req,res) => {
    res.json({
        message :"server runing"
    })
})

app.use("/slots",slotRoute)
app.use("/booking",bookingRoute)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection failed ", err));
