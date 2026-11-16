import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  X,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product, SkinConcernType, SkinType } from '../types';

export const CollectionPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, brands } = useStoreData();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Parse filters from URL or state
  const searchQuery = searchParams.get('search') || '';
  const concernParam = searchParams.get('concern') || '';
  const brandParam = searchParams.get('brand') || '';
  const sortParam = (searchParams.get('sort') as any) || 'featured';

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam ? [brandParam] : []
  );
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(
    concernParam ? [concernParam] : []
  );
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<string>(sortParam);

  // Normalized collection title & description
  const categoryTitle = useMemo(() => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (!categorySlug || categorySlug === 'all') return 'All Beauty & Skincare';
    if (categorySlug === 'new-arrivals') return 'New Arrivals';
    if (categorySlug === 'bestsellers') return 'Trending Bestsellers';
    if (categorySlug === 'offers') return 'Special Offers & Bundles';
    if (categorySlug === 'k-beauty') return 'K-Beauty Favourites';
    if (categorySlug === 'gift-sets') return 'Luxury Gift Sets & Bundles';
    // capitalize
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  }, [categorySlug, searchQuery]);

  const collectionDescription = useMemo(() => {
    if (categorySlug === 'k-beauty') {
      return 'Glow-boosting Korean skincare formulas: snail mucin, soothing heartleaf, centella asiatica, and nourishing rice fermented probiotics.';
    }
    if (categorySlug === 'skincare') {
      return 'Dermatologist-approved cleansers, hydrating essences, targeted active serums, barrier repair creams, and broad-spectrum sunscreens.';
    }
    if (categorySlug === 'makeup') {
      return 'Weightless cushion compacts, long-lasting candied lip tints, velvety blushes, and precision beauty tools.';
    }
    if (categorySlug === 'fragrance') {
      return 'Exquisite designer perfumes and niche eau de parfums curated from Paris, Milan and prestigious fragrance houses.';
    }
    if (categorySlug === 'offers') {
      return 'Exclusive limited-time savings, bundled routines, and promotional discounts on authentic favorites.';
    }
    return '100% authentic international skincare, cosmetics, haircare, and fragrances with verified batch codes and nationwide delivery across Pakistan.';
  }, [categorySlug]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (categorySlug && categorySlug !== 'all') {
        if (categorySlug === 'new-arrivals') {
          if (!p.isNewArrival) return false;
        } else if (categorySlug === 'bestsellers') {
          if (!p.isBestseller) return false;
        } else if (categorySlug === 'offers') {
          if (!p.discountPercent || p.discountPercent <= 0) return false;
        } else if (categorySlug === 'k-beauty') {
          const isKorean = ['COSRX', 'Beauty of Joseon', 'Anua', 'LANEIGE', 'Skin1004', 'Round Lab', 'Rom&nd', 'Torriden', 'Dr. Althea', 'MISSHA', 'Dear Klairs', "d'Alba"].includes(p.brand);
          if (!isKorean && p.category !== 'K-Beauty') return false;
        } else if (p.category.toLowerCase() !== categorySlug.toLowerCase()) {
          return false;
        }
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesConcern = p.skinConcern?.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesConcern) return false;
      }

      // Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Skin Concern Filter
      if (selectedConcerns.length > 0) {
        const hasConcern = p.skinConcern?.some((c) => selectedConcerns.includes(c));
        if (!hasConcern) return false;
      }

      // Skin Type Filter
      if (selectedSkinTypes.length > 0) {
        const hasType = p.skinType?.some((t) => selectedSkinTypes.includes(t));
        if (!hasType) return false;
      }

      // In Stock Filter
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Max Price Filter
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, categorySlug, searchQuery, selectedBrands, selectedConcerns, selectedSkinTypes, inStockOnly, maxPrice]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    if (sortBy === 'bestselling') {
      return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    if (sortBy === 'alpha-asc') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list; // featured default
  }, [filteredProducts, sortBy]);

  const toggleBrandFilter = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  const toggleConcernFilter = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const toggleSkinTypeFilter = (type: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedConcerns([]);
    setSelectedSkinTypes([]);
    setInStockOnly(false);
    setMaxPrice(50000);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedConcerns.length > 0 ||
    selectedSkinTypes.length > 0 ||
    inStockOnly ||
    maxPrice < 50000 ||
    searchQuery;

  // Render Filter Panel Component (Shared between desktop sidebar & mobile drawer)
  const FilterPanel = () => (
    <div className="space-y-6 text-xs text-gray-700">
      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="pb-4 border-b border-[#E8D6C9]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold uppercase tracking-wider text-[11px] text-black">Active Filters</span>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#7A4E5A] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedBrands.map((b) => (
              <span
                key={b}
                onClick={() => toggleBrandFilter(b)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F5] border border-[#E8D6C9] rounded-full text-[10px] font-semibold text-black cursor-pointer hover:border-red-400"
              >
                {b} <X className="w-3 h-3" />
              </span>
            ))}
            {selectedConcerns.map((c) => (
              <span
                key={c}
                onClick={() => toggleConcernFilter(c)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F5] border border-[#E8D6C9] rounded-full text-[10px] font-semibold text-black cursor-pointer hover:border-red-400"
              >
                {c} <X className="w-3 h-3" />
              </span>
            ))}
            {inStockOnly && (
              <span
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F5] border border-[#E8D6C9] rounded-full text-[10px] font-semibold text-black cursor-pointer"
              >
                In Stock Only <X className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Availability Filter */}
      <div className="pb-5 border-b border-[#E8D6C9]">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-3">Availability</h4>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
          />
          <span className="text-xs">In Stock Items Only</span>
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="pb-5 border-b border-[#E8D6C9]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-black">Price Range</h4>
          <span className="font-semibold text-black">Up to Rs. {maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>Rs. 1,000</span>
          <span>Rs. 50,000+</span>
        </div>
      </div>

      {/* Brand Multi-Select */}
      <div className="pb-5 border-b border-[#E8D6C9]">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {brands.map((b) => (
            <label key={b.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.name)}
                  onChange={() => toggleBrandFilter(b.name)}
                  className="w-4 h-4 rounded border-gray-300 text-black accent-black"
                />
                <span className="text-xs group-hover:text-black">{b.name}</span>
              </div>
              <span className="text-[10px] text-gray-400">({b.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Concern Filter */}
      <div className="pb-5 border-b border-[#E8D6C9]">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-3">Skin Concern</h4>
        <div className="space-y-2">
          {[
            'Hydration',
            'Brightening',
            'Acne & Breakouts',
            'Barrier Repair',
            'Anti-Aging',
            'Sun Protection',
            'Sensitive Skin'
          ].map((concern) => (
            <label key={concern} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedConcerns.includes(concern)}
                onChange={() => toggleConcernFilter(concern)}
                className="w-4 h-4 rounded border-gray-300 text-black accent-black"
              />
              <span className="text-xs group-hover:text-black">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="pb-5">
        <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-3">Skin Type</h4>
        <div className="space-y-2">
          {['All Skin Types', 'Oily', 'Dry', 'Combination', 'Sensitive'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSkinTypes.includes(type)}
                onChange={() => toggleSkinTypeFilter(type)}
                className="w-4 h-4 rounded border-gray-300 text-black accent-black"
              />
              <span className="text-xs group-hover:text-black">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/collection/all" className="hover:text-black">Collections</Link>
          <span>/</span>
          <span className="font-semibold text-black">{categoryTitle}</span>
        </div>
      </div>

      {/* Category Banner & Header */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Beauty Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black uppercase leading-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              {collectionDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar: Count, Mobile Filter Trigger, Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D6C9] mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8D6C9] text-xs font-semibold text-black shadow-xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
            </button>

            <span className="text-xs font-medium text-gray-500">
              Showing <strong className="text-black">{sortedProducts.length}</strong> authentic products
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E8D6C9] text-xs font-semibold text-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer shadow-xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestselling">Best Selling</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="alpha-asc">Alphabetically: A–Z</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Sidebar Filter */}
          <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-[#E8D6C9] sticky top-24 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D6C9] mb-4">
              <h3 className="font-serif text-lg font-bold text-black">Filter Collection</h3>
              <SlidersHorizontal className="w-4 h-4 text-[#7A4E5A]" />
            </div>
            <FilterPanel />
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8D6C9] max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F5] mx-auto flex items-center justify-center text-[#7A4E5A]">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-black">No products match your criteria</h3>
                <p className="text-xs text-gray-500">
                  Try clearing some filter tags or adjusting your price limits to view more selections.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-50">
            <div className="p-4 border-b border-[#E8D6C9] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-black">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-black hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
              <FilterPanel />
            </div>
            <div className="p-4 border-t border-[#E8D6C9] bg-[#FAF7F5]">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
              >
                Show Results ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
