import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
//import '../App.css';

const receipts = [
	{
		name: 'Chicken Pasta',
		image: 'images/chick.png',
		ingredients: [
			'Chicken',
			'Heavy Cream',
			'Penne Pasta',
			'Mushrooms',
			'Butter',
			'Paprika',
		],
		time: '45 minutes',
		description:
			'In a large skillet, melt 2 tablespoons butter with a little oil over medium-high heat. Add chicken breasts and cook for about 4–5 minutes on each side until browned...',
	},
	{
		name: 'Beef Tacos',
		image: './images/taco.jpg',
		ingredients: ['Beef', 'Tortillas', 'Onion', 'Cilantro', 'Cheese'],
		time: '30 minutes',
		description:
			'Cook the ground beef in a skillet over medium heat until browned. Add spices, assemble tacos with your favorite toppings, and enjoy!',
	},
];

function ReceiptPage() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const navigate = useNavigate();

	const handleDragEnd = (event, info) => {
		if (info.offset.x < -50) {
			setCurrentIndex((prev) => (prev + 1) % receipts.length);
		} else if (info.offset.x > 50) {
			setCurrentIndex(
				(prev) => (prev - 1 + receipts.length) % receipts.length
			);
		}
	};

	const currentReceipt = receipts[currentIndex];

	return (
		<div className='receipt-page'>
			{/* Top Section */}
			<div className='header' onClick={() => navigate('/home')}>
				<h1 className='text-2xl font-bold text-gray-800 reciptHome'>
					FridgeFinder
				</h1>
			</div>
			<motion.div
				className='top-section'
				drag='x'
				dragConstraints={{ left: 5, right: 5 }}
				onDragEnd={handleDragEnd}
			>
				<button onClick={() => navigate(-1)} className='back-button'>
					<span class='material-symbols-outlined'>arrow_back</span>
				</button>

				<img
  					src={currentReceipt.image}
  					alt={currentReceipt.name}
 				 	className="w-96 h-auto mx-auto rounded-lg shadow-md"
				/>

				<h1 className="receipt-title mt-1 text-xl font-bold text-gray-800">
   				 {currentReceipt.name}
				 
  				</h1>
			</motion.div>

			{/* Bottom Section */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentReceipt.description}
					className='bottom-section'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='scrollable-content'>
						<div className='ingredients-header'>
							<h2>Ingredients:</h2>
							<span className='cooking-time'>
								Time: {currentReceipt.time}
							</span>
						</div>
						<ul className='ingredients-list'>
							{currentReceipt.ingredients.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>

						<h2>Description</h2>
						<p className='description-text'>
							{currentReceipt.description}
						</p>
					</div>
					<div className='fade-bottom'></div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

export default ReceiptPage;
