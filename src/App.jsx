import React,{useEffect, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { AuthContext, FirebaseContext } from './store/Context';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import PostView from './store/PostContext';


/**
 * ?  =====Import Components=====
 */


function App() {
  const {setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  useEffect(()=>{
   const unsubscribe = auth.onAuthStateChanged((user)=>{
    setUser(user)
   });

   return() => unsubscribe()
  },[auth,setUser])

  return (
    <div>
    <PostView>
     <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/create' element={<CreatePage/>}/>
      <Route path='/viewpost' element={<ViewPost/>}/>
      </Routes>
     </Router>
     </PostView>
         
      
    </div>
  );
}

export default App;