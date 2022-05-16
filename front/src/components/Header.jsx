import React from "react";
import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";

function Header(props) {
    function onLogout() {
        props.onLogout();
    }
    return (
        <header>
          <LogoutButton onLogout={onLogout}/>
          <Link to="/newevent" className="btn btn-light btn-lg">New Event</Link>
          <Link to="/profile" className="btn btn-light btn-lg">Profile</Link>  
        </header>
    )
}

export default Header;

/* <Link to="/users">Users</Link>
            <Link to="/users/new">Add user</Link> */