import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { resetBookingState } from '../redux/bookingSlice';
import { formatDateDay, formatTimeAmPm } from '../utils/formatters';

const ThankYouPage = () => {
  const dispatch = useDispatch();
  const { bookingDetails, status } = useSelector((state) => state.booking);


  if (status !== 'succeeded' || !bookingDetails) {
    return <Navigate to="/" replace />;
  }

  const handleGoBack = () => {

      dispatch(resetBookingState());
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-xl text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> Your appointment has been booked.</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Thank You, {bookingDetails.name}!</h1>
        <p className="text-lg mb-2 text-gray-600">Your booking details:</p>
        <ul className="list-none p-0 mb-4 text-gray-700">
            <li className="mb-1"><strong>Date:</strong> {formatDateDay(bookingDetails.date)}</li>
            <li className="mb-1"><strong>Time:</strong> {formatTimeAmPm(bookingDetails.time)}</li>
            <li className="mb-1"><strong>Email:</strong> {bookingDetails.email}</li>
            {bookingDetails.googleMeetLink && (
                <li className="mt-2">
                    <strong>Meeting Link:</strong>
                    <a
                        href={bookingDetails.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline ml-1 break-all"
                    >
                        {bookingDetails.googleMeetLink}
                    </a>
                </li>
            )}
        </ul>
         <p className="text-sm text-gray-500 mb-6">A confirmation email with the meeting details has been sent to {bookingDetails.email}.</p>

        <Link
          to="/"
          onClick={handleGoBack}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-150 ease-in-out"
        >
          Book Another Appointment
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;