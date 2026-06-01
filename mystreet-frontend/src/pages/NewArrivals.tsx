import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewest = async () => {
      try {
        // Fetch products sorted by newest
        const data = await getProducts('', '', '', '', 'newest');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewest();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 text-slate-900 py-24 px-4 text-center relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white p-4 rounded-full mb-6 shadow-sm border border-gray-100">
            <Sparkles className="w-10 h-10 text-slate-900" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight uppercase mb-4">The Latest Drops</h1>
          <p className="text-gray-500 font-medium uppercase tracking-wide text-xs max-w-xl mx-auto">
            Fresh out the box. Secure the newest silhouettes before they sell out.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-semibold tracking-tight uppercase">Just Landed</h2>
          <Link to="/" className="text-xs font-bold text-gray-400 hover:text-slate-900 uppercase tracking-wide flex items-center transition-colors">
            View All Catalog <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
