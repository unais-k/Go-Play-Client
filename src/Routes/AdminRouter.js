import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLogin from "../Pages/Admin/Login";
import AdminDashboard from "../Pages/Admin/Dashboard";
import Inbox from "../Pages/Admin/Inbox";
import GroundList from "../Pages/Admin/GroundList";
import City from "../Pages/Admin/City";
import OwnerList from "../Pages/Admin/OwnerList";
import ClientList from "../Pages/Admin/ClientList";
import GroundView from "../Pages/Admin/GroundView";
import EventView from "../Pages/Admin/EventView";
import Error from "../Pages/Admin/Error";
import Chat from "../Pages/Admin/Chat";
import Booking from "../Pages/Admin/Booking";
import OfferView from "../Pages/Admin/OfferView";
import Banner from "../Pages/Admin/Banner";
import AddBanner from "../Pages/Admin/AddBanner";
function AdminRouter() {
    // const isAuth = true;
    const isAuth = useSelector((state) => state.adminLogin.token);
    console.log(isAuth, "Admin Token");
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dash" element={isAuth ? <AdminDashboard /> : <Navigate to="/admin/" />} />
                <Route path="/notification" element={isAuth ? <Inbox /> : <Navigate to="/admin/" />} />
                <Route path="/ground-list" element={isAuth ? <GroundList /> : <Navigate to="/admin/" />} />
                <Route path="/ground-view/:id" element={isAuth ? <GroundView /> : <Navigate to="/admin/" />} />
                <Route path="/event-view/:id" element={isAuth ? <EventView /> : <Navigate to="/admin/" />} />
                <Route path="/offer-view/:id" element={isAuth ? <OfferView /> : <Navigate to="/admin/" />} />
                <Route path="/add-city" element={isAuth ? <City /> : <Navigate to="/admin/" />} />
                <Route path="/owner-list" element={isAuth ? <OwnerList /> : <Navigate to="/admin/" />} />
                <Route path="/booking-list" element={isAuth ? <Booking /> : <Navigate to="/admin/" />} />
                <Route path="/client-list" element={isAuth ? <ClientList /> : <Navigate to="/admin/" />} />
                <Route path="/banner" element={isAuth ? <Banner /> : <Navigate to="/admin/" />} />
                <Route path="/add-banner" element={isAuth ? <AddBanner /> : <Navigate to="/admin/" />} />
                <Route path="/chat" element={isAuth ? <Chat /> : <Navigate to="/admin/" />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default AdminRouter;
