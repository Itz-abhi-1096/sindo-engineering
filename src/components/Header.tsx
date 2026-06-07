import React, { useState } from 'react';
import { Menu, X, Flame, Phone, Mail, Award, ArrowUpRight } from 'lucide-react';
import SindoLogo from './SindoLogo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  cartCount: number;
  openCart: () => void;
}

export default function Header({ onNavigate, activeSection, cartCount, openCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'BS 4825 Catalog', href: '#bs-catalog' },
    { name: 'Products', href: '#products' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Industries', href: '#industries' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const elementId = href.replace('#', '');
    onNavigate(elementId);
  };

  return (
    <>
      {/* Top Banner Contact bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-sans flex-wrap">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <a href="tel:+918698736598" className="hover:text-white transition-colors mr-1">+91 86987 36598</a>
              <span className="text-slate-700">|</span>
              <a href="tel:+917507099648" className="hover:text-white transition-colors ml-1">+91 75070 99648</a>
            </span>
            <span className="flex items-center gap-1.5 font-sans">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a href="mailto:sindoengineering@gmail.com" className="hover:text-white transition-colors">sindoengineering@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px] tracking-wider uppercase">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-yellow-500" /> ISO 9001:2015 CERTIFIED MANUFACTURER
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <SindoLogo size={44} className="group-hover:scale-105 transition-transform duration-200" />
            <div className="flex flex-col">
              <span className="text-xl font-bold font-sans tracking-tight text-slate-900 uppercase">
                SINDO <span className="text-blue-600">Engineering</span>
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  SS Fittings
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[9px] font-bold font-sans bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded border border-amber-500/20 uppercase tracking-wider flex items-center gap-0.5">
                  <Award className="w-2.5 h-2.5 text-amber-600 shrink-0" /> ISO 9001:2015
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const elementId = item.href.replace('#', '');
              const isActive = activeSection === elementId;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-all relative py-2 ${
                    isActive 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:translate-y-[-1px]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-all flex items-center gap-2 group border border-slate-200"
              title="View quote request cart"
            >
              <div className="relative">
                {/* Simulated quote cart layout icon */}
                <div className="w-5 h-5 flex flex-col justify-between items-center">
                  <div className="w-4 h-1 bg-slate-700 rounded-sm"></div>
                  <div className="w-4 h-1 bg-slate-700 rounded-sm"></div>
                  <div className="w-3 h-1 bg-slate-700 rounded-sm"></div>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-3.5 -right-3.5 bg-blue-600 text-white text-[11px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline text-slate-700 group-hover:text-slate-900">
                RFQ Cart
              </span>
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg hidden sm:flex items-center gap-1.5 uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 cursor-pointer"
            >
              Get Quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-20 left-0 right-0 bg-white shadow-xl border-b border-slate-200 flex flex-col p-6 gap-4 animate-in fade-in slide-in-from-top-4 duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-4 font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="h-px bg-slate-100 my-2"></div>

            <div className="flex flex-col gap-3 font-sans text-xs text-slate-500">
              <p className="font-semibold text-slate-700 uppercase tracking-widest text-[10px]">Direct Contact</p>
              <a href="tel:+918698736598" className="flex items-center gap-2 py-1 hover:text-blue-600 text-slate-700 font-mono">
                <Phone className="w-4 h-4 text-blue-500" /> +91 86987 36598
              </a>
              <a href="tel:+917507099648" className="flex items-center gap-2 py-1 hover:text-blue-600 text-slate-700 font-mono">
                <Phone className="w-4 h-4 text-blue-500" /> +91 75070 99648
              </a>
              <a href="mailto:sindoengineering@gmail.com" className="flex items-center gap-2 py-1 hover:text-blue-600 text-slate-700 font-mono">
                <Mail className="w-4 h-4 text-blue-500" /> sindoengineering@gmail.com
              </a>
            </div>
            
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full bg-blue-600 text-white font-bold text-center py-3.5 rounded-lg text-sm transition-all tracking-wider uppercase mt-2 shadow-lg"
            >
              Request a Fast Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
