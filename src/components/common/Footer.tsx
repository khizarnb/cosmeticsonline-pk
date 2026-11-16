import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white pt-14 pb-8 border-t border-gray-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 5 Trust Badges in Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-12 border-b border-gray-800 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C8A5A1] mb-2.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">100% Original</h5>
            <p className="text-[11px] text-gray-400 mt-0.5">Sourced from authorized distributors</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C8A5A1] mb-2.5">
              <Truck className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Nationwide Delivery</h5>
            <p className="text-[11px] text-gray-400 mt-0.5">Across Pakistan within 2–4 days</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C8A5A1] mb-2.5">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Easy Returns</h5>
            <p className="text-[11px] text-gray-400 mt-0.5">7-day peace of mind policy</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C8A5A1] mb-2.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Secure Payments</h5>
            <p className="text-[11px] text-gray-400 mt-0.5">COD, Raast, Cards & Wallets</p>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C8A5A1] mb-2.5">
              <Headphones className="w-5 h-5" />
            </div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Dedicated Support</h5>
            <p className="text-[11px] text-gray-400 mt-0.5">Mon–Sat 9AM to 9PM PKT</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              CosmeticsOnline.pk is Pakistan’s foremost curated luxury beauty retailer. We bring the world's most trusted skincare, Korean glass-skin innovations, high-performance haircare, and prestige fragrances directly to your doorstep.
            </p>
            <div className="pt-2 text-xs text-gray-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>+92 (042) 3578-9000 / +92 300 0000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>concierge@cosmeticsonline.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>Gulberg III & DHA Phase 5, Lahore, Pakistan</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#7A4E5A] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#7A4E5A] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#7A4E5A] transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.046.87.136V9.41a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3 15.69a6.34 6.34 0 0 0 10.82 4.48c.01-.01.02-.02.03-.03V12.1a8.16 8.16 0 0 0 5.74 2.29V10.9a4.82 4.82 0 0 1-3.45-1.5 4.84 4.84 0 0 1-.88-2.71h4.33z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#7A4E5A] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DEC5C2] mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/brands" className="hover:text-white transition-colors">Brands Directory</Link></li>
              <li><Link to="/collection/skincare" className="hover:text-white transition-colors">Skincare</Link></li>
              <li><Link to="/collection/k-beauty" className="hover:text-white transition-colors">K-Beauty Favourites</Link></li>
              <li><Link to="/collection/makeup" className="hover:text-white transition-colors">Makeup</Link></li>
              <li><Link to="/collection/haircare" className="hover:text-white transition-colors">Haircare</Link></li>
              <li><Link to="/collection/fragrance" className="hover:text-white transition-colors">Fragrances</Link></li>
              <li><Link to="/collection/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collection/offers" className="text-[#DEC5C2] hover:text-white transition-colors font-medium">Offers & Bundles</Link></li>
            </ul>
          </div>

          {/* Column: Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DEC5C2] mb-4">Help</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/admin" className="text-gray-500 hover:text-gray-300 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column: About & Apps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DEC5C2] mb-4">About</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 mb-6">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/authenticity" className="hover:text-white transition-colors">Authenticity Guarantee</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">The Beauty Journal</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>

            <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Download Our App</h5>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-gray-800 text-left hover:border-gray-600 transition-colors cursor-pointer">
                <span className="text-xs">🍏</span>
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">Download on the</p>
                  <p className="text-[11px] font-bold text-white leading-tight">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-gray-800 text-left hover:border-gray-600 transition-colors cursor-pointer">
                <span className="text-xs">▶️</span>
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-[11px] font-bold text-white leading-tight">Google Play</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 CosmeticsOnline.pk. All Rights Reserved. Pakistan's Premier Beauty & Skincare Destination.</p>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-semibold text-gray-300">
            <span className="px-2 py-1 bg-[#141414] border border-gray-800 rounded">Cash on Delivery</span>
            <span className="px-2 py-1 bg-[#141414] border border-gray-800 rounded">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-[#141414] border border-gray-800 rounded">Raast PK</span>
            <span className="px-2 py-1 bg-[#141414] border border-gray-800 rounded">JazzCash</span>
            <span className="px-2 py-1 bg-[#141414] border border-gray-800 rounded">EasyPaisa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
