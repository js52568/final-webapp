import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Event(){
    const [event,setEvent] = useState({name:"", id: ""});
    const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    setCurrId(id);
    let myUrl = "/events/" + currId;

    useEffect(() => {
        fetch(myUrl).then(data => data.json()).then(event => setEvent(event))       //ovo jos ne radi
    }, []);


    return (
        <div>
        <h1>{event.name}</h1>
        <p>{event.id}</p></div>
          
    )

}

export default Event;