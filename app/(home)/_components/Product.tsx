"use client"

import React from 'react'
import { ProductService } from '@/app/backend/product.service';


export const Product = async () => {
    const productService = new ProductService();
    const products = await productService.getAllProducts();
  return (
    <div className='flex gap-4 overflow-hidden'>
        <div className='flex gap-4 w-[80vw] overflow-hidden'>
            <div className='w-full h-full rounded-xl flex items-center justify-center gap-4'>
                {products.map((product) => (
                    <div key={product?.id} className='w-[20rem] h-fit rounded-xl flex flex-col gap-2 p-4 shadow-2xl'>
                        <img src={product?.product_url} alt={product?.product_name} className='w-80 h-50 object-cover rounded-2xl' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>{product?.product_name}</h1>
                            <p className='text-muted-foreground'>{product?.description}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-muted-foreground'>{product?.category}</p>
                            <p className='text-muted-foreground'>{product?.price}</p>
                            <p className='text-muted-foreground'>{product?.discount}</p>
                        </div>
                        <button className='bg-black text-white rounded px-4 py-2 w-fit h-fit hover:bg-white hover:text-black'>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Product