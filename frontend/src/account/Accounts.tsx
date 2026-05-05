import React from 'react';
import Navbar from "../components/Navbar";
import Account from "../components/Account";
import Footer from "../components/Footer";

function Accounts() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Account />
      </div>
      <Footer />
    </>
  )
}

export default Accounts
