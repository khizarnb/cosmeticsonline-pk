import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';

export const BrandsPage: React.FC = () => {
  const { brands } = useStoreData();
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.origin.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = selectedLetter
        ? brand.name.toUpperCase().startsWith(selectedLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
  }, [brands, search, selectedLetter]);

  // Group brands alphabetically
  const groupedBrands = useMemo(() => {
    const groups: Record<string, typeof brands> = {};
    filteredBrands.forEach((b) => {
      const firstLetter = b.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(b);
    });
    return Object.keys(groups)
      .sort()
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {} as Record<string, typeof brands>);
  }, [filteredBrands]);

  const featuredBrands = brands.filter((b) => b.isFeatured);

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">All Brands</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-10 sm:py-14 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Distributor Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase leading-tight">
            Brands Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
            Discover world-renowned Korean skincare labs, French couture fragrance houses, and cult clinical beauty brands with verified authenticity codes.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brands by name or country..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#E8D6C9] text-xs text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Featured Brands Grid */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-black">Featured Brands</h2>
            <span className="text-xs text-gray-400">Curated global icons</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {featuredBrands.map((b) => (
              <Link
                key={b.id}
                to={`/brand/${b.slug}`}
                className="group bg-white rounded-2xl p-5 border border-[#E8D6C9] hover:border-[#7A4E5A] hover:shadow-luxury-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-28 rounded-xl bg-[#FAF7F5] overflow-hidden mb-3">
                    <img
                      src={b.bannerUrl}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-black group-hover:text-[#7A4E5A] transition-colors">
                    {b.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A4E5A] font-semibold block mt-0.5">
                    {b.origin}
                  </span>
                  <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{b.productCount} Products</span>
                  <span className="font-bold text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Shop <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Alphabet Navigation A–Z */}
        <div className="bg-white rounded-2xl border border-[#E8D6C9] p-4 mb-8 shadow-xs">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar justify-between">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedLetter === null ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              ALL
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                  selectedLetter === letter ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Alphabetical Listings */}
        <div className="space-y-8">
          {Object.keys(groupedBrands).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E8D6C9]">
              <p className="text-sm text-gray-500">No brands found matching your search.</p>
            </div>
          ) : (
            Object.entries(groupedBrands).map(([letter, brandList]) => (
              <div key={letter} className="bg-white rounded-2xl border border-[#E8D6C9] p-6 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-[#7A4E5A] border-b border-[#E8D6C9] pb-2 mb-4">
                  {letter}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {brandList.map((brand) => (
                    <Link
                      key={brand.id}
                      to={`/brand/${brand.slug}`}
                      className="p-3 rounded-xl hover:bg-[#FAF7F5] transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-black group-hover:text-[#7A4E5A] transition-colors">
                          {brand.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{brand.origin}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-2 font-medium">
                        {brand.productCount} authentic items →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
