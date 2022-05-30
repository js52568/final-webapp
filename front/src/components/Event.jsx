import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddParticipants from "./AddParticipants";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

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
      //console.log(labeledUsers);

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
  
    let role = "";
    if (user._id === event.host) {
      role = "host";
    }
    else if (event.participantsIds.includes(user._id) && user._id !== event.host) {
          role = "participant";
      }
    else {
      role = "not-participating";
    }
  
    function addParticipant(){
        setAddParticipants(true);
    }

    function cancelAdd() {
        setAddParticipants(false);
    }

    function add(nick) {
        setParticipants(oldPart => [...oldPart,nick]);
        const data = nick;
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          fetch(myUrl + "/participants", options).then(res => {
            if (res.status === 200) {
              console.log("Success");
            } else {
              console.log("Participants add failed");
            }
          });
        if (user._id === nick._id){
          window.open("http://localhost:3000" + myUrl,"_self");     //ruzan nacin
        }
    }

    function removePart(id) {
      let newParticipants = participants.filter(part => part._id !== id);
      setParticipants(newParticipants);
      let newParticipantsIds = newParticipants.map(part => part._id);
      const data = {
        newParticipantsIds: newParticipantsIds,
        userId: id
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(myUrl + "/removeParticipant", options).then(res => {
        if (res.status === 200) {
          console.log("Success");
        } else {
          console.log("Remove participant failed");
        }
      });
      if (id === user._id){
        window.open("http://localhost:3000" + myUrl,"_self");   //ruzan nacin
      }

    }

    function cancelEvent(){}

    //function cancelParticipation() {}

    //function joinEvent() {}

    function isValidTry() {
        return participants.length < event.maxParticipants;
    }

    function isValidAdd(nick) {
        let partNicknames = participants.map(part => part.nickname);
        return !(partNicknames.includes(nick.nickname));
    }

    function isFull() {
      return participants.length >= event.maxParticipants;
    }

    return (
        <div class="jumbotron centered">
    <div className="container">
      <h1>{event.name}</h1>
        <p>{event._id}</p>
        <p>Sport: {event.sport}</p>
        <p>Description: {event.description}</p>
        <label>Participants:</label>
        {participants.map((part) => 
        <div>
        <p onClick={() => toUser(part._id)}>{part.nickname}</p>
        {(role === "host" && event.host !== part._id) && <Button onClick={() => removePart(part._id)} 
        className="btn btn-light btn-lg" variant="outlined" startIcon={<DeleteIcon />}>
        Remove
      </Button>}
      {event.host === part._id && <StarIcon/>}
        </div>
        )}         
        {(role === "host" && addParticipants === false) && 
        <button className="btn btn-light btn-lg" onClick={addParticipant} disabled={!isValidTry()}>Add participants</button>}        
        {addParticipants === true &&      
        <AddParticipants users={labeledUsers} isValid={(nick) => isValidAdd(nick)} cancelAdd={cancelAdd} onClick={(nick) => add(nick)}/>
        } 
        <p>Capacity: {participants.length}/{event.maxParticipants}</p>     
        <p>Activity: {activity}</p>  
        {role === "host" && <button className="btn btn-light btn-lg" onClick={cancelEvent}>Cancel event</button>} 
        {role === "participant" && <button className="btn btn-light btn-lg" onClick={() => removePart(user._id)}>Cancel</button>}
        {role === "not-participating" && <button disabled={isFull()} className="btn btn-light btn-lg" onClick={() => add(user)}>Join</button>}
      
    </div>
  </div>
        
          
    )           

}

export default Event;