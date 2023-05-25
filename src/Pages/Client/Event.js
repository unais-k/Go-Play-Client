import React from "react";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import EventComponent from "../../Components/Client/Event/EventComponent";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";

function EventPage() {
    const location = useSelector((state) => state.userLogin.city);

    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"Mumbai"} />}
            </div>
            <ConstNavbar />
            <EventComponent />
            <Footer />
        </div>
    );
}

export default EventPage;
