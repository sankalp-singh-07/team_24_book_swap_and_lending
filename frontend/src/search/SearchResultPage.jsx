import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchResults from '../components/SearchResults';

const SearchResultPage = () => {
    return (
        <>
            <Navbar />
            <div>
                <SearchResults />
            </div>
            <Footer />
        </>
    );
};

export default SearchResultPage;