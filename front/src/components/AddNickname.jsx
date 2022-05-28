import React, {useState} from "react";
import InputField from "./InputField";
import {useNavigate} from "react-router-dom";

function AddNickname(props) {
    let navigate = useNavigate();

    const [nickForm, setNickForm] = useState({nickname: ""});
    const [error, setError] = useState("");

    function onChange(event) {
        const {name, value} = event.target;
        setNickForm(oldForm => ({...oldForm, [name]: value}));   
      }

      function onSubmit(e) {
        e.preventDefault();
        setError("");
        const data = {
          nickname:nickForm.nickname
        };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch("/register/nickname", options).then(res => {
          if (res.status === 200) {
            navigate("/main");
          } else {
            setError("Set nickname failed");
          }
        });
      }

      function isValid() {
        const {nickname} = nickForm;
        return nickname.length > 0;
      }
    

    return (<div class="container mt-5">
    <h1>Add nickname</h1>
  
    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
  
            <form onSubmit={onSubmit}>
              <InputField name="nickname" label="Nickname" type="text" onChange={onChange} value={nickForm.nickname}/>
              <button type="submit" className="btn btn-dark" disabled={!isValid()}>Add</button>
            </form>
            <p>{error}</p>
  
          </div>
        </div>
      </div>
      </div>
      </div>);
}

export default AddNickname;