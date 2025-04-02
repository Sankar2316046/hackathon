import { Card, CardDescription, CardFooter, CardHeader,CardTitle } from '@/components/ui/card'
import React from 'react'

interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>{product.name}</h2>
                    <CardDescription>
                        <p>{product.description}</p>
                        <CardFooter>
                            <p>{product.price}</p>
                            <p>Quantity</p>
                        </CardFooter>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </Card>
    </div>
  )
}
