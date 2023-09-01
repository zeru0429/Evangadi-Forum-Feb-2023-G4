import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useStateValue} from '../../utility/stateprovider'
import './signin.css'
import axios from '../../utility/axios';
import About from '../../components/about/About';

const Signin = () => {
  const [{user }, dispatch] = useStateValue();
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (user) { 
      navigate('/');
    }
   // console.log(user);

  }, [navigate])  
  

   const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setError({
        ...errors,
        [field]: null,
      });
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
        if (1) {
    // if (validateForm()) {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`/api/users/login`,form);
        const data = response.data;
          if (data) {
            dispatch({
              type: "SET_USER",
              user: {
                token: data.token,
                user: {
                  id: data.user['id'],
                  username: data.user['userName'],
                }

              },
            });
          }
        navigate('/');
         // console.log(data);
        
      } catch (error) {
        alert(error.response.data.msg);
      console.log('Error authenticating user:', error.response.data.msg);
      setError({
        ...errors,
        pass: 'Network Error: Unable to reach the server',
      });
      }
    }
  };



  
  return (
    <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Login to your account</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/signup" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1"
              type="email"
              name="email"
              onChange={(e) => setField('email', e.target.value)}
              placeholder="Your Email"
            />
            <input
              className="in1"
              name="password"
              type="password"
              onChange={(e) => setField('password', e.target.value)}
              placeholder="Your Password"
            />
            <span className="showHide2">
              <br />
             
            </span>
            <button className="btn1">submit</button>
          </form>
          <Link to="/forgetpassword" className="a3 a1">
            forget password?
          </Link>
        </div>
        <About />
      </div>
    </div>
  );

}

export default Signin