import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>

      <form action="" className='flex flex-col gap-4 '>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input type="text" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='p-3 bg-blue-900 text-white rounded-lg uppercase hover:bg-blue-700 disabled:bg-slate-400'>Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sing-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
 
    </div>
  )
}

export default SignUp