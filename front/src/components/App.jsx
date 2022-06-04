import React, {useState} from "react";
//import User from "./User";
//import UserList from "./UserList";
//import UserForm from "./UserForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Main from "./Main";
import Register from "./Register";

//testiram nesto
//jos jedan test

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function onLogin() {
        setIsLoggedIn(true);
    }
    function onLogout() {
        setIsLoggedIn(false);
    }


    return <div>
        <BrowserRouter>
            {isLoggedIn && <Header onLogout={onLogout}/>} 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register onLogin={onLogin}/>} />
                <Route path="/login" element={<Login onLogin={onLogin}/>} />
                <Route path="/main" element={isLoggedIn && <Main />} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;

/* <Route path="/" element={<UserList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/new" element={<UserForm />} /> */