import React from "react";
import { Link } from "react-router-dom";

function UserComponent(props){


    return (
        <div>
        <Link to={"/users/" + props.id}><h1>{props.nickname}</h1></Link>
        <p>{props.id}</p></div>
          
    )

}

export default UserComponent;