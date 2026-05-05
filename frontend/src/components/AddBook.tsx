import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { apiEndpoints } from '../api/apiEnpoints';

const AddBook = () => {
    const [authUser] = useAuth();
    const [bookData, setBookData] = useState({
        name: '',
        category: '',
        image: '',
        title: '',
        author: '',
        genre: '',
        location: '',
        availabilityType: 'lend',
        condition: 'Good',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authUser) {
            toast.error("You need to be logged in to add a book.");
            return;
        }

        try {
            // Adding user ID to book data
            const newBook = { ...bookData, userId: authUser._id };

            // Make API request to add the book
            const response = await axios.post(apiEndpoints.ADD_BOOK, newBook);

            if (response.status === 201) {
                toast.success('Book added successfully!');
                setBookData({
                    name: '',
                    category: '',
                    image: '',
                    title: '',
                    author: '',
                    genre: '',
                    location: '',
                    availabilityType: 'lend',
                    condition: 'Good',
                    description: ''
                });
                setTimeout(() => {
                    navigate('/account'); // Redirect to the Account page
                }, 800); // Redirect after a short delay to show the success message
            }
        } catch (error) {
            toast.error('Failed to add book.');
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 bg-white dark:bg-slate-900 text-black dark:text-white">
            <h2 className="text-2xl font-bold mb-2">Add a Book to Your Library</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">List books for lending, swapping, or donation so readers nearby can request them.</p>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Book Title</label>
                    <input
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={bookData.genre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={bookData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        placeholder="Optional cover image URL"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Pickup Location</label>
                    <input
                        type="text"
                        name="location"
                        value={bookData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        placeholder="Area, city, or campus"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Availability</label>
                    <select
                        name="availabilityType"
                        value={bookData.availabilityType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                    >
                        <option value="lend">Lend</option>
                        <option value="swap">Swap</option>
                        <option value="donate">Donate</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Condition</label>
                    <select
                        name="condition"
                        value={bookData.condition}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                    >
                        <option>Like New</option>
                        <option>Good</option>
                        <option>Readable</option>
                    </select>
                </div>
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Notes</label>
                    <textarea
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                        rows="4"
                        placeholder="Mention pickup preference, edition, language, or swap expectations."
                    />
                </div>
                <button
                    type="submit"
                    className="md:col-span-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                >
                    Publish Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
