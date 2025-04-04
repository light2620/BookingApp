
import { google } from 'googleapis';
import dotenv from "dotenv"
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createGoogleMeet = async (email, date, time) => {
  const startDateTime = `${date}T${time}:00`;
  const endDateTime = new Date(new Date(startDateTime).getTime() + 15 * 60000).toISOString();

  const event = {
    summary: 'Appointment with Advisor',
    description: '15-minute appointment via Google Meet',
    start: {
      dateTime: new Date(startDateTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'Asia/Kolkata',
    },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
};


export {createGoogleMeet}
