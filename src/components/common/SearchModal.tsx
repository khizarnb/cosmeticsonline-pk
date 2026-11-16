import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStoreData } from '../../context/StoreDataContext';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'COSRX Snail Mucin',
  'Beauty of Joseon Sunscreen',
  'Anua Heartleaf Toner',
  'The Ordinary Niacinamide',
  'Laneige Lip Mask',
  'Centella Ampoule',
  'Glass Skin Routine',
  'Salicylic Acid'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { products, brands } = useStoreData();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts: Product[] = trimmed
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.brand.toLowerCase().includes(trimmed) ||
            p.category.toLowerCase().includes(trimmed) ||
            p.skinConcern?.some((c) => c.toLowerCase().includes(trimmed))
        )
        .slice(0, 6)
    : [];

  const matchingBrands = trimmed
    ? brands
        .filter((b) => b.name.toLowerCase().includes(trimmed))
        .slice(0, 4)
    : [];

  const handleSelectProduct = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleSelectBrand = (slug: string) => {
    onClose();
    navigate(`/brand/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/collection/all?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full bg-[#F9F7F4] border-b border-[#E8D6C9] shadow-2xl transition-all">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest text-[#7A4E5A] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant Beauty Search
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-black hover:bg-[#E8D6C9]/40 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 100% authentic skincare, makeup, brands or skin concerns..."
              className="w-full pl-14 pr-24 py-4 rounded-full bg-white border border-[#E8D6C9] text-base sm:text-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A4E5A] focus:border-transparent shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black text-white hover:bg-[#7A4E5A] transition-colors"
              aria-label="Submit search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Suggestions when empty */}
          {!trimmed && (
            <div className="mt-6 pt-4 border-t border-[#E8D6C9]/60">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#7A4E5A]" /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectPopular(term)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8D6C9] text-xs font-medium text-gray-700 hover:border-black hover:text-black hover:bg-[#F9F7F4] transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results preview */}
          {trimmed && (
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
              {matchingBrands.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Matching Brands ({matchingBrands.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingBrands.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleSelectBrand(b.slug)}
                        className="px-4 py-2 rounded-lg bg-white border border-[#C8A5A1] text-sm font-semibold text-black hover:bg-[#000000] hover:text-white transition-colors"
                      >
                        {b.name} <span className="text-xs opacity-60">({b.productCount} items)</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Products {matchingProducts.length > 0 ? `(${matchingProducts.length})` : ''}
              </h4>

              {matchingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {matchingProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#E8D6C9]/80 hover:border-[#7A4E5A] hover:shadow-md cursor-pointer transition-all group"
                    >
                      <div className="w-14 h-14 rounded-lg bg-[#F9F7F4] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h5 className="text-xs font-medium text-black truncate group-hover:text-[#7A4E5A] transition-colors">
                          {product.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-black">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-600">
                    No exact match found for "<span className="font-semibold text-black">{query}</span>".
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching for broader keywords like "serum", "sunscreen", "COSRX", or "hydrating".
                  </p>
                </div>
              )}

              {matchingProducts.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:text-[#7A4E5A] transition-colors"
                  >
                    View all results for "{query}" <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClose} />
    </div>
  );
};
