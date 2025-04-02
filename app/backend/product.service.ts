import supabase from '@/lib/supabase';

export interface product{

    id: number;
    product_name: string;
    description: string;
    price: number;
    product_url: string;
    category: string;
    quantity: number;
    rating: number;
    discount: number;
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
    async deleteProduct(id: number): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
    async getProductById(id: number): Promise<product> {
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
}