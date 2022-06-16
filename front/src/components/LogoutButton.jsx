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

    // return <button className="btn btn-light btn-lg" type="submit" onClick={onClick}>Log Out</button>
    return <a class="nav-link py-3 px-0 px-lg-3 rounded" onClick={onClick} href="login">Logout</a>;
}

export default LogoutButton;