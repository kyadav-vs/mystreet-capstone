import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Product } from '../types';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const ProductList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBrand = queryParams.get('brand') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter & Sort State
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [sortOption, setSortOption] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const brands = ['Nike', 'Adidas', 'Converse', 'Vans', 'Reebok'];

  useEffect(() => {
    fetchProducts();
  }, [selectedBrand, sortOption]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(selectedBrand, '', minPrice, maxPrice, sortOption);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSortOption('');
    setSelectedBrand('');
    setShowFilters(false);
    // Note: useEffect will trigger a refetch when sortOption or selectedBrand changes, 
    // but to be safe, we can manually refetch or let React state handle it.
  };

  // We should trigger a refetch when clear filters is clicked if state didn't change but we had active price filters
  useEffect(() => {
    if(!showFilters && !minPrice && !maxPrice && !selectedBrand && !sortOption) {
      fetchProducts();
    }
  }, [minPrice, maxPrice, selectedBrand, sortOption, showFilters]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] bg-gray-100 rounded-3xl overflow-hidden mb-16 shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=2000" 
          alt="Sneaker Banner" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16">
          <h2 className="text-white text-4xl sm:text-6xl font-semibold mb-4 drop-shadow-md">Summer Collection</h2>
          <p className="text-white text-lg max-w-lg mb-8 drop-shadow-md">Discover the most sought-after releases of the season. Elevate your everyday style with premium footwear.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2 uppercase">The Catalog</h1>
          <p className="text-gray-500 font-bold uppercase tracking-wide text-[10px]">Curated footwear collection</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative inline-block text-left">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-5 py-2.5 pr-10 text-xs font-semibold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="newest">Newest Drops</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="relative inline-block text-left">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-5 py-2.5 pr-10 text-xs font-semibold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <Filter className="w-4 h-4" />
            </div>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${showFilters ? 'bg-red-600 text-white' : 'bg-slate-900 text-white hover:bg-gray-800'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {showFilters && (
        <div className="mb-12 bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Advanced Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleApplyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Min Price ($)</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 outline-none transition-all font-bold placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Max Price ($)</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 outline-none transition-all font-bold placeholder:text-gray-300"
              />
            </div>
            <div className="flex space-x-3">
              <button 
                type="submit" 
                className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold text-[10px] uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
              <button 
                type="button" 
                onClick={handleClearFilters}
                className="flex-1 bg-white text-slate-900 border border-gray-200 py-3 rounded-xl font-semibold text-[10px] uppercase tracking-wide hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-bold mb-4 uppercase tracking-wide text-xs">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-900 font-semibold text-2xl uppercase tracking-tight mb-2">No Kicks Found</p>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-wide">Adjust your filters and try again.</p>
          <button 
            onClick={handleClearFilters}
            className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors inline-block"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
