import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  },
});

 const sendMeetingEmail = async ({ to, meetLink, date, time }) => {
    const mailOptions = {
        from: `"Advisor Booking" <${process.env.EMAIL_USER}>`,
        to,
        subject: "✅ Your Appointment is Confirmed",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="background-color: #3B82F6; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Appointment Confirmed</h2>
              </div>
              <div style="padding: 30px;">
                <p style="font-size: 16px;">Hi there 👋,</p>
                <p style="font-size: 16px;">Your 15-minute appointment has been successfully booked.</p>
                <p style="font-size: 16px;"><strong>📅 Date:</strong> ${date}</p>
                <p style="font-size: 16px;"><strong>⏰ Time:</strong> ${time}</p>
                <p style="font-size: 16px;"><strong>🔗 Google Meet Link:</strong> 
                  <a href="${meetLink}" style="color: #3B82F6; text-decoration: underline;" target="_blank">${meetLink}</a>
                </p>
                <p style="font-size: 16px;">Please join a few minutes early to avoid any delays.</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #666;">If you have any questions, just reply to this email.</p>
                <p style="font-size: 14px; color: #999;">– Booking Team</p>
              </div>
            </div>
          </div>
        `,
      };

  await transporter.sendMail(mailOptions);
};



export {sendMeetingEmail}