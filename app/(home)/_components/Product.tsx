"use client"

import React, { useEffect, useState } from 'react'
import { product, ProductService } from '@/app/backend/product.service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export const Product = () => {
    const [products, setProducts] = useState<product[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const productService = new ProductService()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await productService.getAllProducts()
                setProducts(fetchedProduct)
                setError(null)
            } catch (err) {
                setError('Failed to fetch product')
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    const addToCart = async (product: product) => {
        if (!product) return

        try {
            await productService.addtocart(product)
            toast.success('Product added to cart')
        } catch (err) {
            toast.error('Failed to add product to cart')
            console.error('Error adding to cart:', err)
        }
    }

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    if (error) return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>
    if (!products) return null

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link href={`/product/${product?.id}`} key={product?.id}>
                    <Card key={product?.id} className="w-full">
                        <div className="relative w-full h-[200px]">
                            <img 
                                src={product?.product_url} 
                                alt={product?.product_name} 
                                className="object-cover w-full h-full rounded-t-lg"
                            />
                        </div>
                        <CardContent className="p-4">
                            <CardHeader className="mb-4">
                                <CardTitle className="text-lg font-semibold line-clamp-2">
                                    {product?.product_name}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {product?.description}
                                </CardDescription>
                            </CardHeader>
                            
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Category: {product?.category}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold">
                                        ${product?.price.toFixed(2)}
                                    </span>
                                    {product?.discount > 0 && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${product?.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Button 
                                onClick={() => addToCart(product)}
                                className="w-full mt-4"
                                size="lg"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Product