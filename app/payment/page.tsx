"use client";

import React, { useState } from 'react';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';

interface PaymentFormData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  name: string;
}

function page() {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + ' / ' + v.slice(2, 4);
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpiry(value);
    } else if (name === 'cvc') {
      value = value.replace(/[^0-9]/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8">
            <h1 className="text-2xl font-bold text-white text-center">Complete Payment</h1>
            <p className="mt-2 text-indigo-200 text-center">Secure payment processing</p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            {/* Amount Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">$99.00</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-white"
                    placeholder="John Smith"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-white"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-white"
                    placeholder="MM / YY"
                    maxLength={7}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-white"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Lock className="h-5 w-5 mr-2" />
              Pay Now
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;