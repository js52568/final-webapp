import React, { useState, useEffect  } from "react";
import User from "./User";

function UserList() {

    const [users, setUsers] = useState([]);
    //const [user, setUser] = useState({});

    useEffect(() => {
        fetch("/users").then(data => data.json()).then(users => setUsers(users))
    }, []);

    
    return <div>
    {users.map((user,index) => <User key={index} name={user.name} username={user.username}/>)}
</div>;
}

export default UserList;

/* <div>
        {users.map((user,index) => <User key={index} name={user.name} username={user.username}/>)}
    </div> */

    /* useEffect(() => {
        fetch("/users").then(data => data.json()).then(users => setUsers(users))
    }, []);
    console.log(users); */