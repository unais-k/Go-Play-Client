import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLogout } from "../../../../Utils/Store/Slice/Client";

function SidebarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = [
        { title: "Profile", path: "/profile" },
        { title: "Booking", path: "/booking" },
        { title: "Event Booked", path: "/event-booking" },
        { title: "Change Password", path: "/change-password" },
    ];
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/");
    };
    return (
        <div className="me-4">
            <div className="font-bold text-3xl text-lime-600 mb-2">Welcome</div>
            <div className="grid m-auto w-full h-10">
                {data.map((res) => {
                    return (
                        <NavLink
                            to={res.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "ps-3 py-2 text-dark hover:text-white bg-gray-300 hover:bg-gray-400 font-normal rounded font-serif"
                                    : "ps-3 py-2 text-dark bg-white font-normal font-serif"
                            }
                        >
                            {res.title}
                        </NavLink>
                    );
                })}
                <div onClick={handleLogout} className={"ps-3 py-2 text-dark bg-white font-normal font-serif"}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default SidebarComponent;
