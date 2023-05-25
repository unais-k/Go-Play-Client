import React from "react";
import { useSelector } from "react-redux";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";
import ForgetPasswordMainComponent from "../../Components/Client/ForgetPassword/ForgetPasswordMainComponent";

function ForgetPassword() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <ForgetPasswordMainComponent />
            <Footer />
        </div>
    );
}

export default ForgetPassword;
