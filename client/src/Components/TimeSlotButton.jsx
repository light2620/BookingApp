import React from 'react';
import { formatTimeAmPm } from '../utils/formatters';

const TimeSlotButton = ({ time, isSelected, onClick }) => {
  const baseClasses = "px-4 py-2 border rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  const selectedClasses = "bg-blue-600 text-white border-blue-700 ring-blue-500";
  const unselectedClasses = "bg-white text-blue-600 border-blue-300 hover:bg-blue-50";
  const disabledClasses = "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"; // If you were to disable booked slots

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {formatTimeAmPm(time)}
    </button>
  );
};

export default TimeSlotButton;