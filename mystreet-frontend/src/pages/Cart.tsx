import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 text-gray-300 rounded-full mb-8">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-semibold mb-4">YOUR BAG IS EMPTY</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Look like you haven't added anything to your bag yet. Explore our latest arrivals to find your perfect pair.
        </p>
        <Link 
          to="/" 
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-red-600 transition-all inline-block shadow-xl shadow-black/10"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-12 uppercase">YOUR BAG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="sm:ml-8 flex-grow text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold uppercase">{item.name}</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">{item.brand}</p>
                    <p className="mt-2 text-sm text-gray-400">Size: <span className="text-slate-900 font-bold">{item.selectedSize}</span></p>
                  </div>
                  <p className="text-xl font-semibold mt-2 sm:mt-0">${item.price}</p>
                </div>

                <div className="flex items-center justify-center sm:justify-between">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="p-2 hover:text-red-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="p-2 hover:text-red-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="ml-6 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 sticky top-32">
            <h2 className="text-2xl font-semibold mb-8 uppercase tracking-tight">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">FREE</span>
              </div>
              <div className="border-t border-gray-50 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold uppercase">TOTAL</span>
                <span className="text-3xl font-semibold text-red-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-red-600 transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              <span>CHECKOUT</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <p className="mt-6 text-center text-xs text-gray-400 font-bold uppercase tracking-wide">
              Secure checkout with MyStreeT Protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
