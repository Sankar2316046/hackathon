"use client";
const Images = [
    {
      image: "/images/lipstick.jpg",
      title: 'Lipstick',
      description: 'Explore Your Beauty'
    },
    {
      image: "/images/dress4.jpg",
      title: 'Mesmerizing Dress',
      description: 'Wear and Look Your eEst'
    },
    {
      image: "/images/watch4.jpg",
      title: 'Watches',
      description: 'Always stay on Time'
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