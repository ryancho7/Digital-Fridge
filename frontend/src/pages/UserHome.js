import React from 'react';

function UserHome() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Add Item bar */}
      <div className="flex items-center gap-2">
        <button className="bg-black text-white px-4 py-2 rounded-full text-xl">+</button>
        <input placeholder="Add Item" className="flex-1 px-4 py-2 rounded-full bg-white shadow" />
        <button className="bg-black text-white px-3 py-2 rounded-full">≡</button>
      </div>
      {/* Filter pills (Milk, Chicken) */}
      <div className="flex gap-2 mt-2">
        <span className="bg-gray-200 px-3 py-1 rounded-full">Milk ✕</span>
        <span className="bg-gray-200 px-3 py-1 rounded-full">Chicken ✕</span>
      </div>
      {/* Recipe preview box */}
      <div className="mt-4 p-4 bg-black text-white rounded-lg">
        <h2 className="text-2xl font-bold">Recipes</h2>
        <p className="text-sm">4 recipes available with stored ingredients</p>
      </div>
      {/* My Fridge section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow text-center">
        <h3 className="text-xl font-bold">My Fridge</h3>
        <p className="text-sm text-gray-600">12 items currently stored</p>
      </div>
      {/* Expiring Soon cards */}
      <div className="mt-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold">Expiring Soon</h4>
        <a href="#" className="text-sm text-blue-500">See all</a>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
    {/* Card 1 */}
    <div className="bg-black text-white rounded-lg p-4 flex flex-col items-center">
      <img src="chickenLeg.png" alt="Chicken Leg" />
      <h5 className="mt-2 font-bold">Chicken Leg</h5>
      <div className="flex gap-2 mt-1">
        <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">1 Day</span>
        <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">4/27</span>
      </div>
    </div>
    {/* Card 2 */}
    <div className="bg-black text-white rounded-lg p-4 flex flex-col items-center">
          <img src="avocado.png" alt="Avocado" />
          <h5 className="mt-2 font-bold">Avocado</h5>
          <div className="flex gap-2 mt-1">
            <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">2 Days</span>
            <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">4/28</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserHome;