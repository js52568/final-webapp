import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function UserForm(props) {

    let navigate = useNavigate();

    const [form,setForm] = useState({
        name: "",
        username: ""
    });

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]:value}))
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            name: form.name,
            username: form.username
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch("/users", options);
        navigate("/users");
        /* .then(response => {
            props.history.push("/users");
        }) */

    }

    return (
        <div>
            <h2>New User</h2>
            <form onSubmit={onSubmit}>
            <div>
               <label>NAME</label> 
               <input name="name" onChange={onChange} value={form.name}/>
            </div>
            <div>
               <label>USERNAME</label> 
               <input name="username" onChange={onChange} value={form.username}/>
            </div>
            <button type="submit">Add user</button>
            </form>
        </div>
    )
}

export default UserForm;