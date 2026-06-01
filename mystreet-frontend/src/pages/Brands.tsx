import React from 'react';
import { Link } from 'react-router-dom';

const Brands: React.FC = () => {
  const brandData = [
    {
      name: 'Nike',
      description: 'Just Do It. The ultimate standard in athletic and streetwear footwear.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
      logo: 'N'
    },
    {
      name: 'Adidas',
      description: 'Impossible is Nothing. Creators of the iconic Three Stripes.',
      image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=1200',
      logo: 'A'
    },
    {
      name: 'Converse',
      description: 'The iconic high-top that started it all.',
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1200',
      logo: 'C'
    },
    {
      name: 'Vans',
      description: 'Off the Wall. The original action sports footwear brand.',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1200',
      logo: 'V'
    },
    {
      name: 'Reebok',
      description: 'Classic leather, timeless style.',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200',
      logo: 'R'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-semibold tracking-tight uppercase mb-4">The Brands</h1>
        <p className="text-gray-400 font-bold uppercase tracking-wide text-xs max-w-xl mx-auto">
          Explore our curated collection of the world's most iconic sneaker manufacturers. 
          Each with a unique legacy, all available right here.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {brandData.map((brand, index) => (
            <Link 
              key={index}
              to={`/?brand=${brand.name}`} 
              className={`group relative overflow-hidden rounded-[2rem] bg-gray-100 flex flex-col justify-end p-10 min-h-[400px] hover:shadow-2xl transition-all duration-500 ${index === 0 ? 'md:col-span-2 min-h-[500px]' : ''}`}
            >
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white text-slate-900 font-semibold text-2xl flex items-center justify-center rounded-xl mb-4 shadow-lg">
                  {brand.logo}
                </div>
                <h2 className="text-4xl font-semibold text-white tracking-tight uppercase mb-2 group-hover:text-red-500 transition-colors">
                  {brand.name}
                </h2>
                <p className="text-gray-300 font-medium max-w-sm">
                  {brand.description}
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wide group-hover:bg-red-600 group-hover:text-white transition-colors">
                    Shop {brand.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
