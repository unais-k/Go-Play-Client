import React from "react";
import TurfPage from "../../Components/Client/Turf-display/TurfPage";
import Footer from "../../Components/Client/Footer/Footer";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import { useSelector } from "react-redux";

function Football() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1 border-b">
                {" "}
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai11"} />}
            </div>
            <ConstNavbar />
            <TurfPage />
            <Footer />
        </div>
    );
}

export default Football;
