import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProducts, api } from '../services/productService';
import type { Product } from '../types';
import { Plus, Trash2, Edit3, ShieldAlert, X } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: 0,
    imageUrl: '',
    sizesCsv: '',
    stockQty: 0
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [isAuthenticated, user, navigate]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        sizesCsv: product.sizesCsv,
        stockQty: product.stockQty
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        brand: '',
        description: '',
        price: 0,
        imageUrl: '',
        sizesCsv: '',
        stockQty: 0
      });
    }
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  if (loading) return <div className="text-center py-20 font-bold uppercase tracking-wide text-gray-400">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2 uppercase flex items-center">
            <ShieldAlert className="w-8 h-8 mr-4 text-red-600" />
            Admin Command Center
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">Manage the MyStreeT Catalog</p>
        </div>
        <button onClick={() => openModal()} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wide hover:bg-red-600 transition-all flex items-center shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-semibold uppercase tracking-wide text-gray-400">Product</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wide text-gray-400">Brand</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wide text-gray-400">Price</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wide text-gray-400">Stock</th>
                <th className="p-6 text-xs font-semibold uppercase tracking-wide text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <span className="font-bold text-sm uppercase">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-bold text-gray-500 uppercase">{product.brand}</td>
                  <td className="p-6 font-semibold">${product.price}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${product.stockQty && product.stockQty > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stockQty} Units
                    </span>
                  </td>
                  <td className="p-6 flex justify-end space-x-3">
                    <button onClick={() => openModal(product)} className="p-2 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-semibold uppercase">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-slate-900 transition-colors"><X className="w-6 h-6"/></button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Brand</label>
                  <input type="text" required value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Price ($)</label>
                  <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Stock Qty</label>
                  <input type="number" required value={formData.stockQty} onChange={(e) => setFormData({...formData, stockQty: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Image URL</label>
                  <input type="text" required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" placeholder="https://..." />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Sizes (CSV, e.g., "7,8,9")</label>
                  <input type="text" required value={formData.sizesCsv} onChange={(e) => setFormData({...formData, sizesCsv: e.target.value})} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 font-bold placeholder:text-gray-300 border border-gray-100 resize-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-red-600 transition-colors shadow-lg">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
