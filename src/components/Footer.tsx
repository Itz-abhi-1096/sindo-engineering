import React from 'react';
import { Phone, Mail, MapPin, Shield, HelpCircle, FileSpreadsheet, Download, RefreshCw, Layers } from 'lucide-react';
import { QuoteRequest } from '../types';
import SindoLogo from './SindoLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  previousInquiries: QuoteRequest[];
  onSelectPastQuote: (quote: QuoteRequest) => void;
}

export default function Footer({ onNavigate, previousInquiries, onSelectPastQuote }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      
      {/* Top statistics overview bar */}
      <div className="border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">10+</span>
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-slate-500 mt-1 block">Fittings Categories</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</span>
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-slate-500 mt-1 block">ASME/DIN Conformant</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">24/7</span>
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-slate-500 mt-1 block">Procurement Support</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800/80">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <SindoLogo size={36} />
            <span className="text-lg font-bold text-white tracking-tight uppercase">
              SINDO <span className="text-blue-500">Engineering</span>
            </span>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Trusted manufacturer and supplier of precision-formed Stainless Steel Pipe Fittings for pharmaceutical, chemical, water treatment, food, and industrial sectors. Committed to durability and excellence.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wide text-slate-500">
            <Shield className="w-4 h-4 text-emerald-500" /> ISO CERTIFIED ISO 9001 STATUS REGISTERED
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-white">SS Pipe Products</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                SS Tees (Equal / Reducing Tees)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                SS Elbows & Bends (45° / 90° Radius)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                SS Reducers (Concentric / Eccentric)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-blue-400">
                Custom SS Pipe Fittings fabrication
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info details precisely matching request */}
        <div id="footer-contact" className="space-y-4 scroll-mt-24">
          <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-white">Commercial Office</h4>
          
          <div className="space-y-3.5 text-xs text-slate-400 font-sans">
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold text-white">Direct Phone Call</p>
                <a href="tel:+918698736598" className="font-mono text-blue-400 hover:underline block">+91 86987 36598</a>
                <a href="tel:+918999293882" className="font-mono text-blue-400 hover:underline block">+91 89992 93882</a>
                <a href="tel:+917507099648" className="font-mono text-blue-400 hover:underline block">+91 75070 99648</a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-white">Official Mailbox</p>
                <a href="mailto:sindoengineering@gmail.com" className="font-mono text-blue-400 hover:underline">sindoengineering@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-white">Manufacturing Premises</p>
                <span className="text-slate-400 leading-relaxed block">
                  GALA NO. M6 GROUND FLOOR, BAJAJ COURT INDUSTRIAL PREMISES SOCIETY LTD UCHHAT ROAD OPP EXCEL PACKAGING VILLAGE VADAVALI, TALUKA-VADA DIST- PALGHAR
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Historical Quote Inquiries Log Panel (Unique local state feature) */}
      {previousInquiries.length > 0 && (
        <div className="bg-slate-950/60 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-white mb-4 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-500" /> Your Local Inquiry History ({previousInquiries.length})
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {previousInquiries.map((inq) => (
                <div 
                  key={inq.id}
                  onClick={() => onSelectPastQuote(inq)}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 p-4 rounded-xl cursor-pointer transition-all flex justify-between items-center group"
                >
                  <div>
                    <span className="font-mono font-bold text-white">{inq.id}</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">{inq.createdAt}</p>
                    <p className="text-xs font-semibold text-blue-400 mt-1">{inq.items.length} items configured</p>
                  </div>
                  <button className="p-2 bg-slate-950 text-slate-400 group-hover:text-blue-400 rounded-lg transition-colors border border-slate-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Legal bar */}
      <div className="bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-[11px] text-slate-600 font-sans">
          <p>© 2026 Sindo Engineering. All rights reserved.</p>
          <p className="font-mono text-[10px]">PRESET FOR CORROSION RESISTANT SYSTEM LAYOUTS | TRACEABILITY PROTOCOL ACTIVE</p>
        </div>
      </div>

    </footer>
  );
}
