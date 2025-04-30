import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFoodItem from '../components/ui/AddFoodItem';

function UserHome() {
  const [fridges, setFridges] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/api/fridges', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch fridges');
        const fridgeData = await res.json();
        setFridges(fridgeData);

        if (fridgeData.length > 0 && fridgeData[0].items) {
          const items = fridgeData[0].items;
          setFoodItems(items);

          const today = new Date();
          const expiring = items.filter(item => {
            const expDate = new Date(item.expirationDate);
            const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
            return diffDays >= 0 && diffDays <= 3;
          });
          setExpiringItems(expiring);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">FridgeFinder</h1>
        <button
          onClick={() => setShowAddItemModal(true)}
          className="bg-black text-white px-4 py-2 rounded-full text-xl"
        >
          +
        </button>
      </div>

      {fridges.length > 0 ? (
        <div className="bg-[#3B2F2F] text-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold">My Fridge</h2>
          <p>
            {foodItems.length} item{foodItems.length !== 1 && 's'} currently stored
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No fridges found.</p>
      )}

      {/* Expiring Soon */}
      <div className="bg-[#3B2F2F] text-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Expiring Soon</h2>
          <a href="#" className="text-blue-300 text-sm">See all</a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {expiringItems.length > 0 ? (
            expiringItems.map((item, index) => {
              const today = new Date();
              const expDate = new Date(item.expirationDate);
              const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
              return (
                <div
                  key={item._id || index}
                  className="bg-gray-800 text-white rounded-lg p-4 flex flex-col items-center"
                >
                  <h5 className="mt-2 font-bold">{item.name}</h5>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                      {diffDays} {diffDays === 1 ? 'Day' : 'Days'}
                    </span>
                    <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                      {expDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-2 text-center text-gray-200">No items expiring soon!</p>
          )}
        </div>
      </div>

      {/* Add Food Item Modal */}
      {showAddItemModal && fridges[0] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-4 text-gray-600 text-2xl"
              onClick={() => setShowAddItemModal(false)}
            >
              &times;
            </button>
            <AddFoodItem
              fridgeId={fridges[0]._id}
              setFoodItems={(newItem) => {
                const updatedItems = [...foodItems, newItem];
                setFoodItems(updatedItems);

                const today = new Date();
                const expDate = new Date(newItem.expirationDate);
                const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
                if (diffDays >= 0 && diffDays <= 3) {
                  setExpiringItems(prev => [...prev, newItem]);
                }
              }}
              onClose={() => setShowAddItemModal(false)}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-4 left-4">
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default UserHome;
