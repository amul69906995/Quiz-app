import React, { useContext, useEffect, useState } from 'react';
import { toastifyOption } from '../constant';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { authContext } from '../context/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onLoading, setOnLoading] = useState(false);
  const {setIsAuth,setUser}=useContext(authContext);
  const navigate=useNavigate()
  const handleLogin = async () => {
    setOnLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/log-in`, { email, password }, { withCredentials: true });
      console.log(data);
      setIsAuth(true);
      setUser(data.user);
      navigate('/protected/home')
      localStorage.setItem("jwtToken",data.token)
      toast.success(data?.message, toastifyOption);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message, toastifyOption);
    }
    setOnLoading(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      
      autoLogin(token);
      
    }
  }, [])
  const autoLogin = async (token) => {
    try {
      setOnLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/auto-login`, {jwtToken:token },{
        withCredentials: true
      })
      console.log(data);
      setIsAuth(true)
      setUser(data)
      navigate('/protected/home')
    } catch (e) {
      toast.error(e.response?.data?.message, toastifyOption);
    } finally {
      setOnLoading(false)
    }
  }
  if(onLoading)return <h1>Loading...</h1>
  else{
  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <div className="login-field">
        <label htmlFor="email" className="login-label">Email</label>
        <input type="text" name="email" id="email" placeholder="xyz@gmail.com" onChange={(e) => setEmail(e.target.value)} className="login-input" />
      </div>
      <div className="login-field">
        <label htmlFor="password" className="login-label">Password</label>
        <input type="password" name="password" id="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} className="login-input" />
      </div>
      <button disabled={onLoading} onClick={handleLogin} className="login-button">Login</button>
      <Link to='/signin' className="login-link">
        <button className="signin-button">Sign In</button>
      </Link>
    </div>
  );
}
};

export default Login;
