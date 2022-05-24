import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Event(){
    let navigate = useNavigate();
    const [event,setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [user,setUser] = useState({});
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/events/" + id;

    useEffect(() => {        
        fetch(myUrl).then(data => data.json()).then(event => setEvent(event))       
    }, []);

    useEffect(() => {        
        fetch(myUrl + "/participants").then(data => data.json()).then(participants => setParticipants(participants))       
    }, []);

    useEffect(() => {
        fetch("/profile").then(data => data.json()).then(user => setUser(user))
    },[]);

    function toUser(id) {
        navigate("/users/" + id);
    }

    const currentDate = new Date();
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    let activity = "";
    if (currentDate < startTime) {
        activity = "Upcoming";
    }  
    else if  (currentDate > endTime) {
        activity = "Ended";
    } else {
        activity = "Live";
    }

    let role = "not-participating"
    if (user._id === event.host) {
        role = "host";
    }
    else if (user.nickname in participants && user._id !== event.host) {
        role = "participant";
    }

    function addParticipant(){}

    return (
        <div>
        <h1>{event.name}</h1>
        <p>{event._id}</p>
        <p>Sport: {event.sport}</p>
        <label>Participants:</label>
        {participants.map((user) => 
        <div>
        <p onClick={() => toUser(user._id)}>{user.nickname}</p>
        {role === "host" && <button>Remove</button>}
        </div>
        )}
        <p>Capacity: {participants.length}/{event.maxParticipants}</p> 
        {role === "host" && <button className="btn btn-light btn-lg" onClick={addParticipant}>Add participants</button>}       
        <p>Activity: {activity}</p>  
               
        </div>
          
    )           

}

export default Event;