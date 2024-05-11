import React from 'react'

const About = () => {
  return (
    <div>
      <h1 className='text-center text-3xl font-semibold my-7'>Welcome to my MERN Auth App</h1>
      <div className='text-slate-700'>
        <p className='mx-5 p-3'>This is a fullstack web application built with MERN Stack (MongoDB, Expressjs, Reactjs, Nodejs)
          It includes authenticationfeatures that allow user to login and and logot and also signup.
          They can also sign up with OAuth (Google Authentication with firebase)  </p>
          <p className='mx-5 p-3'>The front-end of the app is built with React and uses React router, redux tool-kit, redux-persist etc. For the UI, Tailwind css was used. The back-end was built using nodejs and Expressjs. MongoDB was used for the database, jsonwebtoken (jwt) was used for authentication features</p>
          <p className='mx-5 p-3'>This application is intended as a starting point for building a full-stack web application with authentication using the MERN stack. Feel free to use it as a template for you own projects
          </p>
          <p className='mx-5 p-3'>Credit and shoutout to Sahand Ghavidel </p>
      </div>
    </div>
  )
}

export default About