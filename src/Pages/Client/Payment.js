import React from "react";
import { useSelector } from "react-redux";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import PaymentComponent from "../../Components/Client/Payment/PaymentComponent";
import Footer from "../../Components/Client/Footer/Footer";

function Payment() {
    const location = useSelector((state) => state.userLogin.city);
  return (
    <div>
      <div className="h-16 mt-1">
        {location ? (
          <NavbarPage true={false} place={location} />
        ) : (
          <NavbarPage true={true} place={"Mumbai"} />
        )}
      </div>
      <ConstNavbar />
      <PaymentComponent />
      <Footer />
    </div>
  );
}

export default Payment;
