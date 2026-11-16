import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Shipping & Returns</span>
        </div>
      </div>

      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> LOGISTICS & POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            Shipping & Returns
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-sans">
            Transparent delivery timelines, secure transit packaging, and our 7-day customer satisfaction commitment.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Shipping Overview */}
        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A]">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-black">Delivery Details & Rates</h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>
              We partner with Pakistan's premier courier networks—including <strong>TCS Express</strong>, <strong>Leopard Courier</strong>, and <strong>Trax Logistics</strong>—to ensure express door-to-door delivery with live tracking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8D6C9]">
                <h4 className="font-bold text-black text-xs uppercase mb-1">Standard Nationwide Shipping</h4>
                <p className="text-sm font-bold text-black">Rs. 250 flat</p>
                <p className="text-[11px] text-gray-500 mt-1">Applies to orders below Rs. 5,000</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5ECE5] border border-[#DEC5C2]">
                <h4 className="font-bold text-[#7A4E5A] text-xs uppercase mb-1">Free Express Delivery</h4>
                <p className="text-sm font-bold text-[#7A4E5A]">FREE on orders Rs. 5,000+</p>
                <p className="text-[11px] text-gray-600 mt-1">Automatically applied at checkout</p>
              </div>
            </div>

            <h4 className="font-bold text-black pt-3">Delivery Timelines:</h4>
            <ul className="space-y-1.5 list-disc pl-5 text-gray-600">
              <li><strong>Lahore, Karachi & Islamabad:</strong> 24 to 48 business hours.</li>
              <li><strong>Other Major Urban Cities:</strong> 2 to 3 business days.</li>
              <li><strong>Rest of Pakistan & Rural Hubs:</strong> 3 to 5 business days.</li>
            </ul>
          </div>
        </div>

        {/* Returns Policy */}
        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-black">7-Day Hassle-Free Returns</h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>
              Due to the personal nature of cosmetics, skincare, and fragrance products, health and hygiene regulations require that returned items must be:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 text-gray-600">
              <li>Unopened, unused, and in their original plastic shrink wrap or manufacturer seal.</li>
              <li>Accompanied by the original invoice and QR security stamp.</li>
              <li>Initiated within 7 days from the verified date of delivery.</li>
            </ul>

            <h4 className="font-bold text-black pt-2">Transit Damaged or Incorrect Items:</h4>
            <p>
              In the unlikely event that your parcel sustains damage during courier transit or an incorrect item was packed, notify us within 24 hours of delivery with a quick photo of the parcel. We will arrange a courier pickup and dispatch an immediate brand-new replacement at no additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
