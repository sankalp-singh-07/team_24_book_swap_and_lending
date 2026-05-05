import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { apiEndpoints } from '../api/apiEnpoints';

const Cart = () => {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUser) {
      axios.get(apiEndpoints.GET_CART_ITEMS(authUser._id))
        .then(response => {
          const items = response.data.items || [];
          console.log("Fetched Cart Items:", items);
          setCartItems(items);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          setError("Failed to load cart.");
          setLoading(false);
        });
    }
  }, [authUser]);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return; // Prevents setting quantity to less than 1

    try {
        console.log("Updating item:", itemId, "to quantity:", quantity); // Debug log
        const response = await axios.put(apiEndpoints.UPDATE_CART_ITEM(authUser._id, itemId), { quantity });
        console.log("Quantity update response:", response.data); // Log the response to verify it's successful

        // Update state only if the API call succeeds
        setCartItems(cartItems.map(item => 
            item._id === itemId ? { ...item, quantity } : item
        ));
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
};


  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(apiEndpoints.REMOVE_FROM_CART(authUser._id, itemId));
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Proceed to Checkout
  // Inside your Cart component
  const handleProceed = () => {
    console.log("Proceed to checkout");
        navigate('/payment', { state: { cartItems } });

  };

  

  if (!authUser) {
    return <div>You need to log in to view your cart.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log("Cart Items:", cartItems);

  const buyItems = cartItems.map(item => ({
    ...item,
    quantity: item.quantity || 1, // Set default to 1 if not present
  })).filter(item => item.type === 'buy');
  
  const rentItems = cartItems.map(item => ({
    ...item,
    quantity: item.quantity || 1,
  })).filter(item => item.type === 'rent');
  
  if (buyItems.length === 0 && rentItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto pt-20 px-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buy Section */}
        <div>
          <h3 className="text-xl font-medium mb-4">Books to Buy</h3>
          {buyItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {buyItems.map(item => (
                item.book && (
                  <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={item.book.image} alt={item.book.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div>
                        <h4 className="text-sm font-semibold dark:text-gray-200">{item.book.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">Rs.{item.book.price}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))} 
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            -
                          </button>
                          <span className="mx-2">{typeof item.quantity === 'number' ? item.quantity : 1}</span>
                          <button 
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)} 
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="dark:text-gray-400">No books to buy.</p>
          )}
        </div>

        {/* Rent Section */}
        <div>
          <h3 className="text-xl font-medium mb-4">Books to Rent</h3>
          {rentItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {rentItems.map(item => (
                item.book && (
                  <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={item.book.image} alt={item.book.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div>
                        <h4 className="text-sm font-semibold dark:text-gray-200">{item.book.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">Rs.{item.book.price}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => handleQuantityChange(item._id, Math.max(item.quantity - 1, 1))} 
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            -
                          </button>
                          <span className="mx-2">{typeof item.quantity === 'number' ? item.quantity : 1}</span>
                          <button 
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)} 
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="dark:text-gray-400">No books to rent.</p>
          )}
        </div>
      </div>

      {/* Proceed Button */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={handleProceed} 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg transition hover:bg-blue-600"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Cart;
