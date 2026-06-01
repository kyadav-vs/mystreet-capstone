import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1 group">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-2 group-hover:bg-red-600 transition-colors">
                <span className="text-white font-black text-lg italic">M</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                MyStreeT<span className="text-red-600">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/" className="text-gray-900 hover:text-red-600 transition-colors uppercase tracking-wide text-[10px] font-semibold">Catalog</Link>
            <Link to="/brands" className="text-gray-600 hover:text-red-600 transition-colors uppercase tracking-wide text-[10px] font-semibold">Brands</Link>
            <Link to="/new-arrivals" className="text-gray-600 hover:text-red-600 transition-colors uppercase tracking-wide text-[10px] font-semibold">New Arrivals</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="bg-slate-900 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors uppercase tracking-wide text-[10px] font-semibold">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-5">
            {isAuthenticated ? (
              <div className="flex items-center space-x-5">
                <span className="text-sm font-bold text-gray-900 hidden sm:block">
                  {user?.email.split('@')[0]}
                </span>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-slate-900">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link to="/cart" className="text-gray-600 hover:text-slate-900 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
