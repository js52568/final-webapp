import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function User(){
    const [user,setUser] = useState({nickname:"", _id: ""});
    const [currUser, setCurrUser] = useState({});
    const [rating, setRating] = React.useState(5);
    const [wasRated,setWasRated] = useState("false");
    const [average,setAverage] = useState("");
    //const [currId,setCurrId] = useState("");

    
    let  { id } = useParams();
    //setCurrId(id);
    let myUrl = "/users/" + id;

    useEffect(() => {        
        fetch(myUrl).then(data => data.json()).then(user => setUser(user))       
    }, []);

    useEffect(() => {        
        fetch("/profile").then(data => data.json()).then(currUser => setCurrUser(currUser))       
    }, []);

    useEffect(() => {        
        fetch(myUrl + "/rate").then(data => data.json()).then(wasRated => setWasRated(wasRated.wasRated))       
    }, []);

    useEffect(() => {        
        fetch(myUrl + "/ratings").then(data => data.json()).then(average => setAverage(average.rat))       
    }, []);

    function rate(e){
        e.preventDefault();
        const data = {
            reviewerId: currUser._id,
            userId: user._id,
            value: rating
          };
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          fetch(myUrl + "/rate", options).then(res => {
            if (res.status === 200) {
              console.log("rated")
            } else {
              console.log("Error rating");
            }
          });
    }

    return  <body>
      <header class="masthead bg-primary">
                <div>
                <h1 class="masthead-heading mb-0 text-center text-white">{user.nickname}</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
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
                        {average}
                        </p>
                    </div>
                </div>
            </div>
            <br/>
            <hr className="text-white"/>
            {user._id !== currUser._id && wasRated === "false" && <div className="container"><Box
            display="flex"
            justifyContent="center"
          >
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      </Box>
      <br/>
      <Box
            display="flex"
            justifyContent="center"
          >
            <button className="btn btn-light btn-lg" type="submit" onClick={rate}>Rate</button>
            </Box>
            </div>
           }       
                
                
            </div>
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
    /* return (
        <div>
        <h1>{user.nickname}</h1>
        <p>{user._id}</p></div>
          
    ) */

}

export default User;