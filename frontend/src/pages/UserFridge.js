import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddFoodItem from '../components/ui/AddFoodItem.js';

function UserFridgePage() {
	const { fridgeId } = useParams();

	const [foodItems, setFoodItems] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
			return;
		}
		const fetchFoodItems = async () => {
			try {
				const res = await fetch(`/api/foodItems/${fridgeId}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!res.ok) {
					throw new Error('Failed to fetch food items');
				}
				const data = await res.json();
				console.log(data);
				setFoodItems(data);
			} catch (error) {
				console.error('Error fetching food items:', error);
			}
		};
		fetchFoodItems();
	}, [fridgeId]);

	if (!foodItems) {
		return <div>Loading fridge details...</div>;
	}

	console.log(foodItems);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Food Items in Fridge</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{foodItems.length > 0 ? (
					foodItems.map((item) => (
						<div
							key={item._id}
							className='bg-white p-4 rounded-lg shadow-md'
						>
							<h3 className='text-lg font-bold text-gray-800'>
								{item.name}
							</h3>
							<p>
								<strong>Quantity:</strong> {item.quantity}
							</p>
							<p>
								<strong>Expiration:</strong> {item.expirationDate}
							</p>
						</div>
					))
				) : (
					<p>No food items available in this fridge.</p>
				)}
			</div>
			<AddFoodItem fridgeId={fridgeId} setFoodItems={setFoodItems} />
		</div>
	);
}

export default UserFridgePage;
