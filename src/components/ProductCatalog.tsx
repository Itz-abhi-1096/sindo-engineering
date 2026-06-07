import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Search, Info, Plus, Check, SlidersHorizontal, ChevronRight, X } from 'lucide-react';

interface ProductCatalogProps {
  onAddToQuote: (product: Product, size: string, grade: string, qty: number) => void;
  addedProductIds: string[];
}

export default function ProductCatalog({ onAddToQuote, addedProductIds }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDetailsProduct, setActiveDetailsProduct] = useState<Product | null>(null);

  // Quick form state inside details modal
  const [selectedSize, setSelectedSize] = useState('');
  const [customSize, setCustomSize] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [recentlyAdded, setRecentlyAdded] = useState(false);

  const categories = ['All', 'Tee', 'Elbow & Bend', 'Reducer', 'Other', 'Custom'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDetails = (product: Product) => {
    setActiveDetailsProduct(product);
    // Auto-fill defaults based on first specs
    setSelectedSize(product.specifications.sizeRange.split(' (')[0].split(',')[0].replace(' x ', ' x '));
    setCustomSize('');
    setSelectedGrade(product.specifications.grades[0]);
    setQuantity(50); // Industrial wholesale default
    setRecentlyAdded(false);
  };

  const handleModalAdd = () => {
    if (!activeDetailsProduct) return;
    const finalSize = selectedSize === 'Custom Special Sizing'
      ? (customSize.trim() ? `${customSize.trim()}` : 'Custom Size')
      : selectedSize;
    onAddToQuote(activeDetailsProduct, finalSize, selectedGrade, quantity);
    setRecentlyAdded(true);
    setTimeout(() => {
      setRecentlyAdded(false);
      setActiveDetailsProduct(null);
    }, 1200);
  };

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
              const isAdded = addedProductIds.includes(product.id);
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
                      {isAdded && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 animate-fade-in">
                          <Check className="w-3.5 h-3.5" /> Added
                        </span>
                      )}
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

                    {/* Action buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenDetails(product)}
                        className="text-slate-700 hover:text-blue-600 font-semibold text-xs flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg cursor-pointer"
                      >
                        <Info className="w-4 h-4" /> Technical Specs
                      </button>

                      <button
                        onClick={() => handleOpenDetails(product)}
                        className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-wider cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> RFQ Form
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Technical Specifications Modal & Quick Quote Form */}
      {activeDetailsProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col p-6 sm:p-8 animate-in zoom-in-95 duration-200 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-slate-100 px-2.5 py-1 rounded">
                  {activeDetailsProduct.category} Catalog Item
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeDetailsProduct.name}</h3>
              </div>
              <button
                onClick={() => setActiveDetailsProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 flex-1 text-slate-700">
              
              {/* Product Intro & Features */}
              <div>
                <h4 className="font-semibold text-sm text-slate-800 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeDetailsProduct.longDescription}
                </p>
                
                <h4 className="font-semibold text-sm text-slate-800 uppercase tracking-wider mt-4 mb-2">Key Quality Features</h4>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                  {activeDetailsProduct.features.map((feat, index) => (
                    <li key={index}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Block */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  Engineering Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs font-sans">
                  <div className="col-span-2">
                    <span className="text-slate-400 block mb-0.5">Size range</span>
                    <span className="font-bold text-slate-800">{activeDetailsProduct.specifications.sizeRange}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block mb-0.5">Steel Material Grades available</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeDetailsProduct.specifications.grades.map((grd) => (
                        <span key={grd} className="bg-white border border-slate-200 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded">
                          {grd}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block mb-0.5">Compliance standards</span>
                    <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50/50 px-2 py-1.5 rounded">
                      {activeDetailsProduct.specifications.standards.join(' | ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to RFQ Cart configuration Box */}
              <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-4 sm:p-5">
                <h4 className="font-bold text-sm text-slate-900 mb-3.5 text-blue-900">Configure RFQ Specifications</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Select size */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Diameter Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg p-2 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {activeDetailsProduct.specifications.sizeRange.split(',').map((part) => {
                        const val = part.trim().split(' (')[0].replace(' x ', ' x ');
                        return <option key={val} value={val}>{val}</option>;
                      })}
                      <option value="Custom Special Sizing">Custom Sizing (Specify below)</option>
                    </select>
                  </div>

                  {/* Select Grade */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Material Grade</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg p-2 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {activeDetailsProduct.specifications.grades.map((grd) => (
                        <option key={grd} value={grd}>{grd}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Sizing input field if Custom Sizing option is selected */}
                  {selectedSize === 'Custom Special Sizing' && (
                    <div className="col-span-1 sm:col-span-2 animate-in slide-in-from-top-2 duration-200 font-sans">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Specify Custom Size</label>
                      <input
                        type="text"
                        placeholder='e.g., 2.5", 3-1/2", 4" x 3", or bespoke dimensions'
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 items-end mt-4 pt-1">
                  {/* Quantity */}
                  <div className="w-1/3">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Required Qty (pcs)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 50"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  {/* Button Submission */}
                  <button
                    onClick={handleModalAdd}
                    disabled={recentlyAdded}
                    className={`flex-1 font-semibold text-xs py-3.5 px-4 rounded-lg flex items-center justify-center gap-1.5 uppercase tracking-wider transition-all cursor-pointer ${
                      recentlyAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {recentlyAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add to Quote Cart
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
