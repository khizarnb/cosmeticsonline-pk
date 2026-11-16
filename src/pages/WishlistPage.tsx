import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToCart(item.product, 1);
    });
    clearWishlist();
    openCart();
  };

  if (wishlist.length === 0) {
    return (
      <div className="w-full bg-[#F9F7F4] min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 text-center bg-white rounded-3xl p-10 border border-[#E8D6C9] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F5] flex items-center justify-center mx-auto mb-4 text-[#7A4E5A]">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black mb-2">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Save your favorite beauty formulas, viral toners, and luxury scents to purchase whenever you're ready.
          </p>
          <Link
            to="/collection/all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-all"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
          <span className="font-semibold text-black">My Wishlist</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8D6C9]">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-black uppercase">
              My Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-gray-500 mt-1">Saved beauty essentials & wishlist favorites</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToBag}
              className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Move All to Bag
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Grid of Wishlist Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => (
            <div key={item.product.id} className="relative">
              <ProductCard product={item.product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
