import React, {useState, useEffect} from "react";
import UserComponent from "./UserComponent";

function Users(props){
    const [users,setUsers] = useState([]);

    useEffect(() => {
        fetch("/users").then(data => data.json()).then(users => setUsers(users))
    }, []);

    

    return <div>
    <h1>Users</h1>
    {users.map((user) => <UserComponent key = {user._id} id={user._id} nickname={user.nickname}/>)}
    </div>;

}

export default Users;