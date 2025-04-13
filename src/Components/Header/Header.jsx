import React,{useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
function Header() {

  const {user,setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleLogOut = async() =>{
    try {
      await auth.signOut()
      setUser(null)
      alert("signout")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error.message)
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : <a href='/login'>LOGIN</a>}</span>
          <hr />
        </div>
        <div className='logout'>
        {user && <span onClick={handleLogOut} className='logout'> LOGOUT</span>}
        </div>
        

        <div className="sellMenu">
          <a href="/create">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div></a>
        </div>
      </div>
    </div>
  );
}

export default Header;