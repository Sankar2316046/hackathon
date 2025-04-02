"use client";
const Images = [
    {
      image: "/images/shirt4.jpg",
      title: 'Shirt',
      description: 'Explore Your Beauty'
    },
    {
      image: "/images/watch2.jpg",
      title: 'Mesmerizing Watch',
      description: 'Be the Best in Time'
    },
    {
      image: "/images/dress1.jpg",
      title: 'Mesmerizing Dress',
      description: 'Wear and Look Your Best'
    },
  ];

import React from 'react'
import Carousel from '../_components/Carousel';
  
  const CarouselSection = () => {
    return (
      <div className='flex items-center justify-center mt-20'>
        <Carousel items={Images} />
      </div>
    )
  }
  
  export default CarouselSection