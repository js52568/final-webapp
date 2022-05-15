import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function Register(props) {
  let navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({email: "", password: ""});
  const [error, setError] = useState("");

  function onChange(event) {
    const {name, value} = event.target;
    setRegisterForm(oldForm => ({...oldForm, [name]: value}));
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      username: registerForm.email,
      password: registerForm.password
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch("/register", options).then(res => {
      if (res.status === 200) {
        props.onLogin();
        navigate("/main");
      } else {
        setError("Register failed");
      }
    });
  }

  function onClick() {
    window.open("http://localhost:8080/auth/google","_self");
  }

    return <div class="container mt-5">
    <h1>Register</h1>
  
    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
  
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" name="email" onChange={onChange} value={registerForm.email}/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChange} value={registerForm.password}/>
              </div>
              <button type="submit" className="btn btn-dark">Register</button>
            </form>
  
          </div>
        </div>
      </div>
  
      <div className="col-sm-4">
        <div className="card social-block">
          <div className="card-body">
            <button className="btn btn-block btn-social btn-google" type="submit" onClick={onClick}>
              <i className="fab fa-google"></i>
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
  
    </div>
  </div>

}

export default Register;