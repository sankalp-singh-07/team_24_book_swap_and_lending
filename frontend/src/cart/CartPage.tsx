import React from 'react';
import Navbar from "../components/Navbar";
import Cart from '../components/Cart';
import Footer from "../components/Footer";

function CartPage() {
    return (
    <>
        <Navbar />
        <div className=" min-h-screen">
        <Cart />
        </div>      
        <Footer />
    </>
    )
}


export default CartPage
