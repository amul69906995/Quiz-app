import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastifyOption } from '../constant';
import { Link } from 'react-router-dom';
import './signin.css'; // Ensure this import is present to apply CSS styles

const Admin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [onLoading, setOnLoading] = useState(false);

  const handleSendLink = async () => {
    setOnLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/sign-in`, { email, password });
      toast.success(result.data.message, toastifyOption);
    } catch (e) {
      toast.error(e.response.data.message, toastifyOption);
    }
    setOnLoading(false);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Sign In</h1>
      <div className="admin-field">
        <label htmlFor="email" className="admin-label">Email</label>
        <input
          type="text"
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field">
        <label htmlFor="password" className="admin-label">Password</label>
        <input
          type={showPassword ? 'password' : 'text'}
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="admin-toggle-button"
        >
          {showPassword ? "Text Form" : "Password Form"}
        </button>
      </div>
      <button
        onClick={handleSendLink}
        disabled={onLoading}
        className="admin-submit-button"
      >
        Send Link
      </button>
      <Link to='/' className="admin-link">
        <button className="admin-login-button">Login</button>
      </Link>
    </div>
  );
};

export default Admin;
