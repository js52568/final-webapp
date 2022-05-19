import React, {useState, useEffect} from "react";
import InputField from "./InputField";
import ProfileItem from "./ProfileItem";
import {useNavigate} from "react-router-dom";

function Profile() {
    let navigate = useNavigate();
    const [user,setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [form,setForm] = useState({nickname:user.nickname});

    useEffect(() => {
        fetch("/profile").then(data => data.json()).then(user => setUser(user))
    },[]);
    //fetch("/profile").then(data => data.json()).then(user => setUser(user));

    function onClick(e) {
        e.preventDefault();
        setEdit(true);
    }

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({
          ...oldForm,[name]: value
        }))
        setUser(oldUser => ({
          ...oldUser,[name]: value
        }))
      }

      function onSubmit(e) {
        e.preventDefault();
        const data = {
          nickname: form.nickname
        };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch("/profile/edit", options).then(res => {
          if (res.status === 200) {
            //props.onLogin();
            navigate("/profile");
            setEdit(false)
          } else {
            console.log("Error editing profile");
          }
        });
      }

      function isValid(){
          return true;
      }

    return  <div>
                <h1>Profile</h1>
                {edit ? 
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        <InputField name="nickname" label="Nickname" type="text" onChange={onChange} value={form.nickname}/>
                                        <button type="submit" className="btn btn-dark" disabled={!isValid()}>Submit</button>          
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                     :
                    <div>
                        <ProfileItem name="Id" value={user._id}/>
                        <ProfileItem name="Email" value={user.username ? user.username : "Signed in with Google"}/>
                        <ProfileItem name="Nickname" value={user.nickname ? user.nickname : " "}/>
                        <button className="btn btn-light btn-lg" type="submit" onClick={onClick}>Edit profile</button>
                    </div>
                     
                }
                
                
            </div>
}

export default Profile;
