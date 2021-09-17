import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
  const {push} = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  //replace with error state
  const handleSubmit = async e => {
    e.preventDefault();
    if(username === '' || password === ''){
      setError('Username or Password not valid.')
      setTimeout(() => setError(null), 5000)
    } else {
      axiosWithAuth()
      .post('/login', {username, password})
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setIsLoggedIn(true);
        push('/bubbles');
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" value={username} id="username" onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" id="submit" >Submit</button>
        </form>
      </div>
      <p id="error" className="error">{error}</p>
    </div>
  )
}

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"