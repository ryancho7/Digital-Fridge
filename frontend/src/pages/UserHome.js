import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFoodItem from '../components/ui/AddFoodItem';
import '../App.css';

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
				const res = await fetch('/api/fridges', {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!res.ok) throw new Error('Failed to fetch fridges');
				const fridgeData = await res.json();
				setFridges(fridgeData);

				if (fridgeData.length > 0 && fridgeData[0].items) {
					const items = fridgeData[0].items;
					setFoodItems(items);

					const today = new Date();
					const expiring = items.filter((item) => {
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

	const handleDeleteItem = async (itemId) => {
		const token = localStorage.getItem('token');
		try {
			const res = await fetch(`/api/foodItems/${itemId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) throw new Error('Failed to delete item');

			setFoodItems((prev) => prev.filter((item) => item._id !== itemId));
			setExpiringItems((prev) => prev.filter((item) => item._id !== itemId));
		} catch (err) {
			console.error('Error deleting item:', err);
		}
	};

	const getExpireClass = (days) => {
		if (days <= 1) return 'expire-critical';
		if (days <= 3) return 'expire-high';
		if (days <= 5) return 'expire-medium';
		return 'expire-safe';
	};

	return (
		<div className='fridgeHome p-4 space-y-6'>
			<div className='fridgeTop flex justify-between items-center'>
				<h1 className='fridgeTitle text-2xl font-bold text-gray-800'>
					FridgeFinder
				</h1>
				<button
					onClick={() => setShowAddItemModal(true)}
					className='fridgeAddButton bg-black text-white px-4 py-2 rounded-full text-xl'
				>
					+
				</button>
			</div>

			{fridges.length > 0 ? (
				<div
					className='fridgeCard relative bg-black/90 text-white p-6 rounded-lg shadow-md text-center'
					onClick={() => navigate('/userfridge/' + fridges[0]._id)}
				>
					<h2 className='text-xl font-bold text-left mb-[10px]'>
						My Fridge
					</h2>
					<p className='text-left text-sm text-gray-300'>
						{foodItems.length} item{foodItems.length !== 1 && 's'}{' '}
						currently stored
					</p>
				</div>
			) : (
				<p className='text-center text-gray-500'>No fridges found.</p>
			)}

			<div
				className='receiptCard relative bg-black/90 rounded-lg text-white mt-8 shadow-md cursor-pointer overflow-hidden h-32'
				onClick={() => navigate('/ReceiptPage')}
			>
				<div className='p-6 z-10 relative'>
					<h2 className='text-xl font-bold mb-1 receiptTitle'>Recipes</h2>
					<p className='text-sm text-gray-300'>
						Explore some trending <br /> recipes
					</p>
				</div>
				<img
					src='../images/mango.png'
					alt='Recipe'
					className='absolute right-0 bottom-0 h-full object-contain'
				/>
			</div>

			<div className='expireSection relative bg-black/90 text-white p-6 rounded-lg shadow-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg font-bold'>Expiring Soon</h2>
					<span className='text-blue-300 text-sm cursor-pointer'>
						See all
					</span>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					{expiringItems.length > 0 ? (
						expiringItems.map((item, index) => {
							const today = new Date();
							const expDate = new Date(item.expirationDate);
							const diffDays = Math.ceil(
								(expDate - today) / (1000 * 60 * 60 * 24)
							);
							return (
								<div
									key={item._id || index}
									className='relative bg-gray-800 text-white rounded-lg p-4 flex flex-col items-center expireCard'
								>
									<button
										onClick={() => handleDeleteItem(item._id)}
										className='absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs'
										title='Delete item'
									>
										✕
									</button>

									<h5 className='mt-2 font-bold'>{item.name}</h5>
									<div className='flex gap-2 mt-1 expireCardDetails'>
										<span
											className={`expireCardDay ${getExpireClass(
												diffDays
											)}`}
										>
											{diffDays} {diffDays === 1 ? 'Day' : 'Days'}
										</span>
										<span
											className={`expireCardDate ${getExpireClass(
												diffDays
											)}`}
										>
											{expDate.toLocaleDateString()}
										</span>
									</div>
								</div>
							);
						})
					) : (
						<p className='col-span-2 text-center text-gray-200'>
							No items expiring soon!
						</p>
					)}
				</div>
			</div>

			{showAddItemModal && fridges[0] && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='addModal bg-white rounded-lg p-6 w-full max-w-md relative fridgeAdd'>
						<button
							className='absolute top-2 right-4 text-gray-600 text-2xl'
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
								const diffDays =
									(expDate - today) / (1000 * 60 * 60 * 24);
								if (diffDays >= 0 && diffDays <= 3) {
									setExpiringItems((prev) => [...prev, newItem]);
								}
							}}
							onClose={() => setShowAddItemModal(false)}
						/>
					</div>
				</div>
			)}

			<div className='fixed bottom-4 left-4'>
				<button
					onClick={handleSignOut}
					className='signOut bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700'
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}

export default UserHome;
