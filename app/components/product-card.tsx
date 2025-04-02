"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import { product, ProductService } from '@/app/backend/product.service'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const ProductCard = ({ id }: { id: string }) => {
    const [product, setProduct] = useState<product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const productService = new ProductService()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await productService.getProductById(id)
                setProduct(fetchedProduct)
                setError(null)
            } catch (err) {
                setError('Failed to fetch product')
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const addToCart = async () => {
        if (!product) return

        try {
            await productService.addtocart(product)
            toast.success('Product added to cart')
            router.push('/cart')
        } catch (err) {
            toast.error('Failed to add product to cart')
            console.error('Error adding to cart:', err)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!product) return null

    return (
        <Card className="w-full max-w-4xl overflow-hidden border-0 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative bg-gray-50 p-6 flex items-center justify-center">
                    <img
                        src={product.product_url}
                        alt={product.product_name}
                        width={400}
                        height={400}
                        className="object-contain max-h-[300px] w-auto"
                    />
                </div>

                <div className="flex flex-col p-6">
                    <CardHeader className="px-0 pt-0">
                        <div className="flex flex-col space-y-1">
                            <CardTitle className="text-2xl md:text-3xl font-bold mt-2">
                                {product.product_name}
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="px-0 py-4 flex-grow">
                        <CardDescription className="text-base text-gray-600">
                            {product.description}
                        </CardDescription>
                    </CardContent>

                    <div className="mt-auto space-y-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <CardFooter className="flex flex-col sm:flex-row gap-3 px-0 pt-4 pb-0">
                            <Button 
                                className="w-full sm:w-auto" 
                                size="lg" 
                                onClick={addToCart}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto" 
                                size="lg"
                            >
                                Buy Now
                            </Button>
                        </CardFooter>
                    </div>
                </div>
            </div>
        </Card>
    )
}
