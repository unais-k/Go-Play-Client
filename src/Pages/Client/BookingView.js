import React from 'react'
import { useSelector } from 'react-redux';
import NavbarPage from '../../Components/Client/Navbar/Navbar';
import ConstNavbar from '../../Components/Client/ConstNavbar/ConstNavbar';
import { Footer } from 'flowbite-react';
import BookingViewComponent from '../../Components/Client/BookingView/BookingViewComponent';

function BookingView() {
    const location = useSelector((state) => state.userLogin.city);

  return (
    <div>
         <div className="h-16 mt-1 border-b">
        {location ? (
          <NavbarPage true={false} place={location} />
        ) : (
          <NavbarPage true={true} place={"mumbai11"} />
        )}
      </div>
      <ConstNavbar />
      <BookingViewComponent />
      <Footer />
    </div>
  )
}

export default BookingView