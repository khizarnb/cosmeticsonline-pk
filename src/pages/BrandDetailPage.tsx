import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product } from '../types';

export const BrandDetailPage: React.FC = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const { brands, products } = useStoreData();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const brand = brands.find(
    (b) => b.slug.toLowerCase() === brandSlug?.toLowerCase() || b.name.toLowerCase() === brandSlug?.toLowerCase()
  );

  const brandProducts = products.filter(
    (p) =>
      p.brand.toLowerCase() === brand?.name.toLowerCase() ||
      p.brand.toLowerCase() === brandSlug?.toLowerCase()
  );

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-black mb-3">Brand Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">This brand is currently not in our catalog.</p>
        <Link to="/brands" className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase">
          Back to Brand Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-black">Brands</Link>
          <span>/</span>
          <span className="font-semibold text-black">{brand.name}</span>
        </div>
      </div>

      {/* Hero Brand Header */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ORIGIN: {brand.origin}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-black uppercase">
                {brand.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                {brand.description}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1 font-semibold text-black">
                  <ShieldCheck className="w-4 h-4 text-[#7A4E5A]" /> Authorized Distributor Stock
                </span>
                <span>•</span>
                <span>{brandProducts.length} Products Available</span>
              </div>
            </div>

            <div className="w-48 sm:w-64 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-white flex-shrink-0">
              <img
                src={brand.bannerUrl}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Products Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-black">
            All Products by {brand.name}
          </h2>
          <Link
            to="/brands"
            className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Brands</span>
          </Link>
        </div>

        {brandProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8D6C9]">
            <p className="text-sm text-gray-500">New inventory for {brand.name} is currently in transit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {brandProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
