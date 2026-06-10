import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductCatalogProps {}

export default function ProductCatalog({}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tee', 'Elbow & Bend', 'Reducer', 'Other', 'Custom'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-blue-100">
            Industrial Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our SS Pipe Fittings Range</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            SINDO Engineering manufactures and supplies SS Tees, Elbows, Bends, Reducers, and custom pipe fittings for industrial applications. We are dedicated to delivering dependable products, competitive prices, and customer-focused service.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="text-slate-400 p-1.5 hidden sm:block">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search fittings (e.g. Reducer, Elbow)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Grid of Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white py-16 px-4 text-center rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-base">No fittings matches your query. Contact us directly for custom configurations!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Category Accent Badge */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2.5 py-1 bg-slate-100 rounded">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    {/* Quick Specifications list */}
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 font-sans text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size Range</span>
                        <span className="font-semibold text-slate-700 text-right max-w-[180px] truncate" title={product.specifications.sizeRange}>
                          {product.specifications.sizeRange}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Grades</span>
                        <span className="font-semibold text-slate-700 text-right max-w-[180px] truncate">
                          {product.specifications.grades.slice(0, 3).join(', ')}
                          {product.specifications.grades.length > 3 && '...'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
