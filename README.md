# 📅 Slot Booking App with Google Meet Integration

A modern appointment booking app where users can view available dates and time slots, select a preferred slot, enter their details, and receive a Google Meet link upon successful booking.

---

## 🚀 Live Demo

- **Frontend**: https://booking-app-v8st.vercel.app/
- **Backend**: https://booking-app-flame-seven.vercel.app/

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- Day.js

### Backend
- Node.js
- Express.js
- Google Meet API
- Nodemailer

---

## ✨ Features

- View available time slots by date
- Displays date with day (e.g. **Mon, 2025-04-04**)
- 15-minute slot intervals from 10 AM to 5 PM
- Slot availability updates dynamically
- Form for name and email input
- Sends confirmation email with Google Meet link
- Booking stored in the database
- Deployed on Vercel

---
## Api END Points
GET /slots
Returns all available slots from the database.

POST /booking
Books a selected slot with user details and sends a Google Meet invite.

POST /slots/populate
To populate Booking slots for next 30 days
