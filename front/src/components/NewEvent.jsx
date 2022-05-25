import React, {useState, useEffect} from "react";
import InputField from "./InputField";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function NewEvent() {
    let navigate = useNavigate();
    const [form, setForm] = useState({name:"", sport:"", maxParticipants:1,description:"",startTime:"2022-06-12T19:30",endTime:"2022-06-12T19:30"});
    const [error, setError] = useState("");
    const [users,setUsers] = useState([]);

    useEffect(() => {
      fetch("/users").then(data => data.json()).then(users => setUsers(users))
  }, []);

    let labeledUsers = users.map(user => ({
      ...user,label: user.nickname
    }));
    //console.log(labeledUsers)

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({
          ...oldForm,[name]: value
        }))
      }

      function onSubmit(e) {
        e.preventDefault();
        setError("");
        const data = {
          name: form.name,
          sport: form.sport,
          maxParticipants: form.maxParticipants,
          description: form.description,
          startTime: form.startTime,
          endTime: form.endTime
        };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch("/newevent", options).then(res => {
          if (res.status === 200) {
            //props.onLogin();
            navigate("/main");
          } else {
            setError("Event creation failed");
          }
        });
      }

      function isValid() {
        const {name,sport,maxParticipants, startTime,endTime} = form;
        return name.length > 0 && sport.length > 0 && maxParticipants > 0 && endTime > startTime;
      }

    return <div className="container mt-5">
    <h1>Create a new event</h1>
  
    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
  
            <form onSubmit={onSubmit}>
                <InputField name="name" label="Name" type="text" onChange={onChange} value={form.name}/>
                <InputField name="sport" label="Sport" type="text" onChange={onChange} value={form.sport}/>
                <InputField name="maxParticipants" label="Max number of participants" type="number" onChange={onChange} value={form.maxParticipants}/>
                <InputField name="description" label="Description" type="text" onChange={onChange} value={form.description} size="100"/>
                <InputField name="startTime" label="Start time" type="datetime-local" onChange={onChange} value={form.startTime}/>
                <InputField name="endTime" label="End time" type="datetime-local" onChange={onChange} value={form.endTime}/>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={labeledUsers || ""}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Add participants" />}
                />
              
                <button type="submit" className="btn btn-dark" disabled={!isValid()}>Create</button>          
            </form>
            <p>{error}</p>
  
          </div>
        </div>
      </div>
      </div>
  </div>

}

export default NewEvent;