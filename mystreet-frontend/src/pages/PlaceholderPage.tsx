import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Tag } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: 'brands' | 'new-arrivals';
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-2xl w-full text-center">
        
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 text-slate-900 rounded-full mb-8 relative z-10 shadow-sm border border-gray-100">
          {icon === 'brands' ? (
            <Tag className="w-10 h-10" />
          ) : (
            <Sparkles className="w-10 h-10" />
          )}
        </div>
        
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-6 uppercase">{title}</h1>
        <p className="text-gray-500 font-medium text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-16">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-semibold uppercase tracking-wide text-xs mb-2">Status</h3>
            <p className="text-gray-400 text-sm font-bold">In Development</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-semibold uppercase tracking-wide text-xs mb-2">Release</h3>
            <p className="text-gray-400 text-sm font-bold">Phase 4 Update</p>
          </div>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-5 rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-red-600 transition-all shadow-xl shadow-black/10 space-x-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderPage;
