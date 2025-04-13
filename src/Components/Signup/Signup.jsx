import React from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection,doc, setDoc } from 'firebase/firestore';


export default function Signup() {

    const [username, setUserName ] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone ] = useState('')
    const [password, setPassword ] = useState('')
    const [loading, setLoading] = useState(false)

    const {auth, db} = useContext(FirebaseContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        console.log(auth)
        try {
          
          const signInMethods = await fetchSignInMethodsForEmail(auth,email)
          if(signInMethods.length > 0){
            alert("Email already in use. try logging in")
            setLoading(false)
            return
          }

            const userCredential = await createUserWithEmailAndPassword(auth, email,password)
            const user = userCredential.user
            await updateProfile(user,{displayName: username})

            const userRef = doc(collection(db, "users"),user.uid)
            await setDoc(userRef,{
              uid: user.uid,
              name: username,
              email: email,
              phone: phone,
              createdAt: new Date()
            })

            console.log("User created and stored", user);
            alert("signup successfuly")
            navigate("/login")
            
        } catch (error) {
            console.log(error);
            
        }
        setLoading(false)
    }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
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
          <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'SignUp'}</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}