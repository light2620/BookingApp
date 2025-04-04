import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchSlots } from '../redux/slotSlice';
import { resetBookingState } from '../redux/bookingSlice';
import TimeSlotButton from '../Components/TimeSlotButton'; 
import BookingForm from '../Components/BookingForm';
import LoadingSpinner from '../Components/LoadingSpinner';
import ErrorMessage from '../Components/ErrorMessage';
import { formatDateDay, getTodayDateString } from '../utils/formatters';

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { groupedSlots, status: slotsStatus, error: slotsError } = useSelector((state) => state.slots);
  const { status: bookingStatus } = useSelector((state) => state.booking);

  const [activeDate, setActiveDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);


  useEffect(() => {
    dispatch(fetchSlots());
    dispatch(resetBookingState());
    setSelectedTime(null);
  }, [dispatch]);

  useEffect(() => {
    if (slotsStatus === 'succeeded' && Object.keys(groupedSlots).length > 0 ) {
        const todayStr = getTodayDateString();
        const availableDates = Object.keys(groupedSlots); 

        
        let dateToSetActive = availableDates[0]; 
        if (groupedSlots[todayStr]) {
            dateToSetActive = todayStr; 
        }

        
        if (!activeDate || !groupedSlots[activeDate] || activeDate !== dateToSetActive) {
            
             if (groupedSlots[dateToSetActive]) {
                setActiveDate(dateToSetActive);
                 
                 if (activeDate !== dateToSetActive) {
                    setSelectedTime(null);
                 }
             } else if (availableDates.length > 0 && groupedSlots[availableDates[0]]) {
                 
                 setActiveDate(availableDates[0]);
                 setSelectedTime(null);
             } else {
              
                 setActiveDate(null);
                 setSelectedTime(null);
             }
        }

    } else if (slotsStatus === 'succeeded' && Object.keys(groupedSlots).length === 0) {
      
      setActiveDate(null);
      setSelectedTime(null);
    }
 
  }, [slotsStatus, groupedSlots, dispatch]); 


 
  const handleDateSelect = (date) => {
    setActiveDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookingSuccess = () => {
    navigate('/thank-you');
  };



  const renderDateSelection = () => {
    if (slotsStatus === 'loading') return <LoadingSpinner />;
    if (slotsStatus === 'failed') return <ErrorMessage message={slotsError || 'Could not load available dates.'} />;

    const dates = Object.keys(groupedSlots);
    if (dates.length === 0 && slotsStatus === 'succeeded') {
        return <p className="text-center text-gray-500 my-4">No available dates found.</p>;
    }

    return (
      
      <div className="overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mx-4 px-4">
  
        <div className="flex flex-nowrap space-x-3 pb-2">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              
              className={`flex-shrink-0 px-4 py-2 border rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap font-medium text-sm sm:text-base ${
                activeDate === date
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md focus:ring-indigo-500' // Selected state
                  : 'bg-white text-indigo-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 focus:ring-indigo-500' // Default state
              }`}
            >
              {formatDateDay(date)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTimeSlotsForDate = () => {
 
    if (!activeDate || slotsStatus !== 'succeeded' || !groupedSlots[activeDate]) return null;

    const times = groupedSlots[activeDate];
    if (!times || times.length === 0) {
      return <p className="text-center text-gray-500 mt-4">No available slots for {formatDateDay(activeDate)}.</p>;
    }

 
    return (
     
      <div className="mt-6 p-5 bg-white rounded-lg shadow-md border border-gray-200">
     
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
          Available Times 
        </h3>
       
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {times.map((slot) => (
            
            <TimeSlotButton
              key={slot.time} 
              time={slot.time}
              isSelected={selectedTime === slot.time}
              onClick={() => handleTimeSelect(slot.time)}
            />
          ))}
        </div>
      </div>
    );
  };

 
  return (
  
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
           
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                  
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
                        Book Your Appointment
                    </h1>

                    
                    <section aria-labelledby="date-selection-title" className="mb-6 sm:mb-8">
                        <h2 id="date-selection-title" className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 text-center">
                            1. Select a Date
                        </h2>
                        {renderDateSelection()}
                    </section>

                  
                    {activeDate && (
                        <section aria-labelledby="time-selection-title" className="mb-6 sm:mb-8">
                        <h2 id="time-selection-title" className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 text-center">
                            2. Select a Time for {formatDateDay(activeDate)}
                        </h2>
                        {renderTimeSlotsForDate()}
                        </section>
                    )}

                 
                    {activeDate && selectedTime && bookingStatus !== 'succeeded' && (
                        <section aria-labelledby="details-title">
                            <h2 id="details-title" className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                                3. Your Details
                            </h2>
                           
                            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                                <BookingForm
                                    selectedDate={activeDate}
                                    selectedTime={selectedTime}
                                    onBookingSuccess={handleBookingSuccess}
                                />
                            </div>
                        </section>
                    )}

                  
                     {bookingStatus === 'succeeded' && (
                         <p className="text-center text-green-600 font-medium mt-6">Booking successful! Redirecting...</p>
                     )}

                </div> 
            </div> 
        </div> 
    </div> 
  );
};

export default BookingPage;

