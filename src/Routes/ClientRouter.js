import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from "../Pages/Client/ForgetPassword";
import { useSelector } from "react-redux";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";
import Otp from "../Pages/Client/Otp";
import Register from "../Pages/Client/Register";
import Football from "../Pages/Client/Football";
import GroundPage from "../Pages/Client/GroundPage";
import Payment from "../Pages/Client/Payment";
import Profile from "../Pages/Client/Profile";
import Booking from "../Pages/Client/Booking";
import BookingView from "../Pages/Client/BookingView";
import Error from "../Pages/Client/Error";
import EventPage from "../Pages/Client/Event";
import EventPayment from "../Pages/Client/EventPayment";
import EventBook from "../Pages/Client/EventBook";
import EventBookingView from "../Pages/Client/EventBookingView";
import BusinessIntro from "../Pages/Layouts/BusinessIntro";
import ChangePassword from "../Pages/Client/ChangePassword";
function ClientRouter() {
    const isAuth = useSelector((state) => state.userLogin.token);
    console.log(isAuth, "Client Token");
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/business-intro" element={<BusinessIntro />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/forget_password" element={<ForgetPassword />} />
                <Route path="/football-turfs" element={<Football />} />
                <Route path="/ground-view/:id" element={<GroundPage />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/payment" element={isAuth ? <Payment /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/booking" element={isAuth ? <Booking /> : <Navigate to="/login" />} />
                <Route path="/change-password" element={isAuth ? <ChangePassword /> : <Navigate to="/login" />} />
                <Route path="/event-booking" element={isAuth ? <EventBook /> : <Navigate to="/login" />} />
                <Route path="/event-payment" element={isAuth ? <EventPayment /> : <Navigate to="/login" />} />
                <Route path="/event-booking-view/:id" element={isAuth ? <EventBookingView /> : <Navigate to="/login" />} />
                <Route path="/booking-view/:id" element={isAuth ? <BookingView /> : <Navigate to="/login" />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default ClientRouter;
