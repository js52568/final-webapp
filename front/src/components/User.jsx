import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function User(){
    const [user,setUser] = useState({nickname:"", _id: ""});
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/users/" + id;

    useEffect(() => {        
        fetch(myUrl).then(data => data.json()).then(user => setUser(user))       
    }, []);


    return (
        <div>
        <h1>{user.nickname}</h1>
        <p>{user._id}</p></div>
          
    )

}

export default User;