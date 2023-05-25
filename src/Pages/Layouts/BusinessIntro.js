import React from "react";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import BusinessIntroComponent from "../../Components/Turf-admin/Layout/BusinessIntroComponent";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";

function BusinessIntro() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div>
                <div className="h-16 mt-1">
                    {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai"} />}
                </div>
                <ConstNavbar />
                <BusinessIntroComponent />
                <Footer />
            </div>
        </div>
    );
}

export default BusinessIntro;
