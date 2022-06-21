import React, {useState, useEffect} from "react";
import InputField from "./InputField";
import ProfileItem from "./ProfileItem";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';

function Profile() {
    let navigate = useNavigate();
    const [user,setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [form,setForm] = useState({nickname:user.nickname,fullName:user.fullName,description:user.description});

    useEffect(() => {
        fetch("/profile").then(data => data.json()).then(user => setUser(user))
    },[]);
    //fetch("/profile").then(data => data.json()).then(user => setUser(user));

    function onClick(e) {
        e.preventDefault();
        setEdit(true);
    }

    function cancelEdit(e) {
      e.preventDefault();
      setEdit(false);
  }

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({
          ...oldForm,[name]: value
        }))
        setUser(oldUser => ({         //ovo mozda treba biti kod submita
          ...oldUser,[name]: value
        }))
      }

      function onSubmit(e) {
        e.preventDefault();
        const data = {
          nickname: form.nickname,
          fullName: form.fullName,
          description: form.description
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
        const {nickname,fullName,description} = form;
          return nickname !== undefined && nickname.length > 0;
      }
      return  <body>
      <header class="masthead bg-primary">
                <div>
                <h1 class="masthead-heading mb-0 text-center text-white">Profile</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                {edit ? 
                  <Box
                    display="flex"
                    justifyContent="center"
                  >
                    <div className="container">
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        <InputField name="nickname" label="Nickname" type="text" onChange={onChange} value={form.nickname}/>
                                        <InputField name="fullName" label="Full Name" type="text" onChange={onChange} value={form.fullName}/>
                                        <InputField name="description" label="Description" type="text" onChange={onChange} value={form.description}/>
                                        <button type="submit" className="btn btn-dark" disabled={!isValid()}>Submit</button>          
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Box>
                     :
                     <div class="container text-center text-white">
                <div class="row">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Full name</h4>
                        <p class="lead mb-0">
                        {user.fullName}
                        </p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">Email</h4>
                        <p class="lead mb-0">
                        {user.username ? user.username : "Signed in with Google"}
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h4 class="text-uppercase mb-4">Nickname</h4>
                        <p class="lead mb-0">
                        {user.nickname}  
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Description</h4>
                        <p class="lead mb-0">
                        {user.description}  
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Year of birth</h4>
                        <p class="lead mb-0">
                        {user.yearOfBirth}
                        </p>
                    </div>
                    <div class="col-lg-4">
                    <br/>
                    <hr/>
                    <br/>
                        <h4 class="text-uppercase mb-4">Rating</h4>
                        <p class="lead mb-0">
                          
                        </p>
                    </div>
                </div>
            </div>
                     
                }
                
                
            </div>
            <br/>
            <hr className="text-white"/>
            {!edit ? <Box
            display="flex"
            justifyContent="center"
          >
            <button className="btn btn-light btn-lg" type="submit" onClick={onClick}>Edit profile</button>
            </Box> : <Box
            display="flex"
            justifyContent="center"
          >
            <button className="btn btn-light btn-lg" type="submit" onClick={cancelEdit}>Cancel</button>
            </Box>}
            </header>
            <footer class="footer text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Location</h4>
                        <p class="lead mb-0">
                            Fakultet Elektrotehnike i Računarstva
                            <br />
                            Unska ul. 3, 10000, Zagreb
                        </p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">About SportEve</h4>
                        <p class="lead mb-0">
                            Free to use app for creating sporting events.
                            Try it out!
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h4 class="text-uppercase mb-4">About Me</h4>
                        <p class="lead mb-0">
                            A student at FER, I love sports and web development.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    <div class="copyright py-4 text-center text-white">
            <div class="container"><small>Copyright &copy; SportEve 2022</small></div>
        </div>
            </body>

    /* return  <div>
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
                
                
            </div> */
}

export default Profile;
