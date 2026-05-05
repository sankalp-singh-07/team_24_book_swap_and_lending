import React from 'react';
import Navbar from "../components/Navbar";
import AddBook from "../components/AddBook";
import Footer from "../components/Footer";

function AddBookPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <AddBook />
            </div>
            <Footer />
        </>
    );
}

export default AddBookPage;