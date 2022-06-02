import React, {useState, useEffect} from "react";
import EventComponent from "./EventComponent";

function MyEvents(props){
    const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch("events/myevents").then(data => data.json()).then(events => setEvents(events))
    }, []);
    console.log(events);

    return <div>
    <h1>Events</h1>
    {events.map((event) => <EventComponent key = {event._id} id={event._id} name={event.name}/>)}
    </div>;

}

export default MyEvents;