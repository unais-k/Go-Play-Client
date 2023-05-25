import React from "react";
import BookingListComponent from "../../Components/Client/BookingDetails/BookingListComponent";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";

function Booking() {
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
      <BookingListComponent />
      <Footer />
    </div>
  );
}

export default Booking;
