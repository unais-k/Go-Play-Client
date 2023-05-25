import React from "react";
import { useLocation } from "react-router-dom";
import EventMainComponent from "./Components/EventMainComponent";

function EventComponent() {
    const location = useLocation();
    const state = location.state;
    console.log(location.state);
    return <div>{state && <EventMainComponent state={state} />}</div>;
}

export default EventComponent;
