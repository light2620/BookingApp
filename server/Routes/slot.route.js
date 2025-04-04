
import {Router} from "express"
import { getAvailableSlots, populateSlots } from "../Controller/slotController.js";

const slotRoute = Router();


slotRoute.post("/populate",populateSlots)
slotRoute.get("/",getAvailableSlots);

export {slotRoute};