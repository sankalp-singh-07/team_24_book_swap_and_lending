import React from 'react';
import Navbar from "../components/Navbar";
import Payment from '../components/Payment';
import Footer from "../components/Footer";

function PaymentPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <Payment />
            </div>
            <Footer />
        </>
    );
}

export default PaymentPage;