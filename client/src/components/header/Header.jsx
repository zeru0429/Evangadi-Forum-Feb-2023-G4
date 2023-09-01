import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useStateValue} from '../../utility/stateprovider'
import './header.css';
import axios from '../../utility/axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
const [{user }, dispatch] = useStateValue();
const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }
   

  }, [navigate])  
  

  const handlelogout = () => { 
         dispatch({
            type: "SET_USER",
            user: null,
        });
          navigate('/login')
       
  }

  const handleClick = () => { 
     navigate('/profile')
  }


  return (
    <div className='header container-fluid m-3 p-3'>
      <div className="container d-flex subcont">
        <div className="imageconainer">
          <Link to='/'>
          <img className='logo' src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt="evangadi logo" /></Link>
        </div>

        <div className="linkcontainer ">
          <ul className='d-flex gap-5'>
         <li><Link to='/' id='onelink'>home</Link></li>
            <li>how it work</li>
            {user ?
              <>
                <h6 onClick={handleClick}><AccountCircleIcon/>{user.user['username']}</h6>
                
                <li onClick={handlelogout} className='btn btn-primary'>  Logout</li>
              </>
            :<Link to='/login'> </Link>
            }
            
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header