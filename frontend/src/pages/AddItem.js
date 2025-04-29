// import { useState } from "react";

// export default function AddFoodItem() {

//     const [ itemName, setItemName ] = useState('');
//     const [ itemCategory, setItemCategory ] = useState('');
//     const [ quantity, setQuantity ] = useState('');
//     const [ unit, setUnit ] = useState('');
//     const [ expirationDate, setExpirationDate ] = useState('');

//     const handleAddItem = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('/api/foodItems/id', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({ itemName, itemCategory, quantity, unit, expirationDate })
//             });
//         } catch (error) {

//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//             <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-bold text-center mb-4">Add New Item</h2>
//                 <form onSubmit={handleAddItem} className="flex flex-col gap-4">
//                 <div>
//                     <label htmlFor="itemName" className="text-sm font-semibold text-gray-700">
//                     Item Name
//                     </label>
//                     <input
//                         id="itemName"
//                         type="text"
//                         value={itemName}
//                         onChange={(e) => setItemName(e.target.value)}
//                         placeholder="e.g. Milk"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="itemCategory" className="text-sm font-semibold text-gray-700">
//                         Category
//                     </label>
//                     <select
//                         id="itemCategory"
//                         value={itemCategory}
//                         onChange={(e) => setItemCategory(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
//                         required
//                     >
//                         <option value="">Select a category</option>
//                         <option value="Protein">Protein</option>
//                         <option value="Vegetable">Vegetable</option>
//                         <option value="Fruit">Fruit</option>
//                         <option value="Dairy">Dairy</option>
//                         <option value="Beverage">Beverage</option>
//                         <option value="Condiment">Condiment</option>
//                         <option value="Frozen">Frozen</option>
//                         <option value="Grain">Grain</option>
//                         <option value="Snack">Snack</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="quantity" className="text-sm font-semibold text-gray-700">
//                     Quantity
//                     </label>
//                     <input
//                         id="quantity"
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         placeholder="e.g. 2"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="unit" className="text-sm font-semibold text-gray-700">
//                         Unit
//                     </label>
//                     <select
//                         id="unit"
//                         value={unit}
//                         onChange={(e) => setUnit(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
//                         required
//                     >
//                         <option value="">Select unit</option>
//                         <option value="oz">Ounces (oz)</option>
//                         <option value="lb">Pounds (lb)</option>
//                         <option value="g">Grams (g)</option>
//                         <option value="kg">Kilograms (kg)</option>
//                         <option value="mL">Milliliters (ml)</option>
//                         <option value="L">Liters (L)</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="expirationDate" className="text-sm font-semibold text-gray-700">
//                     Expiration Date
//                     </label>
//                     <input
//                         id="expirationDate"
//                         type="date"
//                         value={expirationDate}
//                         onChange={(e) => setExpirationDate(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mt-1"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                     Add Item
//                 </button>
//                 </form>
//             </div>
//         </div>
//     )
// }