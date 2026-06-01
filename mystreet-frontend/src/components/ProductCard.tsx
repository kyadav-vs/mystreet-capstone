import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if clicking the button
    const defaultSize = product.sizesCsv.split(',')[0];
    addToCart(product, defaultSize);
  };

  return (
    <div className="group flex flex-col bg-white hover:bg-gray-50 transition-colors duration-500 rounded-2xl overflow-hidden">
      <Link to={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white text-slate-900 text-[9px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-sm">
            {product.brand}
          </span>
        </div>
      </Link>
      
      <div className="pt-6 pb-4 px-2 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/products/${product.id}`} className="text-sm font-semibold uppercase tracking-tight text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1 pr-4">
            {product.name}
          </Link>
          <p className="text-sm font-bold text-gray-500">${product.price}</p>
        </div>
        
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-6">
          {product.sizesCsv.split(',').length} Sizes Available
        </p>
        
        <div className="mt-auto">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-between bg-slate-900 text-white px-5 py-3.5 rounded-xl font-semibold text-[10px] uppercase tracking-wide hover:bg-red-600 transition-all active:scale-[0.98]"
          >
            <span>Quick Add</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
