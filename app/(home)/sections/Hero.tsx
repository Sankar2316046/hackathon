import React from 'react'

const Hero = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome to E-commerce</h1>
        <p className="mt-4 text-lg text-white">Your one-stop shop for all things!</p>
        <button className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-black hover:text-white ">Get Started</button>
      </div>
    </div>
  )
}

export default Hero