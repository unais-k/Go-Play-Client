import React from "react";
import LoginPage from "../../Components/Client/Login/LoginPage";
import { useSelector } from "react-redux";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";

function Login() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <LoginPage />
            <Footer />
        </div>
    );
}

export default Login;
