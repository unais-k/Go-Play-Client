import React from "react";
import GroundViewPage from "../../Components/Client/GroundView/GroundViewPage";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";

function GroundPage() {
    const location = useSelector((state) => state.userLogin.city);
    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"Mumbai"} />}
            </div>
            <ConstNavbar />
            <GroundViewPage />
            <Footer />
        </div>
    );
}

export default GroundPage;
