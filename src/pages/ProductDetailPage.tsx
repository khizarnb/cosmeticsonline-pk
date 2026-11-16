import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2,
  Sparkles,
  MessageSquarePlus,
  HelpCircle
} from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { Product, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, getProductById } = useStoreData();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const product = getProductById(productId || '');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howTo' | 'ingredients' | 'specs'>('benefits');
  const [isAdded, setIsAdded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review form states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Recently viewed tracker
  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      try {
        const stored = localStorage.getItem('cosmetics_recently_viewed');
        const list: string[] = stored ? JSON.parse(stored) : [];
        const updated = [product.id, ...list.filter((id) => id !== product.id)].slice(0, 6);
        localStorage.setItem('cosmetics_recently_viewed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-black mb-4">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The beauty item you are looking for is either unavailable or has been archived.</p>
        <Link
          to="/collection/all"
          className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: reviewerName,
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle || 'Verified Experience',
      comment: reviewComment,
      verifiedBuyer: true,
    };

    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.unshift(newRev);
    product.reviewCount += 1;
    setReviewSubmitted(true);
    setShowReviewForm(false);
  };

  // Related products from the same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to={`/collection/${product.category.toLowerCase()}`} className="hover:text-black">
            {product.category}
          </Link>
          <span>/</span>
          <Link to={`/brand/${product.brand.toLowerCase()}`} className="hover:text-black">
            {product.brand}
          </Link>
          <span>/</span>
          <span className="font-semibold text-black truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Gallery: Sticky Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl bg-white border border-[#E8D6C9] overflow-hidden p-6 sm:p-10 flex items-center justify-center shadow-sm">
              <img
                src={product.images[selectedImageIndex] || product.thumbnail}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-300"
              />

              {product.discountPercent && (
                <span className="absolute top-4 left-4 bg-[#D9383A] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                  -{product.discountPercent}% OFF
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xs shadow-md transition-all ${
                  isFavorited
                    ? 'bg-[#7A4E5A] text-white'
                    : 'bg-white/90 text-gray-700 hover:text-[#7A4E5A] hover:bg-white'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-black shadow-md'
                        : 'border-[#E8D6C9] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Pricing, Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Brand Link */}
              <Link
                to={`/brand/${product.brand.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A4E5A] hover:underline inline-block mb-1"
              >
                {product.brand}
              </Link>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                {product.name}
              </h1>

              {/* Volume & Stock */}
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="text-gray-500 font-medium">Size: {product.size}</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded">
                  {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-black">{product.rating.toFixed(1)}</span>
                <a href="#reviews" className="text-xs text-gray-500 hover:underline">
                  ({product.reviewCount} customer reviews)
                </a>
              </div>
            </div>

            {/* Price Showcase */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8D6C9] flex items-baseline justify-between shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-black">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase">
                Tax Included • Free Delivery over Rs. 5,000
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Purchase CTA Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8D6C9] rounded-xl bg-white p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 hover:text-black"
                    aria-label="Decrease"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 hover:text-black"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md ${
                    isAdded
                      ? 'bg-green-700 text-white'
                      : 'bg-black text-white hover:bg-[#7A4E5A] active:scale-98'
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
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 px-6 rounded-xl bg-[#7A4E5A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#633D48] transition-all shadow-sm"
              >
                Instant Buy Now (Fast Checkout)
              </button>
            </div>

            {/* Trust Assurances for Pakistan Customers */}
            <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8D6C9] space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#7A4E5A] flex-shrink-0" />
                <span>
                  <strong>100% Authentic Guarantee:</strong> Imported directly from authorized brand distributors with genuine batch code verification.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#7A4E5A] flex-shrink-0" />
                <span>
                  <strong>Nationwide Express Shipping:</strong> Karachi, Lahore & Islamabad in 24–48 hours; other cities in 2–4 days via TCS / Leopard Courier.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#7A4E5A] flex-shrink-0" />
                <span>
                  <strong>7-Day Returns:</strong> Return eligible if unopened and in original manufacturer packaging.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, How to Use, Ingredients, Specs */}
        <div className="mt-16 bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-10 shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-[#E8D6C9] gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'benefits'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Key Benefits
            </button>
            <button
              onClick={() => setActiveTab('howTo')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'howTo'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              How to Use
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'ingredients'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Full Ingredients
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Specifications
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
            {activeTab === 'benefits' && (
              <ul className="space-y-2.5">
                {product.keyBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#7A4E5A] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'howTo' && (
              <div className="space-y-3">
                <p>{product.howToUse}</p>
                <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8D6C9] text-xs text-gray-600">
                  <strong>Pro Beauty Tip:</strong> Always patch-test new active treatments on your inner arm or jawline for 24 hours prior to full facial application.
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-2">
                <p className="font-mono text-xs text-gray-600 leading-relaxed bg-[#FAF7F5] p-4 rounded-xl border border-[#E8D6C9]">
                  {product.ingredients}
                </p>
                <p className="text-[11px] text-gray-400 italic">
                  Ingredients are subject to formulation updates by the manufacturer. Refer to product packaging for the latest batch verification.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8D6C9] flex justify-between">
                      <span className="font-semibold text-black">{key}</span>
                      <span className="text-gray-600">{val}</span>
                    </div>
                  ))
                ) : (
                  <p>Standard retail packaging with verified distributor seal.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section id="reviews" className="mt-16 bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D6C9]">
            <div>
              <h3 className="font-serif text-2xl font-bold text-black">Customer Reviews</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-black">{product.rating.toFixed(1)} out of 5</span>
                <span className="text-xs text-gray-400">based on {product.reviewCount} verified reviews</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="my-6 p-6 rounded-2xl bg-[#FAF7F5] border border-[#E8D6C9] space-y-4">
              <h4 className="font-serif text-lg font-bold text-black">Share Your Honest Experience</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Mahnoor (Islamabad)"
                    className="w-full px-3 py-2 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 - Average)</option>
                    <option value={2}>⭐⭐ (2 - Below Expectations)</option>
                    <option value={1}>⭐ (1 - Disappointed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Cleared my texture in 3 weeks!"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How did the formula feel on your skin? Was the delivery fast?"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {reviewSubmitted && (
            <div className="my-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-medium">
              Thank you! Your verified product review has been recorded.
            </div>
          )}

          {/* Reviews List */}
          <div className="mt-6 space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8D6C9]/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-black">{rev.author}</span>
                      {rev.verifiedBuyer && (
                        <span className="text-[10px] text-green-700 bg-green-100 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  <h5 className="text-xs font-bold text-black">{rev.title}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No reviews yet for this batch. Be the first to review!</p>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black">
                Frequently Bought Together
              </h3>
              <Link
                to={`/collection/${product.category.toLowerCase()}`}
                className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#7A4E5A] flex items-center gap-1"
              >
                <span>View More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Bag Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8D6C9] p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-gray-500 block truncate max-w-[140px]">{product.name}</span>
          <span className="text-sm font-bold text-black font-sans">
            PKR {product.price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-xl border border-[#E8D6C9] ${
              isFavorited ? 'bg-[#7A4E5A] text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isAdded ? 'bg-green-700 text-white' : 'bg-black text-white hover:bg-[#7A4E5A]'
            }`}
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{isAdded ? 'Added' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
