import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
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
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponFeedback({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#F9F7F4] h-full shadow-drawer flex flex-col z-50">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8D6C9] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h3 className="font-sans font-bold text-base text-black uppercase tracking-wider">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-black hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5ECE5] px-5 py-3 border-b border-[#E8D6C9]">
          <div className="flex justify-between items-center text-xs font-medium text-gray-800 mb-1.5">
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong className="text-black">Rs. {amountToFreeShipping.toLocaleString()}</strong> more for <strong className="text-[#7A4E5A]">FREE Shipping</strong>
              </span>
            ) : (
              <span className="text-[#7A4E5A] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> You've unlocked FREE nationwide delivery!
              </span>
            )}
            <span className="text-[11px] font-bold text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E8D6C9] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7A4E5A] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#E8D6C9]/50 flex items-center justify-center mb-4 text-[#7A4E5A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-black mb-1">Your bag is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                Explore our curated collection of 100% authentic Korean skincare, makeup and luxury fragrances.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/collection/all');
                }}
                className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-[#E8D6C9] shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-[#F9F7F4] flex-shrink-0 p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 truncate">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h5 className="text-xs font-semibold text-black leading-snug line-clamp-2">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">Size: {item.product.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E8D6C9] rounded-lg bg-[#F9F7F4]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-[#7A4E5A] text-gray-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-[#7A4E5A] text-gray-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-bold text-black">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8D6C9] shadow-lg space-y-3.5">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F4ECEE] border border-[#DEC5C2] text-xs text-[#7A4E5A]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
                    </span>
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
                    placeholder="Enter promo code (e.g. BEAUTY10)"
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#E8D6C9] focus:outline-none focus:ring-1 focus:ring-black uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-[#7A4E5A] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                    couponFeedback.type === 'success' ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {couponFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {couponFeedback.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
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
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-200">
                <span>Estimated Total</span>
                <span className="text-base text-black">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-all flex items-center justify-center gap-2 shadow-md group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7A4E5A]" />
              <span>100% Authentic Guarantee • 7-Day Hassle-Free Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
