import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddParticipants from "./AddParticipants";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Event(){
    let navigate = useNavigate();
    const [event,setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [user,setUser] = useState({});
    const [addParticipants, setAddParticipants] = useState(false);
    const [users,setUsers] = useState([]);
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/events/" + id;

    let labeledUsers = users.map(user => ({
        ...user,label: user.nickname
      }));
      console.log(labeledUsers);

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

    useEffect(() => {
        fetch("/users").then(data => data.json()).then(users => setUsers(users))
    }, []);

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

    function addParticipant(){
        setAddParticipants(true);
    }

    function cancelAdd() {
        setAddParticipants(false);
    }

    function add() {}

    function onSubmit() {}

    function cancelEvent(){}

    function cancelParticipation() {}

    function joinEvent() {}

    function isValid() {
        return true;
    }

    return (
        <div class="jumbotron centered">
    <div className="container">
      <h1>{event.name}</h1>
        <p>{event._id}</p>
        <p>Sport: {event.sport}</p>
        <p>Description: {event.description}</p>
        <label>Participants:</label>
        {participants.map((user) => 
        <div>
        <p onClick={() => toUser(user._id)}>{user.nickname}</p>
        {role === "host" && <Button className="btn btn-light btn-lg" variant="outlined" startIcon={<DeleteIcon />}>
        Remove
      </Button>}
        </div>
        )}         
        {(role === "host" && addParticipants === false) && 
        <button className="btn btn-light btn-lg" onClick={addParticipant} disabled={!isValid()}>Add participants</button>}        
        {addParticipants === true &&      
        <AddParticipants users={labeledUsers} />
        } 
        <p>Capacity: {participants.length}/{event.maxParticipants}</p>     
        <p>Activity: {activity}</p>  
        {role === "host" && <button className="btn btn-light btn-lg" onClick={cancelEvent}>Cancel event</button>} 
        {role === "participant" && <button className="btn btn-light btn-lg" onClick={cancelParticipation}>Cancel</button>}
        {role === "not-participating" && <button className="btn btn-light btn-lg" onClick={joinEvent}>Join</button>}
      
    </div>
  </div>
        
          
    )           

}

export default Event;