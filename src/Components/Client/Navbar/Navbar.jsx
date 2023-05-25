import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NavbarPage.css";
import { setCityOn } from "../../../Utils/Store/Slice/Client";
import { LocationListReqApi } from "../../../API/Services/ClientRequest";
function NavbarPage(props) {
    const navigate = useNavigate();
    const [city, setCity] = useState(props.place);
    const handleHomePage = () => {
        navigate("/");
    };
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate("/login");
    };
    const handleProfile = () => {
        navigate("/profile");
    };
    const handleBusiness = () => {
        navigate("/business-intro");
    };
    const Location = useSelector((state) => state.userLogin.city);

    const [showModal, setShowModal] = React.useState(props.true);
    const [list, setList] = useState([]);

    useEffect(() => {
        cityListReq();
    }, [city]);

    const cityListReq = async () => {
        const response = await LocationListReqApi();
        if (response.status === 200) {
            setList(response.data.result);
        }
    };
    // setShowModal(props.true);

    const handleModal = (e) => {
        setShowModal(false);
        setCity(e.name);
        dispatch(setCityOn({ city: e.name }));
    };

    const token = useSelector((state) => state.userLogin.token);

    return (
        <header>
            <div className="logo-container">
                <div className="logo-left flex justify-between">
                    <a>
                        <img src="/logo-no-background.png" className="img-logo" alt="logo-left" />
                    </a>
                    <span className="go-play-logo font-bold text-xl" onClick={handleHomePage}>
                        Go Play
                    </span>
                </div>
                <div className="header-right pull-right ">
                    {/* <a className="text-lime-600" onClick={handleBusiness}>
                        For Business
                    </a> */}
                    {token ? (
                        ""
                    ) : (
                        <a className="text-lime-600" onClick={handleBusiness}>
                            For Business
                        </a>
                    )}
                    <a className="text-lime-600" onClick={() => setShowModal(true)}>
                        {city}
                    </a>
                    {showModal ? (
                        <>
                            <div className="justify-center items-left ms-24 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="border-0 bg-gray-400  relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-center border-2 border-solid border-slate-200 bg-gray-200">
                                            <h3 className="text-l font-semibold my-2">select your city</h3>
                                        </div>

                                        <div className="relative p-6 ">
                                            <ul className="flex flex-wrap w-[300px] h-fit">
                                                {list.map((res) => {
                                                    return (
                                                        <li
                                                            className="ms-2 me-2 my-1 text-stone-600"
                                                            key={res._id}
                                                            onClick={(e) => handleModal({ name: res.City })}
                                                        >
                                                            {res.City}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {token ? (
                        <a className="text-lime-600" onClick={handleProfile}>
                            My Account
                        </a>
                    ) : (
                        <a className="text-lime-600" onClick={handleLogin}>
                            Sign In
                        </a>
                    )}
                    <a className="log-btn text-white bg-amber-500"> Book online</a>
                </div>
            </div>
            <div className=""></div>
        </header>
    );
}

export default NavbarPage;
