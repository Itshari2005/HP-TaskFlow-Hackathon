import '../styles/login.css';
import HeaderSimple from './HeaderSimple';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      alert(res.data.message || 'Login successful');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <HeaderSimple />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login to TaskFlow</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label>
              <input type="checkbox"/>Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>
          <hr />
          <p>or login with</p>
          <button type="button" className="oauth-btn google" onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}>Sign in with Google</button>
          <button type="button" className="oauth-btn github" onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'}>Sign in with GitHub</button>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
