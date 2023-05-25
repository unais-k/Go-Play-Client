import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";
import { EditEventReqApi, EventDetailFetchReqApi } from "../../../../API/Services/TurfAdminRequest";
import EditLabelComponent from "../Components/EditLabelComponent";
import TimeSlotComponent from "../TimeSlotComponent";
import Loader from "../../Layout/Loader";
import { message } from "antd";

function EditEventComponent() {
    const navigate = useNavigate();
    const params = useParams();
    const eventId = params.id;

    const [eventData, setEventData] = useState([]);
    const [time, setTime] = useState([]);

    const [loader, setLoader] = useState(false);
    const [sport, setSport] = useState([]);
    const [formData, setFormData] = useState({
        groundName: "",
        size: "",
        type: "",
        price: "",
        priceAtNight: "",
    });
    const token = useSelector((state) => state.turfAdminLogin.token);

    const eventDetail = async () => {
        setLoader(true);
        const response = await EventDetailFetchReqApi(eventId, token);

        const result = response.data.result;
        setEventData(response.data.result);
        setFormData({
            groundName: result.groundName,
            size: result.size,
            type: result.type,
            price: result.price,
            priceAtNight: result.priceAtNight,
        });
        setTime(response.data.result.slots);
        setSport(response.data.result.eventAvailable);
        setLoader(false);
    };

    const size = [
        { name: "5 * 5" },
        { name: "6 * 6" },
        { name: "7 * 7" },
        { name: "8 * 8" },
        { name: "10 * 10" },
        { name: "11 * 11" },
    ];

    const type = [{ name: "Turf" }, { name: "Soapy" }, { name: "Grass" }, { name: "Sand" }, { name: "Court" }];
    useEffect(() => {
        if (params) {
            eventDetail();
        }
    }, [params]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckboxSport = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSport([...sport, value]);
        } else {
            setSport(sport.filter((e) => e !== value));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const response = await EditEventReqApi({ sport: sport, data: formData, eventId: eventId }, token);
        message.success("Ground Edited");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            {loader && <Loader />}
            <div className="mt-10 ms-10 uppercase font-bold text-sm bg-stone-200 px-3 py-2 w-fit" onClick={handleBack}>
                back
            </div>
            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full">
                {/* <form> */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
                        <div className="col-span-2">
                            <input
                                type="groundName"
                                name="groundName"
                                defaultValue={eventData?.groundName}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ground name"
                            />
                        </div>
                        <div className="col-span-2 ">
                            <EditLabelComponent sport={sport} handleCheckboxSport={handleCheckboxSport} />
                        </div>

                        <div className="col-span-2">
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="text"
                                onChange={handleInputChange}
                                name="type"
                            >
                                <option value="">{eventData?.type}</option>
                                {type.map((obj, ind) => {
                                    return <option key={ind}>{obj.name}</option>;
                                })}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="text"
                                onChange={handleInputChange}
                                name="size"
                            >
                                <option value="">{eventData?.size}</option>
                                {size.map((obj, index) => {
                                    return <option key={index + 4444}>{obj.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <input
                                type="price"
                                defaultValue={eventData?.price}
                                name="price"
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Price"
                            />
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <input
                                type="priceAtNight"
                                defaultValue={eventData?.priceAtNight}
                                onChange={handleInputChange}
                                name="priceAtNight"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Price at night"
                            />
                        </div>

                        <div className="col-span-2 text-right">
                            <button className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32" type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                {eventData && time ? <TimeSlotComponent eventData={eventData} time={time} /> : ""}
            </div>
        </div>
    );
}

export default EditEventComponent;
