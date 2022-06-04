import React from "react";
import {useNavigate} from "react-router-dom";

function LogoutButton(props) {
    let navigate = useNavigate();

    function onClick(e) {
        e.preventDefault();
        fetch("/logout");
        props.onLogout();
        navigate("/");
    }

    return <button className="btn btn-light btn-lg" type="submit" onClick={onClick}>Log Out</button>
}

export default LogoutButton;