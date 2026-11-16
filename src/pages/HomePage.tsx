import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Droplets,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Hourglass,
  Sun,
  Feather,
  HeartHandshake,
  CheckCircle2,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  Mail,
  ChevronRight
} from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { useStoreData } from '../context/StoreDataContext';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { products, brands } = useStoreData();
  const [bestsellerTab, setBestsellerTab] = useState<'All' | 'Skincare' | 'Makeup' | 'Haircare' | 'Fragrance'>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Filtered bestsellers based on tab
  const filteredBestsellers = products.filter((p) => {
    if (!p.isBestseller) return false;
    if (bestsellerTab === 'All') return true;
    return p.category === bestsellerTab;
  });

  // New arrivals
  const newArrivals = products.filter((p) => p.isNewArrival || p.discountPercent === undefined).slice(0, 5);

  const categories = [
    {
      title: 'Skincare',
      path: '/collection/skincare',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Makeup',
      path: '/collection/makeup',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Haircare',
      path: '/collection/haircare',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Fragrance',
      path: '/collection/fragrance',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'K-Beauty',
      path: '/collection/k-beauty',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Treatments',
      path: '/collection/skincare?type=serum',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Gift Sets',
      path: '/collection/gift-sets',
      image: 'https://images.unsplash.com/photo-1512290900672-1f41d99cece2?q=80&w=400&auto=format&fit=crop',
    },
  ];

  const skinConcerns = [
    { title: 'Hydration', icon: Droplets, query: 'Hydration' },
    { title: 'Brightening', icon: Sparkles, query: 'Brightening' },
    { title: 'Acne & Breakouts', icon: ShieldAlert, query: 'Acne & Breakouts' },
    { title: 'Barrier Repair', icon: ShieldCheck, query: 'Barrier Repair' },
    { title: 'Anti-Aging', icon: Hourglass, query: 'Anti-Aging' },
    { title: 'Sun Protection', icon: Sun, query: 'Sun Protection' },
    { title: 'Hair Fall', icon: Feather, query: 'Hair Fall' },
    { title: 'Sensitive Skin', icon: HeartHandshake, query: 'Sensitive Skin' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full bg-[#F9F7F4] space-y-14 sm:space-y-20 pb-16">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
            Shop by Category
          </h2>
          <Link
            to="/collection/all"
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#7A4E5A] transition-colors flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.path}
              className="group bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E8D6C9] hover:border-[#7A4E5A] hover:shadow-luxury-hover transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-xl bg-[#FAF7F5] overflow-hidden mb-2.5 flex items-center justify-center p-2">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-black group-hover:text-[#7A4E5A] transition-colors">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Trending Bestsellers
            </h2>
            <p className="text-xs text-gray-500 mt-1">Pakistan’s most loved authentic beauty staples</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {(['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setBestsellerTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  bestsellerTab === tab
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredBestsellers.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. Discover Top Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
            Discover Top Brands
          </h2>
          <Link
            to="/brands"
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#7A4E5A] transition-colors flex items-center gap-1 group"
          >
            <span>View All Brands</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Clean Brand Logos Showcase with subtle dividers */}
        <div className="bg-white rounded-2xl border border-[#E8D6C9] p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 items-center">
            {brands.slice(0, 8).map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.slug}`}
                className="py-4 px-3 flex flex-col items-center justify-center hover:opacity-75 transition-opacity group text-center"
              >
                <span className="font-serif font-bold text-sm sm:text-base text-black group-hover:text-[#7A4E5A] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] text-gray-400 font-sans mt-0.5 uppercase tracking-wider">
                  {brand.origin}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. K-Beauty Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#F7E1DF] via-[#F4D3D2] to-[#E9C3C2] p-8 sm:p-12 lg:p-16 border border-[#DEC5C2] shadow-luxury">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
              <span>THE K-BEAUTY EDIT</span>
              <span className="w-8 h-[1px] bg-[#7A4E5A] opacity-40"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              K-Beauty Favourites
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              Glow-boosting skincare from Korea's most loved brands. Fermented extracts, calming centella, and patented moisture technologies.
            </p>

            <div className="pt-2">
              <Link
                to="/collection/k-beauty"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-all shadow-md group"
              >
                <span>Shop K-Beauty</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Product Accents on Right */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-end pr-8 pointer-events-none opacity-90">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
              alt="Korean Skincare Bottles"
              className="max-h-80 object-contain rounded-2xl shadow-xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
              New Arrivals
            </h2>
            <p className="text-xs text-gray-500 mt-1">Freshly stocked international & Korean arrivals</p>
          </div>
          <Link
            to="/collection/new-arrivals"
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#7A4E5A] transition-colors flex items-center gap-1 group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 7. Shop by Concern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
            Shop by Concern
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Targeted solutions tailored for your unique skin and hair needs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {skinConcerns.map((concern) => {
            const Icon = concern.icon;
            return (
              <Link
                key={concern.title}
                to={`/collection/all?concern=${encodeURIComponent(concern.query)}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8D6C9] hover:border-[#7A4E5A] hover:bg-[#FAF7F5] transition-all group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F9F7F4] flex items-center justify-center text-[#7A4E5A] group-hover:bg-[#7A4E5A] group-hover:text-white transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-black group-hover:text-[#7A4E5A] transition-colors">
                    {concern.title}
                  </h4>
                  <span className="text-[10px] text-gray-400">View Routine →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 8. Promotional Dual Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner A: Obsidian Dark Limited Offer */}
          <div className="relative rounded-3xl bg-[#000000] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px] overflow-hidden shadow-xl border border-gray-900 group">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DEC5C2]">
                LIMITED TIME OFFER
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase leading-tight">
                UP TO 30% OFF
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xs font-normal">
                On Selected Beauty Favourites, cult toners & viral lip glazes.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/collection/offers"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
              >
                <span>Shop Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Decorative background image */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop"
                alt="Offers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Banner B: Soft Nude / Rose Taupe Bundle */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#F5ECE5] to-[#E8D6C9] p-8 sm:p-10 flex flex-col justify-between min-h-[260px] overflow-hidden shadow-xl border border-[#D5BCAB] group">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A4E5A]">
                CURATED SETS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-black uppercase leading-tight">
                Bundle & Save
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 max-w-xs font-normal">
                Build your complete AM/PM routine and save up to 20% compared to singles.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/collection/gift-sets"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-all"
              >
                <span>Shop Bundles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Decorative background image */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
                alt="Bundles"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. The Beauty Journal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">
              The Beauty Journal
            </h2>
            <p className="text-xs text-gray-500 mt-1">Dermatologist insights, routine guides & trend breakdowns</p>
          </div>
          <Link
            to="/journal"
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#7A4E5A] transition-colors flex items-center gap-1 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8D6C9] hover:shadow-luxury transition-all">
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                alt="Skincare 101"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold text-[#7A4E5A] uppercase tracking-widest">
                Skincare Advice
              </span>
              <h3 className="font-serif text-lg font-bold text-black leading-snug group-hover:text-[#7A4E5A] transition-colors">
                Skincare 101: Build a Routine That Works for Your Skin
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Understanding skin barrier resilience, ingredient compatibility, and simplifying your daily steps.
              </p>
              <Link
                to="/journal/skincare-101-build-routine"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#7A4E5A] pt-1"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8D6C9] hover:shadow-luxury transition-all">
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                alt="Healthy Hair Habits"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold text-[#7A4E5A] uppercase tracking-widest">
                Haircare Guide
              </span>
              <h3 className="font-serif text-lg font-bold text-black leading-snug group-hover:text-[#7A4E5A] transition-colors">
                Healthy Hair Habits for Stronger, Shinier Hair
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                How to counter hard municipal water damage and repair broken bonds with peptide hair oils.
              </p>
              <Link
                to="/journal/healthy-hair-habits"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#7A4E5A] pt-1"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8D6C9] hover:shadow-luxury transition-all">
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop"
                alt="Lip Trends"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold text-[#7A4E5A] uppercase tracking-widest">
                Makeup Trends
              </span>
              <h3 className="font-serif text-lg font-bold text-black leading-snug group-hover:text-[#7A4E5A] transition-colors">
                Lip Trends to Try This Season
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Tanghulu glazed finishes, hydrating overnight masks, and wearable Pakistani skin MLBB stains.
              </p>
              <Link
                to="/journal/lip-trends-to-try"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#7A4E5A] pt-1"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Trust Benefits Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center text-[#7A4E5A] mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h5 className="text-xs font-bold text-black uppercase tracking-wider">100% Original</h5>
              <p className="text-[11px] text-gray-500 mt-1">Sourced from authorized distributors</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center text-[#7A4E5A] mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h5 className="text-xs font-bold text-black uppercase tracking-wider">Nationwide Delivery</h5>
              <p className="text-[11px] text-gray-500 mt-1">Express shipping across all cities</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center text-[#7A4E5A] mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h5 className="text-xs font-bold text-black uppercase tracking-wider">Easy Returns</h5>
              <p className="text-[11px] text-gray-500 mt-1">Hassle-free 7-day returns policy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center text-[#7A4E5A] mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <h5 className="text-xs font-bold text-black uppercase tracking-wider">Secure Payments</h5>
              <p className="text-[11px] text-gray-500 mt-1">COD, Bank Transfer & Wallets</p>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center text-[#7A4E5A] mb-3">
                <Headphones className="w-6 h-6" />
              </div>
              <h5 className="text-xs font-bold text-black uppercase tracking-wider">Dedicated Support</h5>
              <p className="text-[11px] text-gray-500 mt-1">Beauty concierge at your service</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Newsletter Subscription */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F5ECE5] border border-[#E8D6C9] p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-2 max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A4E5A]">
                EXCLUSIVE COMMUNITY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-black">
                Stay in the Beauty Loop
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-sans">
                Get the latest launches, exclusive VIP secret flash offers and routine tips, straight to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-md">
              {newsletterSubmitted ? (
                <div className="p-4 rounded-2xl bg-white border border-green-300 text-green-800 text-center text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Welcome to the CosmeticsOnline VIP club! Check your inbox for a Rs. 500 voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#E8D6C9] text-xs text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-colors whitespace-nowrap shadow-sm"
                  >
                    Subscribe →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
