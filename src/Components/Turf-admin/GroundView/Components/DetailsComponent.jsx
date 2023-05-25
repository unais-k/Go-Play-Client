import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import ButtonSubmit from "../../Layout/ButtonSubmit";
import { GroundDetailSubmitReqApi } from "../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { GroundViewReqApi } from "../../../../API/Services/TurfAdminRequest";

function DetailsComponent({ groundId }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [state, setState] = useState({});

    const [formData, setFormData] = useState({
        startingTime: "",
        closingTime: "",
    });
    const groundDetail = async () => {
        const response = await GroundViewReqApi(groundId, token);
        if (response.status === 201) {
            setState(response.data.result);
        }
    };

    useEffect(() => {
        groundDetail();
    }, [token]);
    const [holiday, setHoliday] = useState([]);
    const [sport, setSport] = useState([]);

    const handleCheckboxSport = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSport([...sport, value]);
        } else {
            setSport(sport.filter((e) => e !== value));
        }
    };

    const handleCheckboxHoliday = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setHoliday([...holiday, value]);
        } else {
            setHoliday(holiday.filter((e) => e !== value));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = GroundDetailSubmitReqApi({ data: formData, holiday: holiday, sport: sport }, groundId, token);
    };
    return (
        <div>
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-green-500">
                    <BiAddToQueue size={20} />
                </span>
                <span className="tracking-wide">Details</span>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <ul className="list-inside space-y-2">
                    <li className="flex justify-between">
                        <div className="flex flex-col ms-3">
                            <label className="text-gray-500 text-xs">
                                Starting time
                                <input type="time" onChange={handleChange} name="startingTime" className="rounded" />
                            </label>
                        </div>
                        <div className="flex flex-col me-3">
                            <label className="text-gray-500 text-xs ">
                                Ending time
                                <input type="time" onChange={handleChange} name="closingTime" className="rounded" />
                            </label>
                        </div>
                    </li>
                    <li>
                        <label className="text-teal-600 text-sms mt-2">Sport Available</label>
                        <ul className="flex text-xs flex-wrap">
                            {state.length > 0 && state ? (
                                <>
                                    {state.map((res) => {
                                        return (
                                            <li className="me-2">
                                                <label>
                                                    {res.name}
                                                    <input type="checkbox" onClick={handleCheckboxSport} value="Football" />
                                                </label>
                                            </li>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <li className="me-2">
                                        <label>
                                            football
                                            <input type="checkbox" onClick={handleCheckboxSport} value="Football" />
                                        </label>
                                    </li>
                                    <li className="me-2">
                                        <label>
                                            cricket
                                            <input type="checkbox" value="Cricket" onClick={handleCheckboxSport} />
                                        </label>
                                    </li>
                                    <li className="me-2">
                                        <label>
                                            volleyball
                                            <input type="checkbox" value="Volley ball" onClick={handleCheckboxSport} />
                                        </label>
                                    </li>
                                    <li className="me-2">
                                        <label>
                                            tennis
                                            <input type="checkbox" value="Tennis" onClick={handleCheckboxSport} />
                                        </label>
                                    </li>
                                    <li className="me-2">
                                        <label>
                                            badminton
                                            <input type="checkbox" value="Badminton" onClick={handleCheckboxSport} />
                                        </label>
                                    </li>
                                    <li className="me-2">
                                        <label>
                                            basketball
                                            <input type="checkbox" value="Basket ball" onClick={handleCheckboxSport} />
                                        </label>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                    <li>
                        <label className="text-teal-600 text-sms my-2">Holiday</label>
                        <ul className="flex text-xs flex-wrap">
                            <li className="me-2">
                                <label>
                                    Monday
                                    <input type="checkbox" value="Monday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Tuesday
                                    <input type="checkbox" value="Tuesday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Wednesday
                                    <input type="checkbox" value="Wednesday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Thursday
                                    <input type="checkbox" value="Thursday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Friday
                                    <input type="checkbox" value="Friday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Saturday
                                    <input type="checkbox" value="Saturday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                            <li className="me-2">
                                <label>
                                    Sunday
                                    <input type="checkbox" value="Sunday" onClick={handleCheckboxHoliday} />
                                </label>
                            </li>
                        </ul>
                    </li>
                    {/* <li>
                        <div className="text-teal-600 text-sm">Enter rules of your Venue</div>
                        <TodoApp setState={setState} />
                    </li> */}
                </ul>
                <div>
                    <ButtonSubmit />
                </div>
            </form>
        </div>
    );
}

export default DetailsComponent;
