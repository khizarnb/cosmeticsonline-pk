import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Heart, Award, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">About Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-14 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <Logo size="lg" className="justify-center mx-auto" />
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase mt-4">
            Curated Beauty With Integrity
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            CosmeticsOnline.pk was established with a singular mission: to eradicate counterfeit cosmetics from Pakistan and make 100% authentic international skincare and luxury fragrances seamlessly accessible to everyone across the nation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
              OUR FOUNDING PRINCIPLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black">
              Zero Compromise on Authenticity
            </h2>
            <p>
              In a market plagued by unverified third-party sellers and knockoffs, your skin deserves total peace of mind. Every serum, lipstick, and perfume in our warehouse is sourced directly from certified brand distributors in South Korea, the UK, Europe, and North America.
            </p>
            <p>
              Each item comes sealed with verifiable batch codes and our tamper-evident QR security stamp. If a formula isn't 100% authentic, it will never enter our doors.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-luxury border border-[#E8D6C9] aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
              alt="Cosmetics warehouse quality check"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-8 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">100% Guaranteed Origin</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Direct procurement with verifiable batch manufacturing codes and authenticity certification.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">Climate-Controlled Care</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Skincare actives and luxury fragrances stored in temperature-regulated facilities to prevent ingredient degradation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-black">White-Glove Support</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our beauty concierge is staffed by trained skincare specialists ready to guide your routine over WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
