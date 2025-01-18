import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link , useNavigate} from 'react-router-dom'
import '../App.css';


const LoginSignup = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [registerField, setRegisterField] = useState({ userName: "", email: "", password: "" });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleOnChangeInput = (event, name) => {
    if (isActive) {
      setRegisterField({
        ...registerField, [name]: event.target.value
      });
    } else {
      setLoginField({
        ...loginField, [name]: event.target.value
      });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader

    try {
      await axios.post('http://localhost:8000/auth/signUp', registerField);
      toast.success('User Registered successfully!');
      navigate('/')
    } catch (error) {
      toast.error('Registration failed!');
    } finally {
      setLoading(false); // Hide loader
    }
  };


  const handleLogin = async(event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/auth/login', loginField,{withCredentials:true})
      .then((response=>{
        console.log(response);
        localStorage.setItem("token" ,response.data.token);
        localStorage.setItem("userId",response.data.user._id); 

      }))
      toast.success('User Login successfully!');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);// Delay navigation
    } catch (error) {
      toast.error('Invalid Credential');
    } finally {
    }
  };


  return (
    <div className="big-container">
      {loading && (
        <div className="loader-container">
          <Oval color="#00BFFF" height={50} width={50} />
        </div>
      )}

      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={loginField.userName}
                onChange={(e) => handleOnChangeInput(e, "userName")}
                required
              />
              <FaUser className="bx bxs-user" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={loginField.password}
                onChange={(e) => handleOnChangeInput(e, "password")}
                required
              />
              <FaLock className="bx bxs-lock-alt" />
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn bg-gradient-to-r from-[#005c97] to-[#00d4ff]">
              Login
            </button>
            <p>Or Login with social platforms</p>
            <div className="social-icons">
              <FaGoogle className="bx i bxl-google" size={22} />
              <FaFacebook className="bx i bxl-facebook" size={22} />
              <FaGithub className="bx i bxl-github" size={22} />
              <FaLinkedin className="bx i bxl-linkedin" size={22} />
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={registerField.userName}
                onChange={(e) => handleOnChangeInput(e, "userName")}
                required
              />
              <FaUser className="bx bxs-user" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={registerField.email}
                onChange={(e) => handleOnChangeInput(e, "email")}
                required
              />
              <FaEnvelope className="bx bxs-envelope" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={registerField.password}
                onChange={(e) => handleOnChangeInput(e, "password")}
                required
              />
              <FaLock className="bx bxs-lock-alt" />
            </div>
            <button type="submit" className="btn bg-gradient-to-r from-[#005c97] to-[#00d4ff]">
              Register
            </button>
            <p>Or Register with social platforms</p>
            <div className="social-icons">
              <FaGoogle className="i bx bxl-google" size={22} />
              <FaFacebook className="i bx bxl-facebook" size={22} />
              <FaGithub className="i bx bxl-github" size={22} />
              <FaLinkedin className="i bx bxl-linkedin" size={22} />
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
