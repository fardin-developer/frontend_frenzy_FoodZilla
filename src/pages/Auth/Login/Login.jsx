import React, { useState } from 'react';
import './Login.css';
import { BASE_URL } from '../../../api/baseUrl';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '/public/Cancel.json'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notVerified, setNotVerified] = useState(false);
  const navigate = useNavigate();


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Both fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    const isFromLoginPage = () => {
      // You might use a query parameter, local storage, or some state to determine this
      return window.sessionStorage.getItem('fromLogin') === 'true';
    };
    console.log(`${BASE_URL}/auth/login`);

    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 'not verified') {
          setNotVerified(true);
        } else if (data && data.cookies) {
          localStorage.setItem('cookies', JSON.stringify(data.cookies));
          localStorage.setItem('user', JSON.stringify(data.user));
          onLogin(data.cookies);
          console.log(data.cookies);
      
          const fromRegister = localStorage.getItem('fromRegister');
          if (fromRegister) {
            localStorage.removeItem('fromRegister'); // Clean up the flag
            navigate('/');
          } else if (window.history.length > 2) {
            navigate(-1); 
          } else {
            navigate('/'); 
          }
        } else {
          setError('Invalid login credentials');
        }
      })  
      
      .catch((error) => {
        setLoading(false);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="loginPage">
      {!notVerified ? (
        <>
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Login</h2>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="register-option">
                <p className="toggle-link">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="verification-message" style={{color:'white'}}>
          <h1>Your acoount has not verified by administration</h1>
          <Lottie options={defaultOptions}
            height={300}
            width={300}
            />

        </div>
      )}
      <div className="bottom"></div>
    </div>
  );
};

export default Login;
