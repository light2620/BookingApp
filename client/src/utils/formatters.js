import { format, parse, parseISO } from 'date-fns';

// Formats 'YYYY-MM-DD' to 'Mon, Jul 29'
export const formatDateDay = (dateString) => {
  try {
    const date = parseISO(dateString); // Handles 'YYYY-MM-DD'
    return format(date, 'EEE, MMM d');
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Fallback
  }
};

// Formats 'HH:mm' to 'h:mm a' (e.g., '14:30' to '2:30 PM')
export const formatTimeAmPm = (timeString) => {
    try {
        // Create a dummy date just to use the time part with date-fns parse
        const dummyDate = new Date();
        const parsedTime = parse(timeString, 'HH:mm', dummyDate);
        return format(parsedTime, 'h:mm a');
    } catch (error) {
        console.error("Error formatting time:", timeString, error);
        return timeString; // Fallback
    }
}


// Gets today's date as 'YYYY-MM-DD'
export const getTodayDateString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};