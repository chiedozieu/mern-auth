import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError ] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      setLoading(false);
      console.log(data);
      
      if (data.success === false) {
        setError(true);
        return 
      }
      navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError(true)      
    }  
  }
 
   


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='p-3 bg-blue-900 text-white rounded-lg uppercase hover:bg-blue-700 disabled:bg-slate-400'>{loading? 'Loading...' : 'Sign Up'}</button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500 hover:text-blue-700' >Sign in</span>
        </Link>
      </div>
      
          <p className='text-red-700 mt-5'>{error && 'Something went wrong'}</p>
     
    </div>
  )
}

export default SignUp