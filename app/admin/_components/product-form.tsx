"use client"
import { ProductService } from '@/app/backend/product.service';
import { useState } from 'react';
import { product } from '@/app/backend/product.service';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<product>({
        product_name: '',
        description: '',
        price: 0,
        product_url: '',
        category: '',
        quantity: 0,
        rating: 0,
        discount: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({  
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productService = new ProductService();
        productService.addProduct(formData);
        toast.success('Product added successfully');
        router.push('/products');
    };

    return (
        <Card className="w-1/2 mx-auto">
            <CardHeader>
                <CardTitle className='text-2xl font-bold text-center'>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                            name="category"
                            value={formData.category}
                            onValueChange={(value) => setFormData(prev => ({
                                ...prev,
                                category: value
                            }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Clothing">Clothing</SelectItem>
                                <SelectItem value="Furniture">Furniture</SelectItem>
                                <SelectItem value="Books">Books</SelectItem>
                                <SelectItem value="Health & Beauty">Health & Beauty</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                   
                    <div className="space-y-2 ">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>

                       
                        <div className="space-y-2">
                            <Label>Discount (%)</Label>
                            <Input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                required
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Product URL</Label>
                        <Input
                            type="url"
                            name="product_url"
                            value={formData.product_url}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    
                    <Button type="submit" className="w-full">
                        Add Product
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}