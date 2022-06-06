import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    let navigate = useNavigate();

    function handleRegister() {
        navigate("/register");
    }

    function handleLogin() {
        navigate("/login");
    }

    return  (<div class="jumbotron centered">
    <div className="container">
      <h1 className="display-3">SportEve</h1>
      <p className="lead">Find new teammates!</p>
      <hr/>
      <button className="btn btn-light btn-lg" onClick={handleRegister} type="submit">Register</button>
      <button className="btn btn-light btn-lg" onClick={handleLogin} type="submit">Login</button>
  
    </div>
  </div>);
}

export default Home;

/* <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
      <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a> */