import React, { useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from './types';
import { ProductService } from '@/app/backend/product.service';


interface CartItemProps {
  item: product;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const quantity = item.proquan || 0;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <img 
        src={item.product_url || ''} 
        alt={item.product_name || ''} 
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{item.product_name || ''}</h3>
        <p className="text-gray-600">${(item.price || 0).toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, Math.max(0, quantity - 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <p className="w-24 text-right font-medium">
        ${(item.price * quantity).toFixed(2)}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}