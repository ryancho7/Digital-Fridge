import React from 'react';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">Welcome to Digital Fridge!</h1>
      <p className="text-lg text-gray-700 mb-4">Keep track of your groceries and never waste food again.</p>
      <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Get Started
      </a>
    </div>
  );
}

export default LandingPage;