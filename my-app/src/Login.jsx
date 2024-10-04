
import React from 'react';
import img from './assets/login_img_1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3002/login", {email, password},{withCredentials: true})
    .then(result=>{
      if(result.data==="Success"){
        axios.get("http://localhost:3002/user", {withCredentials: true})
        .then(response=>{
          // console.log(response);
          if(response.data.user){
            navigate("/home", {state:{user: response.data.user}});
          }
        })
      }
      else{
        alert("Login failed: User Dose not exists")
      }
    })
    // .then(result=>{if(result.status===200){
    //   console.log(result)
    //   navigate("home");
    // }})
    .catch(err=> console.log(err))
  }
  
  return (
    <div className='container-fluid mt-5 mb-5'>
    <div className="card mb-3 shadow" style={{ maxWidth: '100%'  }}>
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title text-center">Welcom Back!</h1>
            <p className="card-text text-center">
             Simplify your workflow and boost your productivity
             With "Tuga's App." Get started for free.
            </p>
            <form onSubmit={handleLogin}>
            <div className="mb-3 mx-5">
                  <input type="text " style={{ borderRadius: '20px', width:'100%' }} className="form-control" id="username" placeholder="   Email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="mb-3 mx-5">
                  <input type="text" style={{ borderRadius: '20px', width:'100%' }} className="form-control" id="password"  placeholder="   Password" name='password' onChange={(e) => setPassword(e.target.value)} required  />
            </div>
            {/* <div className="mb-3 text-center">
                  <Link to="forgetpass" className=" text-decoration-none fw-bold">Forgot Password?</Link>
            </div> */}
            <div className="mb-3 text-center">
                  <button className='btn btn-dark' style={{ width:'75%', borderRadius: '20px' }} >Login</button>
            </div>
                
                <div className='text-center'>
                <hr />or continue with
                </div>
                <div className="mt-3 text-center">
                <a href="https://www.google.com" style={{ fontSize: '2rem', cursor: 'pointer'}} ><FontAwesomeIcon icon={faGoogle} className="me-3"/></a>
                <a href="https://www.apple.com" style={{ fontSize: '2rem', cursor: 'pointer'}} ><FontAwesomeIcon icon={faApple} className="me-3" /></a>
                <a href="http://www.facebook.com" style={{ fontSize: '2rem', cursor: 'pointer'}} ><FontAwesomeIcon icon={faFacebook} className="me-3" /></a>
                </div>
                
            </form>
            <p className='card-text mt-5 text-center' >Not a member?<Link to="register" className="text-decoration-none fw-bold"> Register now</Link></p>
          </div>
        </div>
        <div className="col-md-4">
          <img src={img} style={{maxWidth:'100%' , height: '500px', }} className="img-fluid rounded-start" alt="..." />
        </div>
      </div>
    </div>
    </div>
  );
};