"use client"
import { useState } from 'react';
import { AlertToast, ErrorToast, SuccessToast } from './Dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoggin } from '@/Redux/Slices/AuthSlice';


const AuthForm = () => {
  const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()
  const handleLogin = async(e) => {
    e.preventDefault();
    const payload={
      password,email,action:"login"
    }
    try {
      const {data}=await axios.post(`http://localhost:3000/api/auth`,payload);
      if(data.success){
        SuccessToast(data.msg);
        localStorage.setItem("loginToken",data.token);
        dispatch(setLoggin(data.token))
        router.push("/")
      }else{
        AlertToast(data.msg)
      }
    } catch (error) {
    
      ErrorToast(error.response.data.msg)
    }
   

  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
    
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
   
    </div>
  );
};

export default AuthForm;
