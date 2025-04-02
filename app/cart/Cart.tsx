"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItemRow } from './_components/CartItems';
import { CartItem } from './_components/types';
import { ProductService } from '../backend/product.service';

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const cartItems = await productService.getCartItems();
        setItems(cartItems);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error('Error fetching cart items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(id);
      return;
    }

    try {
      const updatedCartItems = await productService.updateCartItem(id, newQuantity);
      const updatedItems = items.map(item => {
        const cartItem = updatedCartItems.find(ci => ci.product_id === item.id);
        return cartItem ? { ...item, quantity: cartItem.quantity } : item;
      });
      setItems(updatedItems);
    } catch (err) {
      console.error('Error updating cart item:', err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await productService.removeCartItem(id);
      const updatedCart = await productService.getCartItems();
      setItems(updatedCart);
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.proquan), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading cart items...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {items.map(item => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping {subtotal > 100 && '(Free over $100)'}</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}