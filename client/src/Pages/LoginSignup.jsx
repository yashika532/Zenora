import React, { useState } from 'react';
import '../App.css';

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
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>Or Login with social platforms</p>
          <div className="social-icons">
            <a href="#" className="bx bxl-google"></a>
            <a href="#" className="bx bxl-facebook"></a>
            <a href="#" className="bx bxl-github"></a>
            <a href="#" className="bx bxl-linkedin"></a>
          </div>
        </form>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <form>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <p>Or Register with social platforms</p>
          <div className="social-icons">
            <a href="#" className="bx bxl-google"></a>
            <a href="#" className="bx bxl-facebook"></a>
            <a href="#" className="bx bxl-github"></a>
            <a href="#" className="bx bxl-linkedin"></a>
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
    </div>
  );
};

export default LoginSignup;
