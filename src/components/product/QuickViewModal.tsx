import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8D6C9] max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-black hover:bg-gray-100 transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Gallery Preview */}
        <div className="md:w-1/2 bg-[#FAF7F5] p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#E8D6C9]">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <img
              src={product.images[selectedImageIndex] || product.thumbnail}
              alt={product.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
            {product.discountPercent && (
              <span className="absolute top-0 left-0 bg-[#D9383A] text-white text-xs font-bold px-2 py-0.5 rounded">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden bg-white ${
                    selectedImageIndex === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {product.brand}
              </span>
              <span className="text-[11px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded">
                In Stock ({product.stockQuantity} available)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-black mt-1.5 leading-snug">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({product.reviewCount} verified reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-bold text-black font-sans">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Authenticity guarantee */}
            <div className="mt-4 p-2.5 rounded-xl bg-[#F9F7F4] border border-[#E8D6C9] flex items-center gap-2 text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-[#7A4E5A] flex-shrink-0" />
              <span>100% Guaranteed Authentic with Official Distributor QR Seal</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
            {/* Quantity Selector + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E8D6C9] rounded-xl bg-[#F9F7F4] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm font-bold text-gray-600 hover:text-black"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm font-bold text-gray-600 hover:text-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isAdded
                    ? 'bg-green-700 text-white'
                    : 'bg-black text-white hover:bg-[#7A4E5A]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border border-[#E8D6C9] transition-colors ${
                  isFavorited ? 'bg-[#7A4E5A] text-white' : 'bg-white text-gray-700 hover:text-[#7A4E5A]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* View Full Product Page Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black pt-1"
            >
              <span>View full product specifications & reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
