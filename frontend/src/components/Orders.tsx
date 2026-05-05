import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { apiEndpoints } from '../api/apiEnpoints';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authUser] = useAuth(); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(apiEndpoints.GET_USER_ORDERS(authUser._id));
                console.log(response.data); // Log the data to inspect the structure
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            fetchOrders();
        }
    }, [authUser]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto py-32 px-4 min-h-screen"> {/* 30% padding from top and bottom */}
            <h1 className="text-3xl font-semibold mb-6 text-center">Your Orders</h1>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-medium">Order #{index + 1}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Total Amount: Rs.{order.totalAmount}</p>
                            <p className="text-gray-600 dark:text-gray-400">Address: {order.address}</p>
                            <p className="text-gray-600 dark:text-gray-400">Payment Mode: {order.paymentMode}</p>
                            <h4 className="mt-4 text-lg font-semibold">Items:</h4>
                            <ul className="list-disc list-inside space-y-2">
    {order.items.map((item, itemIndex) => (
        <p key={itemIndex} className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <h4 className="font-semibold">Item {itemIndex + 1}</h4>
            <p><strong>Name:</strong> {item.bookName}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Type:</strong> {item.type}</p>
        </p>
    ))}
</ul>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
