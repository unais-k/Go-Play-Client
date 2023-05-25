import { Breadcrumb } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiHome } from "react-icons/hi";
import TimeSlot from "../GroundView/Components/TimeSlot";
import { useNavigate, useParams } from "react-router-dom";
import { AddEventReqApi, GroundViewReqApi } from "../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import FormComponent from "./Components/FormComponent";

function AddEventComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.turfAdminLogin.token);
    const params = useParams();

    const [viewData, setViewData] = useState([]);
    const [time, setTime] = useState([]);
    const [addEvent, setAddEvent] = useState(true);
    const [showTime, setShowTime] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [sport, setSport] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        groundName: "",
        size: "",
        type: "",
        price: "",
        priceAtNight: "",
    });
    const groundId = params.id;

    const groundDetails = async () => {
        const response = await GroundViewReqApi(groundId, token);
        return response;
    };

    const handleCheckboxSport = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSport([...sport, value]);
        } else {
            setSport(sport.filter((e) => e !== value));
        }
    };

    const rows = [
        { index: "0", time: "12.00am", isSelected: false, status: false },
        { index: "1", time: "01.00am", isSelected: false, status: false },
        { index: "2", time: "02.00am", isSelected: false, status: false },
        { index: "3", time: "03.00am", isSelected: false, status: false },
        { index: "4", time: "04.00am", isSelected: false, status: false },
        { index: "5", time: "05.00am", isSelected: false, status: false },
        { index: "6", time: "06.00am", isSelected: false, status: false },
        { index: "7", time: "07.00am", isSelected: false, status: false },
        { index: "8", time: "08.00am", isSelected: false, status: false },
        { index: "9", time: "09.00am", isSelected: false, status: false },
        { index: "10", time: "10.00am", isSelected: false, status: false },
        { index: "11", time: "11.00am", isSelected: false, status: false },
        { index: "12", time: "12.00pm", isSelected: false, status: false },
        { index: "13", time: "01.00pm", isSelected: false, status: false },
        { index: "14", time: "02.00pm", isSelected: false, status: false },
        { index: "15", time: "03.00pm", isSelected: false, status: false },
        { index: "16", time: "04.00pm", isSelected: false, status: false },
        { index: "17", time: "05.00pm", isSelected: false, status: false },
        { index: "18", time: "06.00pm", isSelected: false, status: false },
        { index: "19", time: "07.00pm", isSelected: false, status: false },
        { index: "20", time: "08.00pm", isSelected: false, status: false },
        { index: "21", time: "09.00pm", isSelected: false, status: false },
        { index: "22", time: "10.00pm", isSelected: false, status: false },
        { index: "23", time: "11.00pm", isSelected: false, status: false },
    ];
    useEffect(() => {
        if (groundId) {
            groundDetails().then((res) => {
                setViewData(res);
            });
        }
    }, [groundId]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const move = () => {
        movingDiv?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            formData.groundName === "" ||
            formData.size === "" ||
            formData.price === "" ||
            formData.priceAtNight === "" ||
            formData.type === ""
        ) {
            message.error("All fields are required");
            return false;
        }
        if (sport.length === 0) {
            message.error("Choose a sport");
        }

        const response = await AddEventReqApi({ groundId: groundId, sport: sport, data: formData, slots: rows }, token);

        if (response.status === 201) {
            message.success("Event added");
            setEventData(response.data.result);
            setTime(response.data.result.slots);
            setShowTime(true);
            setAddEvent(false);
            console.log(time);
            move();
        }
    };

    const movingDiv = useRef(null);

    return (
        <div>
            <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 py-3 px-5 dark:bg-gray-900">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Venue</Breadcrumb.Item>
                <Breadcrumb.Item>Add Event</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">
                    <div className="text-3xl mb-6 text-center ">Ready to build your Dream?</div>

                    {addEvent && (
                        <FormComponent
                            handleCheckboxSport={handleCheckboxSport}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {showTime && (
                        <div className="">
                            <TimeSlot mDiv={movingDiv} eventData={eventData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddEventComponent;
