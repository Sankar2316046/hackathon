import { ProductCard } from '@/app/components/product-card'
import React from 'react'

const page = ({params}: {params: {id: string}}) => {

  return (
    <><ProductCard id={params.id} /></>
  )
}

export default page