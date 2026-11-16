import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const navigate = useNavigate();

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponFeedback({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#F9F7F4] min-h-screen py-20">
        <div className="max-w-xl mx-auto px-4 text-center bg-white rounded-3xl p-10 border border-[#E8D6C9] shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FAF7F5] flex items-center justify-center mx-auto mb-4 text-[#7A4E5A]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-black mb-2">Your Shopping Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            You haven't added any beauty items to your bag yet. Explore our curated Korean and international collections.
          </p>
          <Link
            to="/collection/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-all"
          >
            <span>Explore Best Sellers</span>
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
          <span className="font-semibold text-black">Shopping Bag</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-black uppercase mb-8">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>

        {/* Free Shipping Notification Banner */}
        <div className="bg-[#F5ECE5] rounded-2xl p-4 sm:p-5 border border-[#E8D6C9] mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium text-gray-800 mb-2">
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong className="text-black">Rs. {amountToFreeShipping.toLocaleString()}</strong> more to your bag to enjoy <strong className="text-[#7A4E5A]">FREE Nationwide Delivery</strong>
              </span>
            ) : (
              <span className="text-green-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                Congratulations! You qualify for FREE Express Shipping across Pakistan.
              </span>
            )}
            <span className="font-bold text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E8D6C9] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#7A4E5A] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-sm space-y-6">
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FAF7F5] p-2 flex items-center justify-center flex-shrink-0 border border-[#E8D6C9]">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {item.product.brand}
                          </span>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="text-sm sm:text-base font-semibold text-black hover:text-[#7A4E5A] transition-colors leading-snug">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">Size: {item.product.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 p-1.5 transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E8D6C9] rounded-xl bg-[#FAF7F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-black font-sans">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-gray-400 block">
                            (Rs. {item.product.price.toLocaleString()} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Instructions / Order Notes */}
            <div className="pt-6 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                Order Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Special courier instructions (e.g., Leave with security guard, call before delivery)"
                className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-black border-b border-gray-100 pb-3">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4ECEE] border border-[#DEC5C2] text-xs text-[#7A4E5A]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[10px] uppercase font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. BEAUTY10)"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E8D6C9] focus:outline-none focus:ring-1 focus:ring-black uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-[#7A4E5A] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-2 flex items-center gap-1 ${
                      couponFeedback.type === 'success' ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#7A4E5A]">
                    <span>Discount</span>
                    <span className="font-semibold">-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span className="font-semibold text-black">
                    {shippingFee === 0 ? (
                      <span className="text-green-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      `Rs. ${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-xl">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-2xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-all flex items-center justify-center gap-2 shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="p-3 bg-[#FAF7F5] rounded-xl text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-black">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7A4E5A]" />
                  <span>Verified 100% Authentic Beauty</span>
                </div>
                <p>Accepting Cash on Delivery (COD), Direct Bank Transfer & Debit/Credit Cards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
