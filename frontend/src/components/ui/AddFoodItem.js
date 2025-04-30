import { useState } from 'react';

export default function AddFoodItem({ setFoodItems, onClose }) {
	const [itemName, setItemName] = useState('');
	const [itemCategory, setItemCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [expirationDate, setExpirationDate] = useState('');

	const handleAddItem = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`/api/foodItems`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					name: itemName,
					category: itemCategory,
					quantity,
					expirationDate,
				}),
			});

			if (!res.ok) throw new Error('Failed to add food item');

			const newItem = await res.json();
			setFoodItems(newItem); // ✅ Pass the new single item, not an array
			setItemName('');
			setItemCategory('');
			setQuantity('');
			setExpirationDate('');
			onClose();
		} catch (err) {
			console.error('Error adding item:', err);
		}
	};

	return (
		<form onSubmit={handleAddItem} className='space-y-4'>
			<h2 className='text-2xl font-bold text-center mb-2'>Add New Item</h2>

			<div>
				<label
					htmlFor='itemName'
					className='text-sm font-medium text-gray-700'
				>
					Name
				</label>
				<input
					id='itemName'
					type='text'
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
					className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
					placeholder='e.g. Milk'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='itemCategory'
					className='text-sm font-medium text-gray-700'
				>
					Category
				</label>
				<select
					id='itemCategory'
					value={itemCategory}
					onChange={(e) => setItemCategory(e.target.value)}
					className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
					required
				>
					<option value=''>Select</option>
					<option value='Produce'>Produce</option>
					<option value='Meat & Seafood'>Meat & Seafood</option>
					<option value='Dairy & Eggs'>Dairy & Eggs</option>
					<option value='Beverages'>Beverages</option>
					<option value='Leftovers & Prepared'>
						Leftovers & Prepared
					</option>
					<option value='Condiments & Sauces'>Condiments & Sauces</option>
				</select>
			</div>

			<div>
				<label
					htmlFor='quantity'
					className='text-sm font-medium text-gray-700'
				>
					Quantity
				</label>
				<input
					id='quantity'
					type='number'
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
					placeholder='e.g. 2'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='expirationDate'
					className='text-sm font-medium text-gray-700'
				>
					Expiration Date
				</label>
				<input
					id='expirationDate'
					type='date'
					value={expirationDate}
					onChange={(e) => setExpirationDate(e.target.value)}
					className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
					required
				/>
			</div>

			<button
				type='submit'
				className='w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700'
			>
				Add Item
			</button>
		</form>
	);
}
