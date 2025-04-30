import React from 'react';

function LandingPage() {
	return (
		<div
			className='relative flex flex-col items-center text-center justify-center min-h-screen bg-cover bg-center bg-no-repeat'
			style={{
				backgroundImage: "url('/images/kitchen.jpg')",
			}}
		>
			<div className='absolute inset-0 bg-black opacity-40' />
			<div className='relative z-10 text-white'>
				<h1 className='text-5xl font-bold mb-6'>
					Welcome to Digital Fridge!
				</h1>
				<p className='text-lg mb-4'>
					Keep track of your groceries and never waste food again.
				</p>
				<a
					href='/login'
					className='bg-black/90 text-white px-4 py-2 rounded hover:bg-blue-600'
				>
					Get Started
				</a>
			</div>
		</div>
	);
}

export default LandingPage;
