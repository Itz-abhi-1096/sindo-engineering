import React, { useState } from 'react';
import { PRODUCTS, INDUSTRIES, WHY_CHOOSE_US } from './data';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import TechnicalCatalog from './components/TechnicalCatalog';
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
  Factory
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Contact Form state variables
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Nav scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    setContactSuccess(false);

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please fill in all mandatory fields (Name, Email, and Message).');
      return;
    }

    setContactSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          phone: contactPhone.trim(),
          subject: contactSubject.trim(),
          message: contactMessage.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setContactSuccess(true);
        // Clear fields
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactSubject('');
        setContactMessage('');
      } else {
        setContactError(data.error || 'Failed to dispatch your messages. Please check your network and try again.');
      }
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setContactError('A network error occurred. Please verify your connection or use direct mailto link below.');
    } finally {
      setContactSending(false);
    }
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
                    onClick={() => handleNavigate('products')}
                    className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-4 rounded-xl transition-all cursor-pointer"
                  >
                    Browse Products
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
        <TechnicalCatalog />

        {/* Product Catalog view including interactive features */}
        <ProductCatalog />

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
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 mb-2">
                <Mail className="w-6 h-6 animate-bounce" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Request a Live Quotation?</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Looking for SS Tees, Elbows, Bends, Reducers, or Custom SS Fittings?
                Submit your project parameters directly below, or contact Sindo Engineering sales at your convenience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              
              {/* Left Column: Direct Contact Details */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Direct Contact Channels</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-mono block mb-1">Commercial Sales Hotline</span>
                      <div className="grid grid-cols-1 gap-2">
                        <a 
                          href="tel:+918698736598" 
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white p-3 rounded-xl block font-bold transition-all text-sm font-mono flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                          +91 86987 36598
                        </a>
                        <a 
                          href="tel:+918999293882" 
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white p-3 rounded-xl block font-bold transition-all text-sm font-mono flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                          +91 89992 93882
                        </a>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-mono block mb-1">Direct Sales Email</span>
                      <a 
                        href="mailto:sindoengineering@gmail.com" 
                        className="bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/50 hover:border-blue-800 text-blue-400 p-3.5 rounded-xl block font-bold transition-all text-sm font-mono flex items-center gap-2.5 break-all"
                      >
                        <Mail className="w-4.5 h-4.5 text-blue-400 animate-pulse" />
                        sindoengineering@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Direct Message Mail Form */}
              <div className="lg:col-span-7">
                <form 
                  onSubmit={handleContactSubmit}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4"
                >
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Send Direct Message</h3>
                  
                  {contactError && (
                    <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs p-3.5 rounded-xl">
                      {contactError}
                    </div>
                  )}

                  {contactSuccess && (
                    <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs p-4 rounded-xl space-y-1">
                      <strong className="block text-emerald-400">✓ Message Dispatched Correctly!</strong>
                      <p className="text-slate-300">
                        Sindo's sales team has received your message. We have sent a copy directly to <strong className="text-white">sindoengineering@gmail.com</strong>.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input 
                        type="tel" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Subject / Topic
                      </label>
                      <input 
                        type="text" 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder="e.g., Custom fitting pricing, catalogs"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Message Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea 
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Type your questions or specific sizing requests here..."
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans leading-relaxed resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {contactSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message Securely"
                    )}
                  </button>

                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer view */}
      <Footer 
        onNavigate={handleNavigate}
      />

    </div>
  );
}
