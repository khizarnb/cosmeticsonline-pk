import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Sparkles,
  SlidersHorizontal,
  Package,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const { totalItemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="w-full relative z-40 select-none">
        {/* 1. Black Top Announcement Bar */}
        <div className="bg-[#000000] text-white py-2 px-3 text-[11px] font-medium tracking-wider border-b border-black">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Desktop 4 Benefits */}
            <div className="hidden lg:grid grid-cols-4 w-full gap-4 text-center">
              <div className="flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>100% Original Products</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <Truck className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>Nationwide Delivery Across Pakistan</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <RotateCcw className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>Easy Returns Within 7 Days</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <CreditCard className="w-3.5 h-3.5 text-[#C8A5A1]" />
                <span>Secure & Multiple Payment Options</span>
              </div>
            </div>

            {/* Mobile / Tablet Compact Ticker */}
            <div className="lg:hidden flex items-center justify-center w-full gap-2 text-center text-[10px]">
              <ShieldCheck className="w-3 h-3 text-[#C8A5A1] flex-shrink-0" />
              <span className="font-semibold text-[#F9F7F4]">100% Authentic Beauty</span>
              <span className="text-[#C8A5A1]">•</span>
              <span>Free Delivery Over Rs. 5,000 Across Pakistan</span>
            </div>
          </div>
        </div>

        {/* 2. Main Header Bar (Sticky option) */}
        <div
          className={`bg-[#FFFFFF] border-b border-[#E8D6C9]/80 transition-shadow duration-300 ${
            isScrolled ? 'sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
            <div className="flex items-center justify-between gap-4 lg:gap-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-black hover:text-[#7A4E5A] transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo */}
              <div className="flex-shrink-0">
                <Logo size="md" />
              </div>

              {/* Large Product Search Bar (Desktop) */}
              <div className="hidden lg:flex flex-1 max-w-xl mx-4">
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-[#F9F7F4] border border-[#E8D6C9] text-sm text-gray-500 hover:border-black hover:bg-white transition-all group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                    <span>Search for products, brands or concerns...</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">
                    Search
                  </span>
                </button>
              </div>

              {/* Action Icons: Search (mobile), Account, Wishlist, Cart */}
              <div className="flex items-center gap-1 sm:gap-3">
                {/* Mobile Search Button */}
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className="lg:hidden p-2 text-black hover:text-[#7A4E5A] transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Account Icon with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAccountDropdownOpen((prev) => !prev)}
                    className="p-2 text-black hover:text-[#7A4E5A] transition-colors relative flex items-center"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {accountDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8D6C9] py-2 z-50 text-left animate-fadeIn"
                      onMouseLeave={() => setAccountDropdownOpen(false)}
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-[#E8D6C9]/60">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                              Signed in as
                            </p>
                            <p className="text-xs font-bold text-black truncate">{user?.fullName}</p>
                            <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                          </div>
                          <Link
                            to="/account"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F9F7F4] hover:text-black"
                          >
                            <User className="w-3.5 h-3.5" /> My Account
                          </Link>
                          <Link
                            to="/account/orders"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F9F7F4] hover:text-black"
                          >
                            <Package className="w-3.5 h-3.5" /> Order History
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#7A4E5A] bg-[#F4ECEE] hover:bg-[#E3CFD5]"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" /> Admin Dashboard
                            </Link>
                          )}
                          <div className="border-t border-[#E8D6C9]/60 my-1" />
                          <button
                            onClick={() => {
                              logout();
                              setAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-2">
                            <p className="text-xs font-bold text-black">Welcome to CosmeticsOnline.pk</p>
                            <p className="text-[11px] text-gray-500">Access orders, wishlist & rewards</p>
                          </div>
                          <div className="p-2 space-y-1.5">
                            <Link
                              to="/account"
                              className="block w-full py-2 text-center text-xs font-semibold uppercase tracking-wider bg-black text-white rounded-lg hover:bg-[#7A4E5A] transition-colors"
                            >
                              Sign In / Register
                            </Link>
                            <Link
                              to="/admin"
                              className="block w-full py-1.5 text-center text-[10px] font-medium text-gray-600 hover:text-black"
                            >
                              Store Admin Portal
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Wishlist Icon */}
                <Link
                  to="/wishlist"
                  className="p-2 text-black hover:text-[#7A4E5A] transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute 1 top-1 right-0.5 w-4 h-4 rounded-full bg-[#7A4E5A] text-white text-[10px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Shopping Bag Icon with Drawer Trigger */}
                <button
                  onClick={openCart}
                  className="p-2 text-black hover:text-[#7A4E5A] transition-colors relative group"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  <span className="absolute top-1 right-0.5 min-w-4 h-4 px-1 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                    {totalItemCount}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Main Navigation Row (Desktop) */}
          <nav className="hidden lg:block border-t border-[#E8D6C9]/60 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ul className="flex items-center justify-center space-x-8 text-xs font-semibold uppercase tracking-wider text-gray-800">
                {/* Brands Mega Menu */}
                <li
                  className="relative group py-3"
                  onMouseEnter={() => setActiveDropdown('brands')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to="/brands"
                    className="flex items-center gap-1 hover:text-[#7A4E5A] transition-colors"
                  >
                    <span>Brands</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7A4E5A] transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Brands Dropdown */}
                  {activeDropdown === 'brands' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[720px] bg-white border border-[#E8D6C9] shadow-2xl p-6 rounded-b-2xl z-50 animate-fadeIn">
                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            TOP K-BEAUTY
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/brand/cosrx" className="hover:text-black hover:font-medium">COSRX</Link></li>
                            <li><Link to="/brand/beauty-of-joseon" className="hover:text-black hover:font-medium">Beauty of Joseon</Link></li>
                            <li><Link to="/brand/anua" className="hover:text-black hover:font-medium">Anua</Link></li>
                            <li><Link to="/brand/laneige" className="hover:text-black hover:font-medium">LANEIGE</Link></li>
                            <li><Link to="/brand/skin1004" className="hover:text-black hover:font-medium">Skin1004</Link></li>
                            <li><Link to="/brand/round-lab" className="hover:text-black hover:font-medium">Round Lab</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            VIRAL SKINCARE
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/brand/the-ordinary" className="hover:text-black hover:font-medium">The Ordinary</Link></li>
                            <li><Link to="/brand/dalba" className="hover:text-black hover:font-medium">d'Alba Piedmont</Link></li>
                            <li><Link to="/brand/missha" className="hover:text-black hover:font-medium">MISSHA</Link></li>
                            <li><Link to="/brand/klairs" className="hover:text-black hover:font-medium">Dear Klairs</Link></li>
                            <li><Link to="/brand/torriden" className="hover:text-black hover:font-medium">Torriden</Link></li>
                            <li><Link to="/brand/dr-althea" className="hover:text-black hover:font-medium">Dr. Althea</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            HAIR & LUXURY
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/brand/olaplex" className="hover:text-black hover:font-medium">Olaplex</Link></li>
                            <li><Link to="/brand/romand" className="hover:text-black hover:font-medium">Rom&nd</Link></li>
                            <li><Link to="/brand/dior" className="hover:text-black hover:font-medium">Dior Fragrance</Link></li>
                            <li><Link to="/brand/cerave" className="hover:text-black hover:font-medium">CeraVe</Link></li>
                            <li><Link to="/brand/huda-beauty" className="hover:text-black hover:font-medium">Huda Beauty</Link></li>
                          </ul>
                        </div>
                        <div className="bg-[#F9F7F4] p-4 rounded-xl border border-[#E8D6C9] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-[#7A4E5A] uppercase tracking-widest">
                              Directory
                            </span>
                            <h5 className="text-sm font-semibold text-black mt-1">
                              Explore All Brands A–Z
                            </h5>
                            <p className="text-[11px] normal-case text-gray-500 mt-1">
                              Browse 100% authentic international and Korean brands with verified origins.
                            </p>
                          </div>
                          <Link
                            to="/brands"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#7A4E5A]"
                          >
                            Browse Directory <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* Skincare Mega Menu */}
                <li
                  className="relative group py-3"
                  onMouseEnter={() => setActiveDropdown('skincare')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to="/collection/skincare"
                    className="flex items-center gap-1 hover:text-[#7A4E5A] transition-colors"
                  >
                    <span>Skincare</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7A4E5A] transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Skincare Dropdown */}
                  {activeDropdown === 'skincare' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[800px] bg-white border border-[#E8D6C9] shadow-2xl p-6 rounded-b-2xl z-50 animate-fadeIn">
                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            BY STEP
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/collection/skincare?type=cleanser" className="hover:text-black hover:font-medium">Cleansers & Balms</Link></li>
                            <li><Link to="/collection/skincare?type=toner" className="hover:text-black hover:font-medium">Toners & Mists</Link></li>
                            <li><Link to="/collection/skincare?type=serum" className="hover:text-black hover:font-medium">Essences & Serums</Link></li>
                            <li><Link to="/collection/skincare?type=moisturizer" className="hover:text-black hover:font-medium">Moisturizers & Creams</Link></li>
                            <li><Link to="/collection/skincare?type=sunscreen" className="hover:text-black hover:font-medium">Sunscreens (SPF 50+)</Link></li>
                            <li><Link to="/collection/skincare?type=lip" className="hover:text-black hover:font-medium">Lip & Eye Treatments</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            BY CONCERN
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/collection/skincare?concern=Hydration" className="hover:text-black hover:font-medium">Deep Hydration</Link></li>
                            <li><Link to="/collection/skincare?concern=Brightening" className="hover:text-black hover:font-medium">Brightening & Dark Spots</Link></li>
                            <li><Link to="/collection/skincare?concern=Acne%20%26%20Breakouts" className="hover:text-black hover:font-medium">Acne & Breakouts</Link></li>
                            <li><Link to="/collection/skincare?concern=Barrier%20Repair" className="hover:text-black hover:font-medium">Barrier Repair</Link></li>
                            <li><Link to="/collection/skincare?concern=Anti-Aging" className="hover:text-black hover:font-medium">Anti-Aging & Firming</Link></li>
                            <li><Link to="/collection/skincare?concern=Sensitive%20Skin" className="hover:text-black hover:font-medium">Sensitive Skin Soothing</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">
                            VIRAL ACTIVES
                          </h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/collection/skincare?q=snail" className="hover:text-black hover:font-medium">Snail Mucin Filtrate</Link></li>
                            <li><Link to="/collection/skincare?q=niacinamide" className="hover:text-black hover:font-medium">Niacinamide (Vitamin B3)</Link></li>
                            <li><Link to="/collection/skincare?q=centella" className="hover:text-black hover:font-medium">Centella Asiatica (Cica)</Link></li>
                            <li><Link to="/collection/skincare?q=heartleaf" className="hover:text-black hover:font-medium">Heartleaf Extract</Link></li>
                            <li><Link to="/collection/skincare?q=hyaluronic" className="hover:text-black hover:font-medium">Hyaluronic Acid</Link></li>
                          </ul>
                        </div>
                        <div className="bg-[#F5ECE5] p-4 rounded-xl border border-[#E8D6C9] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-[#7A4E5A] uppercase tracking-widest">
                              Featured Ritual
                            </span>
                            <h5 className="text-sm font-serif font-bold text-black mt-1">
                              The Glass Skin Routine
                            </h5>
                            <p className="text-[11px] normal-case text-gray-600 mt-1">
                              4-step curated system for dewy, luminous Korean glass skin.
                            </p>
                          </div>
                          <Link
                            to="/product/luxury-kbeauty-routine-box"
                            className="mt-3 inline-block px-3 py-1.5 bg-black text-white text-[11px] font-semibold text-center rounded-lg hover:bg-[#7A4E5A] transition-colors"
                          >
                            Shop Ritual Set
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* Makeup Mega Menu */}
                <li
                  className="relative group py-3"
                  onMouseEnter={() => setActiveDropdown('makeup')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to="/collection/makeup"
                    className="flex items-center gap-1 hover:text-[#7A4E5A] transition-colors"
                  >
                    <span>Makeup</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7A4E5A] transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Makeup Dropdown */}
                  {activeDropdown === 'makeup' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white border border-[#E8D6C9] shadow-2xl p-6 rounded-b-2xl z-50 animate-fadeIn">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">LIPS</h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/collection/makeup?type=lip-tint" className="hover:text-black">Korean Lip Tints</Link></li>
                            <li><Link to="/collection/makeup?type=lipstick" className="hover:text-black">Matte Lipsticks</Link></li>
                            <li><Link to="/collection/makeup?type=lip-oil" className="hover:text-black">Lip Oils & Glazes</Link></li>
                            <li><Link to="/collection/makeup?type=lip-liner" className="hover:text-black">Lip Liners</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">FACE & EYES</h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/collection/makeup?type=cushion" className="hover:text-black">Cushion Compacts</Link></li>
                            <li><Link to="/collection/makeup?type=powder" className="hover:text-black">Setting Powders</Link></li>
                            <li><Link to="/collection/makeup?type=blush" className="hover:text-black">Liquid & Cream Blush</Link></li>
                            <li><Link to="/collection/makeup?type=mascara" className="hover:text-black">Tubing Mascaras</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#7A4E5A] tracking-wider mb-3">TOP BRANDS</h4>
                          <ul className="space-y-2 text-xs font-normal normal-case text-gray-700">
                            <li><Link to="/brand/romand" className="hover:text-black font-medium">Rom&nd</Link></li>
                            <li><Link to="/brand/laneige" className="hover:text-black font-medium">LANEIGE Lips</Link></li>
                            <li><Link to="/collection/makeup" className="hover:text-black font-medium">All Makeup</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* Haircare Link */}
                <li className="py-3">
                  <Link
                    to="/collection/haircare"
                    className="hover:text-[#7A4E5A] transition-colors"
                  >
                    Haircare
                  </Link>
                </li>

                {/* Fragrance Link */}
                <li className="py-3">
                  <Link
                    to="/collection/fragrance"
                    className="hover:text-[#7A4E5A] transition-colors"
                  >
                    Fragrance
                  </Link>
                </li>

                {/* K-Beauty Highlight */}
                <li className="py-3">
                  <Link
                    to="/collection/k-beauty"
                    className="hover:text-[#7A4E5A] transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A5A1]" />
                    <span>K-Beauty</span>
                  </Link>
                </li>

                {/* New Arrivals */}
                <li className="py-3">
                  <Link
                    to="/collection/new-arrivals"
                    className="hover:text-[#7A4E5A] transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>

                {/* Offers Highlight Badge */}
                <li className="py-3">
                  <Link
                    to="/collection/offers"
                    className="px-3 py-1 rounded-full bg-[#DEC5C2]/40 text-[#7A4E5A] font-bold hover:bg-[#7A4E5A] hover:text-white transition-all shadow-xs"
                  >
                    Offers
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#F9F7F4] h-full shadow-2xl flex flex-col z-50 overflow-y-auto no-scrollbar">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E8D6C9] flex items-center justify-between bg-white">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-black hover:text-[#7A4E5A]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Benefits in Drawer */}
            <div className="px-4 py-2.5 bg-[#F5ECE5] text-[11px] font-medium text-gray-700 flex items-center gap-2 border-b border-[#E8D6C9]">
              <ShieldCheck className="w-4 h-4 text-[#7A4E5A]" />
              <span>100% Authentic Beauty Guarantee</span>
            </div>

            {/* Nav Links */}
            <div className="flex-1 py-4 px-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Home
              </Link>
              <Link
                to="/collection/skincare"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Skincare
              </Link>
              <Link
                to="/collection/k-beauty"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                <span>K-Beauty</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A5A1]/40 text-[#7A4E5A]">Hot</span>
              </Link>
              <Link
                to="/collection/makeup"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Makeup
              </Link>
              <Link
                to="/collection/haircare"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Haircare
              </Link>
              <Link
                to="/collection/fragrance"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Fragrance
              </Link>
              <Link
                to="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                All Brands (A–Z)
              </Link>
              <Link
                to="/collection/new-arrivals"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                New Arrivals
              </Link>
              <Link
                to="/collection/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-[#7A4E5A] uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Special Offers & Bundles
              </Link>
              <Link
                to="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-black uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                The Beauty Journal
              </Link>
              <Link
                to="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-[#E8D6C9]/40"
              >
                Track Your Order
              </Link>
            </div>

            {/* Account & Admin in Drawer */}
            <div className="p-4 bg-white border-t border-[#E8D6C9] space-y-2">
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider bg-black text-white rounded-lg"
              >
                {isAuthenticated ? 'My Account' : 'Sign In / Register'}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2 text-center text-[11px] font-semibold text-[#7A4E5A] border border-[#C8A5A1] rounded-lg"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Autocomplete Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
