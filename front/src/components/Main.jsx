import React, {useState, useEffect} from "react";
import EventComponent from "./EventComponent";
import Box from '@mui/material/Box';

function Main() {
  const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch("/events/explore").then(data => data.json()).then(events => setEvents(events))
    }, []);


    return <body><div class="masthead bg-primary text-white text-center">
    <div className="container">
    <h1 class="masthead-heading text-uppercase mb-0">Explore</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <div className="grid-container container">
      {events.map((event) => <EventComponent className="grid-item" key = {event._id} id={event._id} sport={event.sport} name={event.name} 
      maxParticipants={event.maxParticipants} numOfPart={event.participantsIds.length} host={event.host} startDate={event.startDate}
      locationAddress={event.locationAddress} my={false}
      />)}
      
      </div>
      
    </div>
  </div>
  <footer class="footer text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Location</h4>
                        <p class="lead mb-0">
                            Fakultet Elektrotehnike i Računarstva
                            <br />
                            Unska ul. 3, 10000, Zagreb
                        </p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">About SportEve</h4>
                        <p class="lead mb-0">
                            Free to use app for creating sporting events.
                            Try it out!
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h4 class="text-uppercase mb-4">About Me</h4>
                        <p class="lead mb-0">
                            A student at FER, I love sports and web development.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <div class="copyright py-4 text-center text-white">
            <div class="container"><small>Copyright &copy; SportEve 2022</small></div>
        </div>
        </body>
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