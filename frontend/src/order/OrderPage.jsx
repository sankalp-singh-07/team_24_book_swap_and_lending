import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Orders from '../components/Orders';

const OrderPage = () => {
    return (
        <>
            <Navbar />
        <div>
            <Orders />
        </div>
        <Footer />
        </>
    );
};

export default OrderPage;