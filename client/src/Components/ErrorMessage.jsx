import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="my-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded" role="alert">
    <p className="font-bold">Error</p>
    <p>{message || 'An unexpected error occurred.'}</p>
  </div>
);

export default ErrorMessage;