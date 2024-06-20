import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AuthService from '../service/auth.service'

import './login.css';
import photo from "../photos/backgroundPhoto.jpg"


export default function UserLogin(props) {
  const navigate=useNavigate();
  
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");





  const onChangeUsername = (e) => {
    let username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    
    
      AuthService.login(username, password).then(
        (response) => {
        

         localStorage.setItem("isLoggedIn",true)
            navigate("/dashboard");
         
      },
        (error) => {
          
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
  };

  return (
    <div>
      
      <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1622px",height:"753px"}}/>

      
      <form className="login" onSubmit={handleLogin} ref={form}>
        <h3>
          <b>Login to your account</b>
        </h3>

        <div className="form-outline mb-2">
          <label className="form-label">
            Email ID
          </label>
          <input
            type="email"
            id="form2"
            className="form-control"
            name="Email"
            placeholder="Enter your Email"
            value={username}
            required
            onChange={onChangeUsername}
          />
        </div>

        <div className="form-outline mb-2">
          <label className="form-label">
            Password
          </label>
          <input type="password" id="form23" className="form-control" name="password" value={password} required placeholder="Enter your Password" onChange={onChangePassword} />
        </div>

        <div className="text-center pt-1 mb-2 pb-1" >
          <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          

        </div>

        <div className="d-flex align-items-center justify-content-center pb-2">
          <p className="mb-2 me-2" style={{color:"blue" }}>Don't have an account?</p>
          <button type="button" className="btn btn-outline-danger" style={{backgroundColor:"white"}}>
            <Link to="/Register" style={{color:"blue", }}>Create new</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
