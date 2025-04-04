import {Router} from "express"
import { bookSlot } from "../Controller/booking.controller.js";

const bookingRoute = Router();


bookingRoute.post("/",bookSlot);
export {bookingRoute}