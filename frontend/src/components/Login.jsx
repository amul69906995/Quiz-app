import React, { useState } from 'react'
import { toastifyOption } from '../constant';
import { toast } from 'react-toastify';
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [onLoading, setOnLoading] = useState(false)
  const handleLogin = async () => {
    setOnLoading(true)
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}:8000/user/log-in`, { email, password },
        { 
          withCredentials: true,
        }
      )
      console.log(data)
      toast.success(data?.message, toastifyOption);

    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message, toastifyOption)
    }
    setOnLoading(false)
  }
  return (
    <div>
    <h1>log in</h1>
      <label htmlFor="email">Email</label>
      <input type="text" name='email' id="email" placeholder='xyz@gmail.com' onChange={(e) => setEmail(e.target.value)} /><br/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />
      <button disabled={onLoading} onClick={handleLogin}>Login</button>
      <Link to='/signin'><button>sign in</button></Link>
    </div>
  )
}

export default Login;