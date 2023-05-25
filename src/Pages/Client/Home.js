import React from "react";
import ConstNavbar from "../../Components/Client/ConstNavbar/ConstNavbar";
import NavbarPage from "../../Components/Client/Navbar/Navbar";
import Footer from "../../Components/Client/Footer/Footer";
import { useSelector } from "react-redux";
const LazyHome = React.lazy(() => import("../../Components/Client/Home/HomePage"));

function Home() {
    const location = useSelector((state) => state.userLogin.city);

    return (
        <div>
            <div className="h-16 mt-1">
                {location ? <NavbarPage true={false} place={location} /> : <NavbarPage true={true} place={"mumbai"} />}
            </div>
            <ConstNavbar />
            <React.Suspense fallback="Loading...">
                <LazyHome />
            </React.Suspense>
            <Footer />
        </div>
    );
}

export default Home;
