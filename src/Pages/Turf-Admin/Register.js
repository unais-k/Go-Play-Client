import React from "react";
import TurfAdminRegisterPage from "../../Components/Turf-admin/Register/RegisterPage";
import { useSelector } from "react-redux";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";

function TurfRegisterPage() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <TurfAdminRegisterPage />
            <Footer />
        </div>
    );
}

export default TurfRegisterPage;
