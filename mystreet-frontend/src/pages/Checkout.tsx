import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/productService';
import { ShieldCheck, ArrowRight, CreditCard, User, Mail, MapPin, Phone } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect if cart is empty AND we are not currently loading an order placement
    if (cartItems.length === 0 && !loading) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate, loading]);

  if (cartItems.length === 0 && !loading) {
    return null; // Prevent rendering before redirect
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const items = cartItems.map(item => ({
      productId: item.id,
      selectedSize: item.selectedSize,
      quantity: item.quantity
    }));

    try {
      const order = await createOrder({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        paymentMode: "MOCK_CARD",
        items
      });
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-12 uppercase">SECURE CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Form */}
          <div className="lg:col-span-7">
            {error && (
              <div className="bg-slate-900 text-white p-4 rounded-xl mb-8 text-xs font-bold uppercase tracking-wide border-l-4 border-red-600 flex items-center shadow-lg">
                {error}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">1</div>
                  <h2 className="text-xl font-semibold uppercase tracking-tight">Contact Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                      <input
                        type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">Last Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                      <input
                        type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                      <input
                        type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">2</div>
                  <h2 className="text-xl font-semibold uppercase tracking-tight">Shipping Address</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">Street Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-slate-900 transition-colors" />
                      <input
                        type="text" name="address" required value={formData.address} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="123 Sneaker St, Apt 4B"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">City</label>
                      <input
                        type="text" name="city" required value={formData.city} onChange={handleChange}
                        className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="New York"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">State/Province</label>
                      <input
                        type="text" name="state" required value={formData.state} onChange={handleChange}
                        className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="NY"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 ml-1">ZIP Code</label>
                      <input
                        type="text" name="zipcode" required value={formData.zipcode} onChange={handleChange}
                        className="w-full px-6 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold placeholder:text-gray-300"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info (Mock) */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">3</div>
                  <h2 className="text-xl font-semibold uppercase tracking-tight">Payment Method</h2>
                </div>
                
                <div className="p-6 border-2 border-slate-900 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-red-500 rounded"></div>
                        <div className="w-8 h-5 bg-yellow-500 rounded -ml-4 mix-blend-multiply"></div>
                      </div>
                    </div>
                    <p className="font-mono text-xl md:text-2xl tracking-wide mb-4 text-gray-300">•••• •••• •••• 4242</p>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      <span>Cardholder Name<br/><span className="text-white text-sm">MOCK PAYMENT</span></span>
                      <span className="text-right">Expires<br/><span className="text-white text-sm">12/28</span></span>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  No real charge will be made
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-semibold text-sm uppercase tracking-wide hover:bg-red-600 transition-all active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-black/20 flex items-center justify-center space-x-4"
              >
                <span>{loading ? 'Processing...' : 'Place Order • $' + cartTotal.toFixed(2)}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 sticky top-32">
              <h2 className="text-2xl font-semibold mb-8 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm uppercase leading-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-wide text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium text-sm">
                  <span>Taxes</span>
                  <span className="text-slate-900 font-bold uppercase tracking-wide text-[10px]">Calculated at next step</span>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-end">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-400">Total</span>
                  <span className="text-4xl font-semibold text-red-600 tracking-tight">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
