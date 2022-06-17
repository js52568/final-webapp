import React, {useState, useEffect} from "react";
import EventComponent from "./EventComponent";

function Main() {
  const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch("/events/explore").then(data => data.json()).then(events => setEvents(events))
    }, []);


    return <div class="masthead bg-primary text-white text-center">
    <div className="container">
    <h1 class="masthead-heading text-uppercase mb-0">Explore</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
      {events.map((event) => <EventComponent key = {event._id} id={event._id} name={event.name}/>)}
    </div>
  </div>
    /* return <div class="jumbotron text-center">
    <div className="container">
      <h1 className="display-3">Explore</h1>
      <p className="secret-text">new sporting events</p>
      <hr/>
      {events.map((event) => <EventComponent key = {event._id} id={event._id} name={event.name}/>)}
    </div>
  </div> */

}

export default Main;