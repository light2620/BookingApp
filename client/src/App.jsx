import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BookingPage from './pages/BookingPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
  
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;