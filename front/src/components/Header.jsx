import React from "react";
import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";

function Header(props) {
    function onLogout() {
        props.onLogout();
    }
    return (
        <div>
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
          <a class="navbar-brand" href=" ">SportEve</a>
          <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item mx-0 mx-lg-1"><LogoutButton onLogout={onLogout}/></li>
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="newevent">New Event</a></li>
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="profile">Profile</a></li>
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="myevents">My Events</a></li>
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="main">Main Page</a></li>
              </ul>
          </div>
      </div>
    </nav>
    <header class="mastheadSmall bg-primary text-white text-center">
      </header>
      </div>
    )
    /* return (
        <header>
          <LogoutButton onLogout={onLogout}/>
          <Link to="/newevent" className="btn btn-light btn-lg">New Event</Link>
          <Link to="/profile" className="btn btn-light btn-lg">Profile</Link>  
          <Link to="/myevents" className="btn btn-light btn-lg">My Events</Link>
          <Link to="/main" className="btn btn-light btn-lg">Main Page</Link>
        </header>
    ) */
}

export default Header;

/* <Link to="/users">Users</Link>
            <Link to="/users/new">Add user</Link> */