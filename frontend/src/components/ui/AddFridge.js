import React, { useState } from 'react';

export default function AddFridge({ onAddFridge }) {
  const [fridgeName, setFridgeName] = useState('');

  const handleInputChange = (e) => {
    setFridgeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fridgeName.trim()) {
        console.log('Fridge Name:', fridgeName);
        onAddFridge(fridgeName);
        setFridgeName('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Add a New Fridge</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Fridge Name"
          value={fridgeName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Fridge
        </button>
      </form>
    </div>
  );
}

