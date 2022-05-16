import React, {useContext, useState} from "react";
//import User from "./User";
//import UserList from "./UserList";
//import UserForm from "./UserForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Main from "./Main";
import Register from "./Register";
import Context from "./Context";
import { myContext } from "./Context";
import NewEvent from "./NewEvent";
import Profile from "./Profile";

//testiram nesto
//jos jedan test

function App() {

    const userObject = useContext(myContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function onLogin() {
        setIsLoggedIn(true);
    }
    function onLogout() {
        setIsLoggedIn(false);
    }


    return <div>
        <BrowserRouter>
            {(isLoggedIn || userObject) && <Header onLogout={onLogout}/>} 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register onLogin={onLogin}/>} />
                <Route path="/login" element={<Login onLogin={onLogin}/>} />
                <Route path="/main" element={(isLoggedIn || userObject) && <Main />} />
                <Route path="/newevent" element={(isLoggedIn || userObject) && <NewEvent />} />
                <Route path="/profile" element={(isLoggedIn || userObject) && <Profile />} />                       
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;

/* <Route path="/" element={<UserList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/new" element={<UserForm />} /> */