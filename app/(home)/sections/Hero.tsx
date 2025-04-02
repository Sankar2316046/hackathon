"use client";
import React from 'react'

const Hero = () => {
  return (  
    <div className='flex items-center justify-center h-screen w-full bg-[url("/images/hero-bg1.jpg")] bg-cover bg-center'>
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg border-2 border-black">
        <h1 className="text-4xl font-bold text-black">Welcome to E-commerce</h1>
        <p className="mt-4 text-lg text-black">Your one-stop shop for all things!</p>
        <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-black hover:text-white ">Shop Me</button>
      </div>
    </div>
  )
}

export default Hero