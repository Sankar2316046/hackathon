"use client";

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItemRow } from './_components/CartItems';
import { CartItem } from './_components/types';
import { useRouter } from 'next/navigation';


const initialItems: CartItem[] = [
  {
    id: '1',
    name: 'Yellow T-Shirt',
    price: 19.99,
    image: '/images/shirt1.jpg',
    quantity: 1
  },
  {
    id: '2',
    name: 'Levi Jeans',
    price: 24.99,
    image: '/images/dress1.jpg',
    quantity: 1
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 99.99,
    image: '/images/watch1.jpg',
    quantity: 1
  }
];

export function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const router = useRouter();
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

                <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" onClick={() => router.push('/payment')}>
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