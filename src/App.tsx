import React, { useState, useEffect } from 'react';
import { Product, QuoteItem, QuoteRequest } from './types';
import { PRODUCTS, INDUSTRIES, WHY_CHOOSE_US } from './data';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import TechnicalCatalog from './components/TechnicalCatalog';
import QuoteCart from './components/QuoteCart';
import Footer from './components/Footer';
// @ts-ignore
import pipeBgImage from './assets/images/sindo_steel_pipes_bg_1780740339187.png';

// Icons for local sections
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  Target, 
  Sparkles,
  ShieldCheck, 
  Wrench,
  Award,
  Settings,
  TrendingDown,
  Truck,
  Users,
  Compass,
  Plus,
  CheckCircle2,
  Factory
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<QuoteItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Keep track of submitted quote history locally for testing and interactive richness
  const [previousInquiries, setPreviousInquiries] = useState<QuoteRequest[]>([]);
  
  // Custom past quotation view state
  const [selectedPastRequest, setSelectedPastRequest] = useState<QuoteRequest | null>(null);

  // Load quote requests and quick cart on first mount
  useEffect(() => {
    const historicalQuotes = localStorage.getItem('sindo_quotes_history');
    if (historicalQuotes) {
      try {
        setPreviousInquiries(JSON.parse(historicalQuotes));
      } catch (e) {
        console.error('Failed to parse quote history', e);
      }
    }
    
    const draftCart = localStorage.getItem('sindo_draft_cart');
    if (draftCart) {
      try {
        setCartItems(JSON.parse(draftCart));
      } catch (e) {
        console.error('Failed to parse draft cart', e);
      }
    }
  }, []);

  // Save draft cart state
  const saveCartToLocalStorage = (updatedItems: QuoteItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('sindo_draft_cart', JSON.stringify(updatedItems));
  };

  // Nav scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Manage Cart operations
  const handleAddToQuote = (product: Product, size: string, grade: string, qty: number) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && 
                item.selectedSize === size && 
                item.selectedGrade === grade
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      saveCartToLocalStorage(updated);
    } else {
      const newItem: QuoteItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        selectedSize: size,
        selectedGrade: grade,
        quantity: qty
      };
      saveCartToLocalStorage([...cartItems, newItem]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = cartItems.filter((i) => i.id !== itemId);
    saveCartToLocalStorage(updated);
  };

  const handleUpdateQty = (itemId: string, qty: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveCartToLocalStorage(updated);
  };

  const handleSubmitQuote = (request: QuoteRequest) => {
    const updatedHistory = [request, ...previousInquiries];
    setPreviousInquiries(updatedHistory);
    localStorage.setItem('sindo_quotes_history', JSON.stringify(updatedHistory));
    
    // Clear functional current cart
    saveCartToLocalStorage([]);
  };

  // Dynamically map icons to render why choose us / industry items
  const renderWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-blue-600" />;
      case 'Settings': return <Settings className="w-5 h-5 text-blue-600" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5 text-blue-600" />;
      case 'Truck': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-600" />;
      default: return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Header bar and navigation links */}
      <Header 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Sections wrapper */}
      <main className="flex-1">

        {/* Home / Hero Section */}
        <section id="home" className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-32 border-b border-slate-900 scroll-mt-20">
          
          {/* Sindo background image backplate with soft dark linear gradient overlays */}
          <div className="absolute inset-0 z-0 select-none opacity-30 pointer-events-none">
            <img 
              src={pipeBgImage} 
              alt="Stainless Steel Fittings Background" 
              className="w-full h-full object-cover filter brightness-75"
              referrerPolicy="no-referrer"
            />
            {/* Soft grid elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Written content */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Minimal label badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" /> High-Performance SS Fittings
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                    <Award className="w-3.5 h-3.5 text-emerald-400" /> ISO 9001:2015 Certified
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Manufacturer & Supplier of <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Stainless Steel</span> Pipe Fittings
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                  SINDO Engineering is a trusted manufacturer and supplier of high-quality Stainless Steel Pipe Fittings for industrial applications. We are committed to delivering precision-engineered products that meet industry standards and customer requirements.
                </p>

                {/* Statistics panel */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 max-w-lg">
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold text-white font-mono">100%</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-sans uppercase tracking-wider block">Tested Leak Proof</span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold text-white font-mono">Premium</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-sans uppercase tracking-wider block">SS316L, SS304L</span>
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-bold text-white font-mono">Global</span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-sans uppercase tracking-wider block">Standards Conformation</span>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => handleNavigate('bs-catalog')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-4 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-600/20 cursor-pointer"
                  >
                    Explore BS 4825 Catalog
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleNavigate('contact')}
                    className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-4 rounded-xl transition-all cursor-pointer"
                  >
                    Quick Quote Form
                  </button>
                </div>

              </div>

              {/* Graphical Box Feature represent */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-[360px] lg:max-w-none bg-gradient-to-b from-slate-800/80 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden backdrop-blur-sm">
                  
                  {/* Decorative faint glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

                  <h3 className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Factory className="w-3.5 h-3.5 text-blue-500" /> MANUFACTURING BRIEF
                  </h3>
                  
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300 leading-normal">
                      We focus on providing sterile, durable, and highly reliable stainless steel fittings. Each piece is pressure tested and precision finished for exact pipeline alignment.
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                        <Wrench className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-300">Custom fabrication as per drawing specifications</span>
                      </div>
                    </div>

                    {/* Quick inquiry triggers */}
                    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-2 text-[11px]">
                      <p className="text-slate-400 uppercase font-mono tracking-wider font-bold">Contact Hotline:</p>
                      <div className="space-y-1.5 font-sans">
                        <a href="tel:+918698736598" className="text-white hover:text-blue-400 transition-colors font-mono font-bold block text-sm">
                          📞 +91 86987 36598
                        </a>
                        <a href="tel:+917507099648" className="text-white hover:text-blue-400 transition-colors font-mono font-bold block text-sm">
                          📞 +91 75070 99648
                        </a>
                      </div>
                      <a href="mailto:sindoengineering@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors font-mono block pt-1.5 border-t border-slate-800/60 mt-1">
                        ✉️ sindoengineering@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Technical BS 4825-2 Standard Catalog Resource Section */}
        <TechnicalCatalog
          onAddToQuote={handleAddToQuote}
          addedProductIds={cartItems.map((item) => item.product.id)}
        />

        {/* Product Catalog view including interactive features */}
        <ProductCatalog 
          onAddToQuote={handleAddToQuote}
          addedProductIds={cartItems.map((item) => item.product.id)}
        />

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-24 bg-white border-t border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-blue-100">
                Our Strengths
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Why Choose Sindo Engineering?</h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                Our relentless attention to precision tolerances, material integrity, and supportive service makes Sindo Engineering the first choice for complex piping installations.
              </p>
            </div>

            {/* Grid of value points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_CHOOSE_US.map((point) => (
                <div 
                  key={point.title}
                  className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group hover:bg-white hover:border-slate-300"
                >
                  <div className="w-10 h-10 bg-blue-100/60 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {renderWhyIcon(point.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Industries We Serve Section */}
        <section id="industries" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900 scroll-mt-20">
          {/* Subtle industrial graphics backing */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-slate-400 text-xs font-semibold rounded-full border border-slate-800 uppercase tracking-widest mb-4">
                Applications
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Industries We Serve</h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400">
                Sindo pipe fittings are deployed in mission-critical environments globally, performing flawlessly under continuous chemical pressure and extreme sanitary regulations.
              </p>
            </div>

            {/* Industries cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {INDUSTRIES.map((ind, idx) => (
                <div 
                  key={ind.name}
                  className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-slate-700 hover:bg-slate-900/85 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[12px] font-mono font-bold text-blue-400 mb-3 block">SECTOR 0{idx + 1}</div>
                    <h3 className="text-lg font-bold text-white mb-2.5">{ind.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{ind.description}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">
                    <span>Cleanroom Checked</span>
                    <span>✓ APPROVED</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* About Us & Our Mission Section */}
        <section id="about" className="py-24 bg-white border-t border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Graphic illustration representative */}
              <div className="lg:col-span-5 order-last lg:order-first">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                  
                  {/* Glowing graphic elements */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
                  
                  <h3 className="text-sm font-mono block uppercase tracking-wider text-slate-400 font-bold border-b border-slate-200 pb-2">
                    SINDO PROTOCOLS
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-xs text-blue-600 font-mono">01</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">100% Traceable Alloys</h4>
                        <p className="text-xs text-slate-500">Every fitting tracks back to verified steel mill certified sheets.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-xs text-blue-600 font-mono">02</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Sanitary Electropolishing</h4>
                        <p className="text-xs text-slate-500">We offer highly certified grit polishing inside tees and elbows for Sterile layout runs.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-xs text-blue-600 font-mono">03</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Rigorous Pressure Testing</h4>
                        <p className="text-xs text-slate-500">Zero tolerance on leaks—fully tested against burst and hydrostatic ratings.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1 border-t border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-emerald-600 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">ISO 9001:2015 Certified</h4>
                        <p className="text-xs text-slate-500">Documented QMS ensures global benchmark compliance for every production batch.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Written content */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 border border-blue-100">
                  Company Background
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">About Sindo Engineering</h2>
                
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  At SINDO Engineering, we focus on providing durable and reliable stainless steel pipe fittings for various industrial sectors. Our products are manufactured with attention to quality, accuracy, and performance to ensure customer satisfaction.
                </p>

                {/* Sindo Mission block */}
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/60 mt-4">
                  <h3 className="font-bold text-base text-blue-900 flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" /> Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 italic">
                    "To become a trusted name in the stainless steel fittings industry by providing quality products, reliable service, and long-term customer value."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Us Deck precisely matches requirements */}
        <section id="contact" className="py-20 bg-slate-950 text-white border-t border-slate-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/20 to-slate-900 rounded-3xl border border-blue-500/20 px-6 py-12 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 mb-2">
                <Mail className="w-6 h-6 animate-bounce" />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight">Ready to Request a Live Quotation?</h2>
              
              <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                Looking for SS Tees, Elbows, Bends, Reducers, or Custom SS Fittings?
                Contact Sindo Engineering today for custom pricing, specifications, and fast commercial quotations.
              </p>

              <div className="max-w-2xl mx-auto space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                  <a 
                    href="tel:+918698736598" 
                    className="bg-white hover:bg-slate-100 text-slate-900 p-3.5 rounded-xl block font-bold transition-all shadow shadow-white/5"
                  >
                    Call: +91 86987 36598
                  </a>
                  <a 
                    href="tel:+918999293882" 
                    className="bg-white hover:bg-slate-100 text-slate-900 p-3.5 rounded-xl block font-bold transition-all shadow shadow-white/5"
                  >
                    Call: +91 89992 93882
                  </a>
                </div>
                <div className="max-w-xs sm:max-w-md mx-auto">
                  <a 
                    href="mailto:sindoengineering@gmail.com" 
                    className="bg-slate-900 hover:bg-slate-800 text-blue-400 p-3.5 rounded-xl block font-bold transition-all border border-slate-800 text-xs font-mono"
                  >
                    Email: sindoengineering@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors cursor-pointer mt-4"
              >
                Or customize sizes inside Quote Cart here
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

            </div>
          </div>
        </section>

      </main>

      {/* Footer view */}
      <Footer 
        onNavigate={handleNavigate}
        previousInquiries={previousInquiries}
        onSelectPastQuote={(quote) => {
          setSelectedPastRequest(quote);
        }}
      />

      {/* Interactive Cart Overlay Drawer */}
      <QuoteCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        onSubmitQuote={handleSubmitQuote}
      />

      {/* Pop-up modal for displaying a past/locally-saved quote */}
      {selectedPastRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 animate-in zoom-in-95 relative font-sans">
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Local Record
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedPastRequest.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedPastRequest(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-500 font-mono">Date submitted: {selectedPastRequest.createdAt}</p>
              
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wide mb-1.5 text-slate-400">Customer Info</p>
                <div className="grid grid-cols-2 gap-2">
                  <span>Name: <strong className="text-slate-900">{selectedPastRequest.contactName}</strong></span>
                  <span>Company: <strong className="text-slate-900">{selectedPastRequest.companyName || 'N/A'}</strong></span>
                  <span>Phone: <strong className="text-slate-900">{selectedPastRequest.phone}</strong></span>
                  <span>Email: <strong className="text-slate-900 text-blue-700">{selectedPastRequest.email}</strong></span>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wide mb-2 text-slate-400">Piping Components List</p>
                <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1.5">
                  {selectedPastRequest.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between bg-slate-50 p-2.5 rounded border border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900">{it.product.name}</span>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{it.selectedSize} | {it.selectedGrade}</p>
                      </div>
                      <span className="font-bold font-mono text-slate-800">{it.quantity} pcs</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPastRequest.message && (
                <div>
                  <p className="font-bold text-slate-800 uppercase text-[9px] tracking-wide mb-1 text-slate-400">Custom Fabrication message</p>
                  <p className="bg-slate-50 p-2 rounded italic text-slate-600 border border-slate-100">"{selectedPastRequest.message}"</p>
                </div>
              )}
            </div>

            <div className="flex gap-2.5 mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg text-xs font-bold uppercase transition-all border border-slate-300 text-center cursor-pointer"
              >
                Print Quote Record
              </button>
              <button 
                onClick={() => {
                  // Re-hydrate the items as draft cart
                  setCartItems(selectedPastRequest.items);
                  localStorage.setItem('sindo_draft_cart', JSON.stringify(selectedPastRequest.items));
                  setSelectedPastRequest(null);
                  setIsCartOpen(true);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                Re-load to active RFQ
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
