import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { apiEndpoints } from '../api/apiEnpoints';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };
  const [paymentMode, setPaymentMode] = useState('COD');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [authUser] = useAuth(); 
  const [termsAccepted, setTermsAccepted] = useState(false); // State to track if terms are accepted

  useEffect(() => {
    if (authUser) {
      axios.get(apiEndpoints.GET_USER_PROFILE(authUser._id))
        .then(response => {
          const address = response.data.user.address;
          setUserAddress(address || '');
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching user profile:", err);
          setError("Failed to load user address.");
          setLoading(false);
        });
    }
  }, [authUser]);

  const calculatePrice = (item) => {
    return item.type === 'rent' ? item.book.price / 2 : item.book.price;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (calculatePrice(item) * (item.quantity || 1));
    }, 0);
  };

  const handleSubmit = async () => {
    if (!userAddress || !termsAccepted) return; // Ensure order cannot be placed without address and terms acceptance

    const order = {
        items: cartItems.map(item => ({
            bookId: item.book._id,
            bookName: item.book.name,
            price: item.book.price,
            type: item.type,
            quantity: item.quantity || 1
        })),
        totalAmount: calculateTotal(),
        address: userAddress,
        paymentMode: paymentMode,
    };

    try {
        await axios.put(apiEndpoints.GET_USER_ORDERS(authUser._id), { order });

        setOrderConfirmed(true);
        setTimeout(() => {
            navigate('/orders'); 
        }, 2000);
    } catch (error) {
        console.error("Error confirming order:", error);
        setError("Failed to confirm the order.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto pt-20 px-4 min-h-screen pb-10">
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Your Order:</h3>
        {cartItems.map(item => {
          const itemPrice = calculatePrice(item);
          const itemTotal = itemPrice * (item.quantity || 1); 
          return (
            <div key={item._id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-2">
              <div>
                <h4 className="text-sm font-semibold dark:text-gray-200">{item.book.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Price: Rs.{itemPrice} {item.type === 'rent' && <span className="text-green-500">(Halved for Rent)</span>}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Quantity: {item.quantity || 1}</p>
                <p className="text-gray-600 dark:text-gray-400">Total: Rs.{itemTotal}</p>
                <p className="text-gray-600 dark:text-gray-400">Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Payment Mode:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMode === 'COD'}
              onChange={() => setPaymentMode('COD')}
            />
            COD
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Online"
              disabled 
            />
            Online Payment (Currently not available)
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Total Amount:</h3>
        <p className="text-lg font-bold">Rs.{calculateTotal()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Your Address:</h3>
        {userAddress ? (
          <p className="text-gray-600 dark:text-gray-400">{userAddress}</p>
        ) : (
          <p className="text-red-500">No address available. Please update your profile to add an address.</p>
        )}
      </div>

      {/* Terms and Conditions checkbox */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mr-2"
          />
          I agree to the <a href="/terms" className="text-blue-500 underline">Terms and Conditions </a>
        </label>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleSubmit}
          disabled={!userAddress || !termsAccepted} 
          className={`px-6 py-3 rounded-lg transition ${userAddress && termsAccepted ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        >
          Confirm Order
        </button>
      </div>

      {orderConfirmed && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">Order Confirmed!</h3>
          <p>Your order has been placed successfully!</p>
          <p>Delivery Address: {userAddress}</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
