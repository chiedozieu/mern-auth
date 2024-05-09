import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json() 
      
      if (data.success === false) {
        dispatch(signInFailure(data));
        return 
        
      }
      dispatch(signInSuccess(data));
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error));      
    }  
  }
 
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='p-3 bg-blue-900 text-white rounded-lg uppercase hover:bg-blue-700 disabled:bg-slate-400'>{loading? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500 hover:text-blue-700' >Sign Up</span>
        </Link>
      </div>
      
          <p className='text-red-700 mt-5'>{error? error.message || 'Something went wrong' : ''}</p>
     
    </div>
  )
}

export default SignIn


