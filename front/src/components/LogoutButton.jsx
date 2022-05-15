import axios from "axios";
import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { myContext } from "./Context";

function LogoutButton(props) {
    let navigate = useNavigate();
    const userObject = useContext(myContext);

    function onClick() {
        axios.get("/logout", {withCredentials: true}).then((res) => {
            if (res.data === "done") {
                props.onLogout();
                window.location.href = "/";
            }
        }
         )
       /*  e.preventDefault();
        fetch("/logout");
        props.onLogout();
        navigate("/"); */
    }

    return <button className="btn btn-light btn-lg" type="submit" onClick={onClick}>Log Out</button>
}

export default LogoutButton;