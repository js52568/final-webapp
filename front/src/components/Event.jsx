import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Event(){
    const [event,setEvent] = useState({});
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/events/" + id;

    useEffect(() => {        
        fetch(myUrl).then(data => data.json()).then(event => setEvent(event))       
    }, []);

    return (
        <div>
        <h1>{event.name}</h1>
        <p>{event._id}</p>
        <p>Sport: {event.sport}</p>
        <label>Participants</label>
        {event.participantsIds.map((user) => <p>{user}</p>)}            
        </div>
          
    )           //dodati onclick za usera i nastavi s ovim

}

export default Event;