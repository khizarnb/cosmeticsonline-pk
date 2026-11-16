import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Sparkles, QrCode, FileCheck, ArrowRight } from 'lucide-react';

export const AuthenticityPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">100% Authenticity Guarantee</span>
        </div>
      </div>

      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-14 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F5ECE5] text-[#7A4E5A] flex items-center justify-center mx-auto border border-[#DEC5C2] shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] block">
            OUR UNCOMPROMISING STANDARD
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            100% Authenticity Guarantee
          </h1>
          <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            In Pakistan's beauty landscape, authenticity is not just a marketing claim—it is our absolute promise. Every single unit we ship is verifiable, direct from authorized distributors, and batch checked.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">Verified Batch Codes</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every bottle bears an authentic manufacturer production code readable via global batch verification registers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">Tamper-Evident QR Seals</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our packages are protected with high-security holographic seals to guarantee untampered transit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">Double Your Money Back</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              If any product purchased from us is ever proven unauthentic, we will refund 200% of your purchase value.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-8 sm:p-10 shadow-sm space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
          <h2 className="font-serif text-2xl font-bold text-black">How We Source</h2>
          <p>
            Unlike open marketplaces where arbitrary third-party sellers list inventory without verification, CosmeticsOnline.pk acts as a direct retailer. We maintain contracted procurement pipelines with authorized master distributors of COSRX, Beauty of Joseon, Anua, LANEIGE, The Ordinary, and prestige fragrance importers.
          </p>
          <p>
            Our warehouse staff are trained to inspect packaging finishes, lot embossments, and formulation viscosities before inventory is accepted into stock.
          </p>
          <div className="pt-4 text-center">
            <Link
              to="/collection/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
            >
              <span>Shop With Full Confidence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
