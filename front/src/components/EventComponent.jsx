import React from "react";
import { Link } from "react-router-dom";

function EventComponent(props){
    return (
        <div>
        <Link to={"/events/" + props.id}><h1>{props.name}</h1></Link>
        <p>{props.id}</p></div>
          
    )

}

export default EventComponent;