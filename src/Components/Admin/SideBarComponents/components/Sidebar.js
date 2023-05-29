import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsArrowLeftCircle, BsBorderWidth, BsChatDotsFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { MdAnalytics, MdAdminPanelSettings, MdSettings, MdPhotoLibrary } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import HamburgerButton from "../HamburgerMenuButton/HamburgerButton";
import { setLogout } from "../../../../Utils/Store/Slice/Admin";
import { FaCity } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);
    const location = useLocation();

    const Menus = [
        { title: "Dashboard", path: "/admin/dash", src: <MdAnalytics /> },
        {
            title: "Notification",
            path: "/admin/notification",
            src: <IoIosNotifications />,
        },
        { title: "Grounds", path: "/admin/ground-list", src: <BiFootball /> },
        {
            title: "Ground-Admin",
            path: "/admin/owner-list",
            src: <MdAdminPanelSettings />,
        },
        {
            title: "Chat",
            path: "/admin/chat",
            src: <BsChatDotsFill />,
        },
        { title: "Bookings", path: "/admin/booking-list", src: <BsBorderWidth /> },
        { title: "customer", path: "/admin/client-list", src: <HiUsers /> },
        { title: "Add City", path: "/admin/add-city", src: <FaCity /> },
        { title: "Banner", path: "/admin/banner", src: <MdPhotoLibrary /> },
    ];
    const handleLogout = () => {
        navigate("/admin");
        dispatch(setLogout());
    };

    return (
        <>
            <div
                className={`${
                    open ? "w-60" : "w-fit"
                } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
            >
                <BsArrowLeftCircle
                    className={`${
                        !open && "rotate-180"
                    } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
                    onClick={() => setOpen(!open)}
                />
                <Link to="/">
                    <div className={`flex ${open && "gap-x-4"} items-center`}>
                        <img src="/logo-no-background.png" alt="" className="w-14 h-9" />
                        {open && <span className="text-xl font-admin whitespace-nowrap dark:text-white">Go-Play</span>}
                    </div>
                </Link>

                <ul className="pt-6">
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? "mt-9" : "mt-2"} ${location.pathname === menu.path && "bg-gray-200 dark:bg-gray-700"}`}
                            >
                                <span className="text-2xl">{menu.src}</span>
                                <span className={`${!open && "hidden"} origin-left duration-300 hover:block`}>
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}

                    <li
                        className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700  'bg-gray-200 dark:bg-gray-700' }`}
                        onClick={handleLogout}
                    >
                        <span className="text-2xl">
                            <GrLogout />
                        </span>
                        <span className={`${!open && "hidden"} origin-left duration-300 hover:block`}>Logout</span>
                    </li>
                </ul>
            </div>
            {/* Mobile Menu */}
            <div className="pt-3">
                <HamburgerButton setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
            </div>
            <div className="sm:hidden">
                <div
                    className={`${
                        mobileMenu ? "flex" : "hidden"
                    } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
                >
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index} onClick={() => setMobileMenu(false)}>
                            <span
                                className={` ${
                                    location.pathname === menu.path && "bg-gray-200 dark:bg-gray-700"
                                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
                            >
                                {menu.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
