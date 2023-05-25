import React from "react";
import { useSelector } from "react-redux";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import ChangePasswordComponent from "../../Components/Client/ChangePassword/ChangePassword";
import Footer from "../../Components/Client/Footer/Footer";

function ChangePassword() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1 border-b">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <ChangePasswordComponent />
            <Footer />
        </div>
    );
}

export default ChangePassword;
