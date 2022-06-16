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
  
  return <body>
  <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
          <a class="navbar-brand" href=" ">SportEve</a>
          <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="register">Register</a></li>
                  <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="login">Login</a></li>
              </ul>
          </div>
      </div>
    </nav>
    <header class="masthead bg-primary">
    <h1 class="masthead-heading mb-0 text-center text-white">Login</h1>
    <div className="container mt-5">
  
    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
  
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label for="email" >Email</label>
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
  
     /* return <div className="container mt-5">
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
  </div>    */

}

export default Login;