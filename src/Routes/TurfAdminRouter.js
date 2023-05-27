import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TurfAdminLogin from "../Pages/Turf-Admin/Login";
import TurfRegisterPage from "../Pages/Turf-Admin/Register";
import TurfAdminHome from "../Pages/Turf-Admin/Home";
import GroundList from "../Pages/Turf-Admin/GroundList";
import GroundAdd from "../Pages/Turf-Admin/GroundAdd";
import GroundView from "../Pages/Turf-Admin/GroundView";
import AddEvent from "../Pages/Turf-Admin/AddEvent";
import EditEvent from "../Pages/Turf-Admin/EditEvent";
import Profile from "../Pages/Turf-Admin/Profile";
import Booking from "../Pages/Turf-Admin/Booking";
import Error from "../Pages/Turf-Admin/Error";
import Reviews from "../Pages/Turf-Admin/Reviews";
import Chat from "../Pages/Turf-Admin/Chat";
import AddBooking from "../Pages/Turf-Admin/AddBooking";
import AddBookingView from "../Pages/Turf-Admin/AddBookingView";

function TurfAdminRouter() {
    const isAuth = useSelector((state) => state.turfAdminLogin.token);
    console.log(isAuth, "TurfAdmin Token");
    return (
        <div>
            <Routes>
                <Route path="/login" element={isAuth ? <TurfAdminHome /> : <TurfAdminLogin />} />
                <Route path="/register" element={<TurfRegisterPage />} />
                <Route path="/home" element={isAuth ? <TurfAdminHome /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/ground-list" element={isAuth ? <GroundList /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/ground-add" element={isAuth ? <GroundAdd /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/ground-view/:id" element={isAuth ? <GroundView /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/add-event/:id" element={isAuth ? <AddEvent /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/edit-event/:id" element={isAuth ? <EditEvent /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/booking" element={isAuth ? <Booking /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/add-booking" element={isAuth ? <AddBooking /> : <Navigate to="/turf-admin/login" />} />
                <Route
                    path="/booking-ground-view/:id"
                    element={isAuth ? <AddBookingView /> : <Navigate to="/turf-admin/login" />}
                />
                <Route path="/reviews" element={isAuth ? <Reviews /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/admin-chat" element={isAuth ? <Chat /> : <Navigate to="/turf-admin/login" />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default TurfAdminRouter;
