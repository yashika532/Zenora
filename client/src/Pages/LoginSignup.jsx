import React, { useState } from 'react';
import '../App.css';
import {FaUser , FaLock ,FaEnvelope ,FaGoogle ,FaFacebook,FaGithub,FaLinkedin} from "react-icons/fa"

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className="big-container">
       
    <div className={`container ${isActive ? 'active' : ''}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="bx bxs-user"></FaUser>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="bx bxs-lock-alt"></FaLock>
          </div>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn  bg-gradient-to-r from-[#005c97] to-[#00d4ff]">
            Login
          </button>
          <p>Or Login with social platforms</p>
          <div className="social-icons">
            <FaGoogle href="#" className="bx i bxl-google" size={22}></FaGoogle>
            <FaFacebook href="#" className="bx i bxl-facebook" size={22}></FaFacebook>
            <FaGithub href="#" className="bx i bxl-github" size={22}></FaGithub>
            <FaLinkedin href="#" className="bx i bxl-linkedin" size={22}></FaLinkedin>
          </div>
        </form>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <form>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="bx bxs-user"></FaUser>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <FaEnvelope className="bx bxs-envelope"></FaEnvelope>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="bx bxs-lock-alt"></FaLock>
          </div>
          <button type="submit" className="btn  bg-gradient-to-r from-[#005c97] to-[#00d4ff]">
            Register
          </button>
          <p>Or Register with social platforms</p>
          <div className="social-icons">
            <FaGoogle href="#" className="i bx bxl-google" size={22}></FaGoogle>
            <FaFacebook href="#" className="i bx bxl-facebook" size={22} ></FaFacebook>
            <FaGithub href="#" className="i bx bxl-github" size={22}></FaGithub>
            <FaLinkedin href="#" className="i bx bxl-linkedin" size={22}></FaLinkedin>
          </div>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn " onClick={handleRegisterClick}>
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
    </div>
  );
};

export default LoginSignup;
