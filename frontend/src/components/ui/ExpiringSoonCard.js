// src/components/ExpiringSoonCard.jsx
import { useState } from 'react';

const ExpiringSoonCard = () => {
  const [items, setItems] = useState([
    { name: 'milk', expiresIn: '1 Day', date: '4/30/2025' }
  ]);

  const handleDelete = (name) => {
    setItems(prev => prev.filter(item => item.name !== name));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#3A2C2C] p-6 rounded-lg text-white text-center mb-4">
        <h2 className="text-2xl font-bold">My Fridge</h2>
        <p>{items.length} items currently stored</p>
      </div>

      {/* Expiring Soon Section */}
      <div className="bg-[#3A2C2C] p-6 rounded-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Expiring Soon</h2>
          <a href="#" className="text-blue-400 hover:underline text-sm">See all</a>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-400">No items expiring soon.</p>
        ) : (
          items.map((item) => (
            <div key={item.name} className="bg-[#1F2633] p-6 rounded-md flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold mb-2">{item.name}</p>
                <div className="flex space-x-2 text-sm">
                  <span className="bg-gray-700 px-3 py-1 rounded-full">{item.expiresIn}</span>
                  <span className="bg-gray-700 px-3 py-1 rounded-full">{item.date}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.name)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpiringSoonCard;
