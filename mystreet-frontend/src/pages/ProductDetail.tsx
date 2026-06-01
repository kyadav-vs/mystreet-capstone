import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Star, Shield, Truck } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        // Default to first size if available
        if (data.sizesCsv) {
          setSelectedSize(data.sizesCsv.split(',')[0]);
        }
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

  if (error || !product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">PRODUCT NOT FOUND</h2>
      <button onClick={() => navigate('/')} className="text-red-600 font-bold hover:underline flex items-center justify-center mx-auto">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
      </button>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    // Optional: show feedback or navigate to cart
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')} 
        className="mb-8 text-gray-500 hover:text-slate-900 transition-colors flex items-center font-bold text-sm uppercase tracking-wide"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl shadow-gray-200/50">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-sm border border-white/20">
              {product.brand}
            </                     span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-yellow-400 mb-4">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-gray-400 text-xs font-bold ml-2">(48 Reviews)</span>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-2 uppercase">{product.name}</h1>
            <p className="text-2xl font-semibold text-red-600">${product.price}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description || "A premium sneaker designed for style and performance. Built with high-quality materials to ensure durability and comfort throughout the day."}
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Select Size</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizesCsv.split(',').map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                    selectedSize === size
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                      : 'border-gray-100 bg-white text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-red-600 transition-all shadow-xl shadow-black/10 active:scale-95 mb-10"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>ADD TO BAG</span>
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Authentic Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
