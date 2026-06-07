import React, { useState } from 'react';
import { QuoteItem, QuoteRequest } from '../types';
import { INDUSTRIES } from '../data';
import { X, Trash2, Calendar, FileText, CheckCircle2, Factory, PhoneCall, MailOpen, Landmark, Sparkles, Mail, Copy, Check } from 'lucide-react';

interface QuoteCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQty: (itemId: string, qty: number) => void;
  onSubmitQuote: (request: QuoteRequest) => void;
}

export default function QuoteCart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQty,
  onSubmitQuote
}: QuoteCartProps) {
  
  // Quote form state
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [message, setMessage] = useState('');
  
  // Validation indicator
  const [formError, setFormError] = useState('');
  
  // Submitted RFQ Document layout state
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequest | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Approximate weight estimator for fun & engineering realism
  const calculateEstWeight = (item: QuoteItem) => {
    let baseWeight = 2.0; // standard item
    if (item.product.category === 'Tee') baseWeight = 3.5;
    if (item.product.category === 'Elbow & Bend') baseWeight = 2.2;
    if (item.product.category === 'Reducer') baseWeight = 1.8;
    return (baseWeight * item.quantity).toFixed(1);
  };

  const totalEstWeight = cartItems.reduce((acc, item) => {
    return acc + (parseFloat(calculateEstWeight(item)));
  }, 0).toFixed(1);

  const generatePlaintextRFQ = (req: QuoteRequest) => {
    const itemsText = req.items.map((item, idx) => {
      return `${idx + 1}. ${item.product.name} - Size: ${item.selectedSize} (Grade: ${item.selectedGrade}) - Qty: ${item.quantity} pcs`;
    }).join('\n');
    
    return `Dear Sindo Engineering Sales Team,

I would like to request a commercial price quotation for the following Stainless Steel pipe fittings parameters:

--- RFQ OVERVIEW ---
Reference ID: ${req.id}
Contact Person: ${req.contactName}
Company Name: ${req.companyName || 'Not Provided (Direct/Retail)'}
Direct Phone: ${req.phone}
Registered Email: ${req.email}
Industry Sector: ${req.industry}

--- INQUIRY ITEMS ---
${itemsText}

${req.message ? `--- CUSTOM REQUIREMENTS & DRAWING SPECS ---\n"${req.message}"\n` : ''}
---
Estimated Shipping Weight: ~${req.items.reduce((acc, item) => acc + (parseFloat(calculateEstWeight(item))), 0).toFixed(1)} KGS

Please review these specifications and send your official quotation to my email address (${req.email}) as soon as possible.

Best regards,
${req.contactName}
${req.companyName ? req.companyName : ''}`;
  };

  const generateMailtoLink = (req: QuoteRequest) => {
    const subject = encodeURIComponent(`[RFQ Inquiry] ${req.id} - ${req.companyName || req.contactName}`);
    const body = encodeURIComponent(generatePlaintextRFQ(req));
    return `mailto:sindoengineering@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyToClipboard = (req: QuoteRequest) => {
    const text = generatePlaintextRFQ(req);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cartItems.length === 0) {
      setFormError('Your RFQ Cart is empty. Add fittings from the catalog first!');
      return;
    }

    if (!contactName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Please fill in all mandatory field highlights (Name, Phone, and Email).');
      return;
    }

    // Create formal quote request
    const rfqId = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
    const newRequest: QuoteRequest = {
      id: rfqId,
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      industry: selectedIndustry || 'General Piping',
      items: [...cartItems],
      message: message.trim(),
      status: 'Received',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onSubmitQuote(newRequest);
    setSubmittedRequest(newRequest);
    
    // Clear form fields
    setContactName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setSelectedIndustry('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 px-6 py-5 flex items-center justify-between border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-mono font-bold text-xs">
                RFQ
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Request For Quote (RFQ) Cart</h2>
                <p className="text-xs text-slate-400">Configure parameters & secure commercial custom pricing</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            
            {submittedRequest ? (
              /* PDF Receipt / SUCCESS Mode */
              <div className="space-y-6 animate-fade-in py-4">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">Inquiry Received Successfully!</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                    Your RFQ reference has been generated. Our engineering sales team at <span className="font-semibold text-slate-900">Sindo Engineering</span> will review the parameters and email your quotation within 2 to 4 hours.
                  </p>
                </div>

                {/* Printable Document Box */}
                <div className="border border-slate-300 rounded-xl bg-slate-50/50 p-6 shadow-sm border-dashed relative overflow-hidden font-mono text-xs text-slate-800">
                  
                  {/* Decorative Diagonal Draft Watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] opacity-6 select-none pointer-events-none">
                    <span className="text-[100px] font-bold text-slate-900 tracking-wider">SINDO</span>
                  </div>

                  {/* Header and Branding */}
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4 font-sans">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">SINDO ENGINEERING</h4>
                      <p className="text-[10px] text-slate-500">SS Pipe Fittings Manufacturer</p>
                      <p className="text-[10px] text-slate-500">Phone: +91 8698736598</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        Active RFQ
                      </span>
                      <p className="font-mono text-[11px] font-bold text-slate-900 mt-1">{submittedRequest.id}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{submittedRequest.createdAt}</p>
                    </div>
                  </div>

                  {/* Customer Information Grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-slate-200 pb-4 mb-4">
                    <div>
                      <span className="text-slate-400 block uppercase text-[9px] tracking-wider">Contact Person</span>
                      <span className="font-bold text-slate-800 font-sans">{submittedRequest.contactName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[9px] tracking-wider">Company / Entity</span>
                      <span className="font-semibold text-slate-800 font-sans">{submittedRequest.companyName || 'Not Provided (Retail/Direct)'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[9px] tracking-wider">Direct Phone</span>
                      <span className="font-bold text-slate-800">{submittedRequest.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[9px] tracking-wider">Registered Email</span>
                      <span className="font-bold text-slate-800 font-sans text-blue-700">{submittedRequest.email}</span>
                    </div>
                  </div>

                  {/* Product Specification Lines */}
                  <div className="space-y-4 border-b border-slate-200 pb-4 mb-4">
                    <p className="font-bold text-slate-900 uppercase text-[9px] tracking-wide mb-1 font-sans">Requested Items & Specifications</p>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-sans text-[10px] uppercase pb-1">
                          <th className="pb-1">Item Description</th>
                          <th className="pb-1 text-center">Grade</th>
                          <th className="pb-1 text-center font-sans">Specs (Size)</th>
                          <th className="pb-1 text-right">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submittedRequest.items.map((item, index) => (
                          <tr key={index} className="border-b border-slate-100 last:border-0 font-sans text-[11px] text-slate-700">
                            <td className="py-2">
                              <span className="font-bold text-slate-900">{item.product.name}</span>
                              <p className="text-[10px] text-slate-400 font-sans">{item.product.category}</p>
                            </td>
                            <td className="py-2 text-center font-mono text-[10px]">{item.selectedGrade}</td>
                            <td className="py-2 text-center font-mono text-[10px]">
                              {item.selectedSize}
                            </td>
                            <td className="py-2 text-right font-mono font-bold text-slate-900">{item.quantity} pcs</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Additional message notes */}
                  {submittedRequest.message && (
                    <div className="border-b border-slate-200 pb-4 mb-4 text-[11px] font-sans">
                      <span className="font-bold text-slate-900 uppercase text-[9px] tracking-wider block mb-1">Custom Fabrication Notes</span>
                      <p className="text-slate-600 bg-white p-2 rounded border border-slate-200 italic">
                        "{submittedRequest.message}"
                      </p>
                    </div>
                  )}

                  {/* Weight Summary Footer */}
                  <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded text-[11px] font-sans">
                    <span className="font-semibold text-slate-600">Approximate Shipping Weight:</span>
                    <span className="font-mono font-bold text-slate-900">~{submittedRequest.items.reduce((acc, item) => acc + (item.quantity * 2.2), 0).toFixed(1)} KGS</span>
                  </div>
                </div>

                {/* Active Email Action Panel */}
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3 font-sans">
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-blue-600 text-white p-2 rounded-lg mt-0.5 shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">How to submit your quotation?</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        To guarantee we receive your quotation right away, please choose one of the options below to email your generated RFQ to Sindo Engineering:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={generateMailtoLink(submittedRequest)}
                      className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm text-center cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Send via Email Client
                    </a>
                    <button
                      onClick={() => handleCopyToClipboard(submittedRequest)}
                      className={`flex items-center justify-center gap-1.5 font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wider transition-all border text-center cursor-pointer ${
                        copied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied RFQ Text!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" /> Copy RFQ to Clipboard
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-300 text-center cursor-pointer"
                  >
                    Print Quote Details
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedRequest(null);
                      onClose();
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
                  >
                    Done & Return to Catalog
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Cart checkout view */
              <>
                {/* Cart Items List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center justify-between">
                    <span>1. Configured items ({cartItems.length})</span>
                    {cartItems.length > 0 && (
                      <span className="text-xs font-mono font-normal text-slate-500 capitalize bg-slate-100 py-1 px-2 rounded">
                        Est. Weight: ~{totalEstWeight} kg
                      </span>
                    )}
                  </h3>

                  {cartItems.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl py-12 px-4 text-center">
                      <p className="text-slate-500 text-sm">Your quotation request cart is currently empty.</p>
                      <button
                        onClick={onClose}
                        className="mt-3 text-blue-600 hover:text-blue-700 font-semibold text-xs uppercase tracking-wider"
                      >
                        Browse items to add
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex justify-between items-center gap-4 animate-fade-in"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-slate-900 text-sm tracking-tight">{item.product.name}</h4>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-xs text-slate-500">
                              <span className="font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                                {item.selectedSize}
                              </span>
                              <span className="font-medium bg-slate-900 text-white px-2 py-0.5 rounded border border-slate-800 font-mono text-[10px]">
                                {item.selectedGrade}
                              </span>
                              <span className="text-slate-400">
                                Est. Wt: ~{calculateEstWeight(item)} kg
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Editor */}
                            <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-500 font-bold text-sm"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-xs font-bold text-slate-800 font-mono">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-500 font-bold text-sm"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Information Section */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
                    2. Procurement Contact details
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sindo Foods Pvt Ltd"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 8698736598"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. buyer@industry.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Industry Sector */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Select Your Industry Sector
                      </label>
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                      >
                        <option value="">-- Choose Industry Sector --</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind.name} value={ind.name}>{ind.name}</option>
                        ))}
                        <option value="Other Industry Sector">Other Industrial Sector</option>
                      </select>
                    </div>

                    {/* Message / Specifications text */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Any Custom Drawing Sizing/Grades Requirements?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detail specific angles, chemical media compatibility, design metrics or timeline deadlines..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans resize-none"
                      />
                    </div>

                    {/* Error box */}
                    {formError && (
                      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200 text-xs font-semibold">
                        {formError}
                      </div>
                    )}

                    {/* Submit commercial quote request */}
                    <button
                      type="submit"
                      disabled={cartItems.length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                    >
                      Process Sindo Commercial Quote Request
                    </button>
                  </form>
                </div>
              </>
            )}

          </div>

          {/* Secure disclaimer bar */}
          <div className="bg-slate-50 border-t border-slate-200 py-3.5 px-6 flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-slate-500">
            <span className="flex items-center gap-1.5 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" /> SECURED PROCUREMENT INQUIRY
            </span>
            <span>Est. Response: &lt; 4 Hours</span>
          </div>

        </div>
      </div>
    </div>
  );
}
