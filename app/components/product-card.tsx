
import { Card, CardDescription, CardFooter, CardHeader,CardTitle } from '@/components/ui/card'
import React from 'react'
import { product, ProductService } from '@/app/backend/product.service'
import Image from 'next/image';



export const ProductCard = async ({id}: {id: string}) => {
    

    const productService = new ProductService();

        const product = await productService.getProductById(id);

  return (
    <div>
        <Card className="w-full max-w-lg shadow-xl border border-muted/30 animate-fade-in rounded-lg">
        <img src={product?.product_url} alt={product?.product_name} />
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold">{product?.product_name}</CardTitle>
                <CardDescription className="text-muted-foreground">{product?.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2">
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{product.discount}</p>
            </CardFooter>

        </Card>
    </div>
  )
}
