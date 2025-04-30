import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFoodItem from '../components/ui/AddFoodItem';

const CATEGORIES = [
  'Produce',
  'Meat & Seafood',
  'Dairy & Eggs',
  'Beverages',
  'Leftovers & Prepared',
  'Condiments & Sauces',
];

const CATEGORY_IMAGES = {
  Produce: '../images/fruits.png',
  'Meat & Seafood': '../images/meat.png',
  'Dairy & Eggs': '../images/dairy.png',
  Beverages: '../images/drinks.png',
  'Leftovers & Prepared': '../images/leftover.png',
  'Condiments & Sauces': '../images/condiment.png',
};

function UserFridgePage() {
  const [foodItems, setFoodItems] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchFoodItems = async () => {
      try {
        const res = await fetch('/api/foodItems', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch food items');
        const data = await res.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, [navigate]);

  if (!foodItems) return <div>Loading fridge...</div>;

  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const grouped = groupByCategory(foodItems);

  const getColorByDaysLeft = (daysLeft) => {
    if (daysLeft <= 3) return 'bg-red-200 text-red-800';
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/foodItems/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setFoodItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col p-4'>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='back-button fridgeBack mb-4'
      >
        <span className='material-symbols-outlined'>arrow_back</span>
      </button>

      <h1 className='text-2xl font-bold text-center mb-6'>Current Fridge</h1>

      {/* Scrollable Fridge Content */}
      <div className='flex-1 overflow-y-auto pr-1'>
        {CATEGORIES.map((category) => (
          <div key={category} className='mb-10'>
            <div className='flex items-center gap-2 mb-2'>
              <img
                src={CATEGORY_IMAGES[category]}
                alt={category}
                className='w-8 h-8 object-contain'
              />
              <h2 className='text-lg'>{category}</h2>
            </div>
            <div className='flex flex-wrap gap-3'>
              {grouped[category]?.length > 0 ? (
                grouped[category].map((item) => {
                  const daysLeft = Math.ceil(
                    (new Date(item.expirationDate) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={item._id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${getColorByDaysLeft(daysLeft)}`}
                    >
                      <span className='text-sm'>
                        {item.name} - {daysLeft} {daysLeft === 1 ? 'Day' : 'Days'}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className='text-red-600 font-bold ml-2'
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <span className='text-sm text-gray-400 italic'>No items</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons fixed to bottom */}
      <div className='sticky bottom-0 bg-gray-100 p-4 flex flex-col sm:flex-row gap-2 z-10'>
        <button
          onClick={() => setShowAddItemModal(true)}
          className='bg-black text-white w-full py-2 rounded'
        >
          Add Item
        </button>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className='bg-black text-white w-full py-2 rounded'
        >
          {isEditing ? 'Done' : 'Edit Items'}
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md relative fridgeAdd'>
            <button
              className='absolute top-2 right-4 text-gray-600 text-2xl'
              onClick={() => setShowAddItemModal(false)}
            >
              &times;
            </button>
            <AddFoodItem
              setFoodItems={(newItem) =>
                setFoodItems((prev) => [...prev, newItem])
              }
              onClose={() => setShowAddItemModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFridgePage;
