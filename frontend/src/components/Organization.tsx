import React, { useState } from 'react';
import Login from './Login'; // Ensure the correct path to the Login component

function Organization() {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          Organization Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Organization Name */}
          <div className="mb-4">
            <label
              htmlFor="organizationName"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your organization name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-200 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {/* Login Pop-up Trigger */}
           {/* Submit Button */}
           <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          {/* Login Pop-up Trigger */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <button
                className="underline text-blue-500 cursor-pointer"
                onClick={() => document.getElementById('my_modal_3').showModal()}
              >
                Login
              </button>
            </p>
            <Login /> {/* Ensure this renders the modal */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Organization;
