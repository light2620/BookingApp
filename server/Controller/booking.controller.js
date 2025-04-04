import { slotModel } from '../Models/SlotModel.js';
import { BookingModel } from '../Models/BookingModel.js';
import { createGoogleMeet } from '../utils/googleMeetService.js';
import { sendMeetingEmail } from '../utils/sendMeetingDetails.js';
const bookSlot = async (req, res) => {
  const { name, email, date, time } = req.body;

  try {
    const slot = await slotModel.findOne({ date, time });
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: 'Slot unavailable' });
    }

    const meetLink = await createGoogleMeet(email, date, time);

    const booking = new BookingModel({ name, email, date, time, googleMeetLink: meetLink });
    await booking.save();

    slot.isBooked = true;
    await slot.save();
    await sendMeetingEmail({ to: email, meetLink, date, time });
    res.status(201).json({
      message: 'Appointment booked successfully',
      booking,
    });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



export {bookSlot}
