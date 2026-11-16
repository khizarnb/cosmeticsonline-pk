import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Privacy Policy & Terms</span>
        </div>
      </div>

      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> LEGAL & DATA PRIVACY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            Privacy & Terms
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-sans">
            How CosmeticsOnline.pk protects your personal information and governs order transactions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-black">1. Customer Privacy Commitment</h2>
            <p>
              CosmeticsOnline.pk treats your privacy as paramount. We only collect the minimal personal data required to fulfill your orders, process courier shipments, and inform you of promotions you explicitly subscribe to. We will never sell, rent, or trade your contact information with external marketing brokers.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-black">2. Payment Security</h2>
            <p>
              All online card transactions are processed through State Bank of Pakistan compliant payment aggregators using 256-bit TLS/SSL encryption. We do not store your full card numbers, CVV codes, or banking PINs on our servers.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-black">3. Order Acceptance & Pricing</h2>
            <p>
              All prices are listed in Pakistan Rupees (PKR) and inclusive of applicable sales taxes. In the event of a typographical pricing error, CosmeticsOnline.pk reserves the right to cancel or adjust affected unfulfilled orders with immediate notification and refund to the customer.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-black">4. Authentic Product Disclaimer</h2>
            <p>
              Individual cosmetic and skincare results may vary depending on skin type, climate conditions, and proper usage. Always perform a patch test prior to introducing new active ingredients into your routine.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
