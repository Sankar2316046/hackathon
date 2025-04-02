
import React from 'react'
import Product from '../_components/Product';

const TodayDeal = () => {
  return (
    <div className='flex flex-col gap-4 overflow-hidden mt-20'>
        <div className='flex items-center justify-start'>
            <h1 className='text-4xl font-bold text-black'>Today's Deal</h1>
        </div>
        <Product/>
    </div>
  )
}

export default TodayDeal