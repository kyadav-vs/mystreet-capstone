import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Box, ArrowRight, MapPin, Truck } from 'lucide-react';
import { getOrderById } from '../services/productService';
import type { OrderResponse } from '../services/productService';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold mb-4">ORDER NOT FOUND</h1>
        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-slate-900 underline">Return to Home</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="bg-white rounded-t-[2rem] p-12 text-center border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2 uppercase">Order Confirmed</h1>
          <p className="text-gray-500 font-medium">Thank you, {order.firstName}! Your order has been received.</p>
        </div>

        <div className="bg-white p-12 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Col: Order Info */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-6">Order Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Box className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Order ID</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{order.id.split('-')[0].toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-600 bg-green-100 px-3 py-1 rounded-full">{order.status}</span>
                </div>
              </div>

              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mt-10 mb-6">Shipping Information</h2>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">{order.firstName} {order.lastName}</p>
                    <p className="text-gray-500 text-sm mt-1">{order.shippingAddress}</p>
                    <p className="text-gray-500 text-sm">{order.city}, {order.state} {order.zipcode}</p>
                    <p className="text-gray-500 text-sm mt-2">{order.email}</p>
                    <p className="text-gray-500 text-sm">{order.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Items */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-6">Order Summary</h2>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm uppercase leading-tight">{item.product.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">${(item.priceAtTime * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600 uppercase text-[10px] tracking-wide">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-900">Total</span>
                  <span className="text-3xl font-semibold text-red-600">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white rounded-b-[2rem] p-8 text-center flex justify-center">
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-red-600 transition-all shadow-xl shadow-black/10 flex items-center justify-center space-x-3"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
