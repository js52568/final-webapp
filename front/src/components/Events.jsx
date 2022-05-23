import React, {useState, useEffect} from "react";
import EventComponent from "./EventComponent";

function Events(props){
    const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch("/events").then(data => data.json()).then(events => setEvents(events))
    }, []);

    

    return <div>
    <h1>Events</h1>
    {events.map((event) => <EventComponent key = {event._id} id={event._id} name={event.name}/>)}
    </div>;

}

export default Events;