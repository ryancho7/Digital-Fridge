import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });

      if (res.ok) {
        console.log('Sign up success!');
        // Optional: await res.json() here if you need token or user data
        navigate('/login'); // <- redirect to login instead of home
      } else {
        const errorData = await res.json();
        console.error('Sign up failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-sm text-center text-gray-500">
            Enter your email and password to create a new account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <label htmlFor="username" className="text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
