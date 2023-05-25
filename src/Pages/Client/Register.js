import React from "react";
import RegisterPage from "../../Components/Client/Register/RegisterPage";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";

function Register() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <RegisterPage />
            <Footer />
        </div>
    );
}

export default Register;
