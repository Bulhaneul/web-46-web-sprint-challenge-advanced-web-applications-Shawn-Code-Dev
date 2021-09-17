import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import axiosWithAuth from "./helpers/axiosWithAuth";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    if(isLoggedIn){
      axiosWithAuth()
        .post('/logout')
        .then(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        })
      window.location.href = '/'
      } else {
        window.location.href = '/'
      }
    
  }

  useEffect(() => {
    localStorage.getItem('token') && setIsLoggedIn(true)
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={handleLogout}>logout</a>
        </header>
        <Switch>
          <Route exact path='/'>
            <Login setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          
          <Route exact path='/login'>
            <Login setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          
          <PrivateRoute exact path='/bubbles' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.