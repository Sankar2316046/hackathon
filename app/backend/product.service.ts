import supabase from '@/lib/supabase';
import { AuthService } from './auth.service';

export interface product{

    id: string;
    product_name: string;
    description: string;
    price: number;
    product_url: string;
    category: string;
    quantity: number;
    rating: number;
    discount: number;
}

export interface cartitem{
    id?: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    price: number;
}
export class ProductService {
    async addProduct(product: product): Promise<product> {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .single();

        if (error) throw error;

        return data;
    }
    async getAllProducts(): Promise<product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;

        return data;
    }
    async updateProduct(product: product): Promise<product> {
        const { data, error } = await supabase
            .from('products')
            .update([product])
            .single();

        if (error) throw error;

        return data;
    }   
    async deleteProduct(id: string): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
    async getProductById(id: string): Promise<product> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return data;
    }
    async getProductsByCategory(category: string): Promise<product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category);

        if (error) throw error;

        return data;
    }
    async addtocart(product: product) {
        const auth = new AuthService();
        const userid = await auth.getCurrentUserId();
        console.log(userid);
        const cartid = await supabase
            .from('cart')   
            .select('id')
            .eq('user_id', userid)
            .single();
        console.log(cartid)
            if (cartid) {
            const { data, error } = await supabase
                .from('cartitems')
                .insert({
                    cart_id: cartid.data?.id,
                    product_id: product.id,
                    quantity: 1,
                    price: product.price,
                });
                if (error) throw error;
                return data;
            }
            return null;
    }
    async getCartItems() {
        const auth = new AuthService();
        const userid = await auth.getCurrentUserId();
        const cartid = await supabase
            .from('cart')
            .select('id')
            .eq('user_id', userid)
            .single();

        if (!cartid.data?.id) {
            throw new Error('Cart not found');
        }

        // Get cart items with their quantities
        const { data: cartItems, error: cartItemsError } = await supabase
            .from('cartitems')
            .select('product_id, quantity')
            .eq('cart_id', cartid.data.id);

        if (cartItemsError) throw cartItemsError;

        // Get products and map them with their quantities
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .in('id', cartItems?.map((item) => item.product_id) || []);

        if (productsError) throw productsError;

        // Map products with their quantities
        const productsWithQuantity = products?.map(product => {
            const cartItem = cartItems?.find(item => item.product_id === product.id);
            return {
                ...product,
                proquan: cartItem?.quantity || 0
            };
        }) || [];

        return productsWithQuantity;
    }

    async getquantity(id: string) {
        const { data, error } = await supabase
            .from('cartitems')
            .select('quantity,price')
            .eq('product_id', id)
            .single();
        if (error) throw error;
        return data;
    }
    async updateCartItem(id: string, quantity: number) {
        const { data, error } = await supabase
            .from('cartitems')
            .update({ quantity })
            .eq('product_id', id)
            .single();
        if (error) throw error;
        return data;
    }
    async removeCartItem(id: string) {
        const { error } = await supabase
            .from('cartitems')
            .delete()
            .eq('product_id', id);
        if (error) throw error;
    }
}