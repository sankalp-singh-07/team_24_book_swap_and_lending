import React from 'react';
import Navbar from "../components/Navbar";
import BookDetails from '../components/BookDetails';
import Footer from "../components/Footer";

function BookDetailPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <BookDetails />
            </div>
            <Footer />
        </>
    );
}

export default BookDetailPage;