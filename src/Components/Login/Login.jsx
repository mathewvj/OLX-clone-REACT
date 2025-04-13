import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      console.log('User logged in', userCredential.user);
      alert("Logged in")
      navigate('/')
      
    } catch (error) {
      console.error('Login error',error.message)
      alert(error.message)
    }
    setLoading(false)


  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;