import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  className = '',
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-[#E8D6C9]/80 overflow-hidden hover:shadow-luxury-hover hover:border-[#C8A5A1] transition-all duration-300 flex flex-col justify-between select-none ${className}`}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square w-full bg-[#FAF7F5] overflow-hidden flex items-center justify-center p-4">
          <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Discount Tag */}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-[#D9383A] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              -{product.discountPercent}%
            </span>
          )}

          {/* New Arrival Badge */}
          {product.isNewArrival && !product.discountPercent && (
            <span className="absolute top-3 left-3 bg-[#000000] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
              New
            </span>
          )}

          {/* Action Buttons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-xs transition-all duration-200 ${
                isFavorited
                  ? 'bg-[#7A4E5A] text-white shadow-md'
                  : 'bg-white/80 text-gray-700 hover:text-[#7A4E5A] hover:bg-white shadow-xs'
              }`}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            {onQuickView && (
              <button
                onClick={handleQuickViewClick}
                className="p-2 rounded-full bg-white/80 text-gray-700 hover:text-black hover:bg-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            {/* Brand */}
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
              {product.brand}
            </span>

            {/* Title */}
            <Link to={`/product/${product.id}`}>
              <h3 className="text-xs font-medium text-black line-clamp-2 hover:text-[#7A4E5A] transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Size / Volume */}
            <p className="text-[11px] text-gray-400 mt-0.5">{product.size}</p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-gray-400">({product.reviewCount.toLocaleString()})</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-black font-sans">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add To Bag CTA Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            !product.inStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isAdded
              ? 'bg-green-700 text-white'
              : 'bg-black text-white hover:bg-[#7A4E5A] active:scale-98'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" /> Added to Bag
            </>
          ) : !product.inStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
};
