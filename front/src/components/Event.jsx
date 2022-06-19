import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddParticipants from "./AddParticipants";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Event(){
    let navigate = useNavigate();
    const [event,setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [user,setUser] = useState({});
    const [addParticipants, setAddParticipants] = useState(false);
    const [users,setUsers] = useState([]);
    const [role,setRole] = useState("");
    const [activity,setActivity] = useState("");
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/events/" + id;

    function getLabels() {
      let labeledUsers = users.map(user => ({
        ...user,label: user.nickname
      }));
      return labeledUsers;
    }
    /* let labeledUsers = users.map(user => ({
        ...user,label: user.nickname
      })); */
      //console.log(labeledUsers);

    useEffect(() => {        
        fetch(myUrl).then(data => data.json()).then(event => setEvent(event));     
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

    useEffect(() => {
        fetch(myUrl + "/getRole").then(data => data.json()).then(role => setRole(role.role));
    }, []);

    useEffect(() => {
      fetch(myUrl + "/getActivity").then(data => data.json()).then(activity => setActivity(activity.activity));
  }, []);

    //let activity = "Not working yet"    //take care of it
    /* const currentDate = new Date();
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
    } */
  
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
          setRole("participant");
          //window.open("http://localhost:3000" + myUrl,"_self");     //ruzan nacin, zamijeniti role
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
        setRole("not-participating");                                                 
        //window.open("http://localhost:3000" + myUrl,"_self");   //ruzan nacin
      }

    }

    function cancelEvent(){
      const data = {
        participants: participants
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(myUrl + "/cancelEvent", options).then(res => {
        if (res.status === 200) {
          console.log("Success");
          navigate("/main");
        } else {
          console.log("Cancel event failed");
        }
      });
    }

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
      <body>
      <header class="masthead bg-primary">
      <div>
      <div className="container">
        <h1 class="masthead-heading mb-0 text-center text-white">{event.name}</h1>
        <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
          <br/>
          <div class="container text-center text-white">
                <div class="row">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Sport</h4>
                        <p class="lead mb-0">
                        {event.sport}
                        </p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">Information</h4>
                        <p class="lead mb-0">
                        {event.description}
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h4 class="text-uppercase mb-4">Date</h4>
                        <p class="lead mb-0">
                            Starting: {event.startTime}
                            <br/>
                            Ending: {event.endTime}
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Location</h4>
                        <p class="lead mb-0">
                            <LocationOnIcon/> {event.locationAddress}
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Capacity</h4>
                        <p class="lead mb-0">
                        {participants.length}/{event.maxParticipants} <PersonIcon/>
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Host</h4>
                        <p class="lead mb-0">
                          {participants.filter(part => part._id === event.host).map(part => (
                            <p onClick={() => toUser(part._id)}>{part.nickname}</p>
                          ))}
                        </p>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <hr className="text-white"/>
            <h1 className="text-center text-white">Participants</h1>
      </div>
    </div>
    </header>
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
    /* return ( 
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
        <AddParticipants users={getLabels()} isValid={(nick) => isValidAdd(nick)} cancelAdd={cancelAdd} onClick={(nick) => add(nick)}/>
        } 
        <p>Capacity: {participants.length}/{event.maxParticipants}</p>     
        <p>Activity: {activity}</p>  
        {role === "host" && <button className="btn btn-light btn-lg" onClick={cancelEvent}>Cancel event</button>} 
        {role === "participant" && <button className="btn btn-light btn-lg" onClick={() => removePart(user._id)}>Cancel</button>}
        {role === "not-participating" && <button disabled={isFull()} className="btn btn-light btn-lg" onClick={() => add(user)}>Join</button>}
      
    </div>
  </div> */
        
          
    )           

}

export default Event;