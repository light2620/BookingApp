import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/bookingSlice';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { formatTimeAmPm, formatDateDay } from '../utils/formatters';

const BookingForm = ({ selectedDate, selectedTime, onBookingSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const { status: bookingStatus, error: bookingError } = useSelector((state) => state.booking);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); 

    if (!name.trim() || !email.trim()) {
      setFormError('Name and Email are required.');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const bookingData = {
      name: name.trim(),
      email: email.trim(),
      date: selectedDate, // 'YYYY-MM-DD'
      time: selectedTime, // 'HH:mm'
    };

    dispatch(createBooking(bookingData))
      .unwrap() 
      .then(() => {
  
         if (onBookingSuccess) {
            onBookingSuccess();
         }
      })
      .catch((err) => {
      
        console.error("Booking failed from component:", err);
      });
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Confirm Your Booking</h2>
      <p className="mb-4 text-lg">
        You selected: <span className="font-medium">{formatDateDay(selectedDate)}</span> at <span className="font-medium">{formatTimeAmPm(selectedTime)}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={bookingStatus === 'loading'}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={bookingStatus === 'loading'}
          />
        </div>

        {formError && <ErrorMessage message={formError} />}
        {bookingStatus === 'failed' && bookingError && <ErrorMessage message={bookingError} />}

        {bookingStatus === 'loading' ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            disabled={bookingStatus === 'loading'}
          >
            Book Appointment
          </button>
        )}
      </form>
    </div>
  );
};

export default BookingForm;