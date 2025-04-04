import { slotModel } from "../Models/SlotModel.js";
import { generateSlots } from "../utils/generateSlots.js";

const populateSlots = async (req, res) => {
  try {
    const slots = generateSlots();
    const existing = await slotModel.find({});
    if (existing.length > 0) return res.status(400).json({ message: 'Slots already exist' });

    await slotModel.insertMany(slots);
    res.status(201).json({ message: 'Slots generated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate slots' });
  }
};

const getAvailableSlots = async (req, res) => {
  try {

    const slots = await slotModel.find({isBooked: false });

    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching slots' });
  }
};

export { populateSlots, getAvailableSlots};
