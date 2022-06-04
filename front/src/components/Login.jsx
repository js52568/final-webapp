import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({email:"", password: ""});
  const [error, setError] = useState("");

  function onChange(event) {
    const {name, value} = event.target;
    setLoginForm(oldForm => ({
      ...oldForm,[name]: value
    }))
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      username: loginForm.email,
      password: loginForm.password
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch("/login", options).then(res => {
      if (res.status === 200) {
        props.onLogin();
        navigate("/main");
      } else {
        setError("Login failed");
      }
    });
  }

  function onClick() {
    window.open("http://localhost:8080/auth/google","_self");
  }

  function isValid() {
    const {email, password} = loginForm;
    return email.length > 0 && password.length > 0;
  }

    return <div className="container mt-5">
    <h1>Login</h1>
  
    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
  
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" name="email" onChange={onChange} value={loginForm.email}/>
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChange} value={loginForm.password}/>
              </div>
              <button type="submit" className="btn btn-dark" disabled={!isValid()}>Login</button>          
            </form>
            <p>{error}</p>
  
          </div>
        </div>
      </div>
  
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
          <button className="btn btn-block btn-social btn-google" type="submit" onClick={onClick}>
              <i className="fab fa-google"></i>
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
  
    </div>
  </div>

}

export default Login;