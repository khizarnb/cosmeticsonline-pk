import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  PackageCheck,
  Building,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';
import { Order, PaymentMethod } from '../types';

const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Islamabad Capital Territory',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Azad Kashmir',
  'Gilgit-Baltistan',
];

const MAJOR_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Gujrat',
  'Mardan',
  'Kasur',
];

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discountAmount, shippingFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useStoreData();
  const navigate = useNavigate();

  // Form states initialized with user profile if present
  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [fullName, setFullName] = useState(defaultAddress?.fullName || user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(defaultAddress?.phone || user?.phone || '');
  const [addressLine, setAddressLine] = useState(defaultAddress?.addressLine || '');
  const [apartment, setApartment] = useState(defaultAddress?.apartment || '');
  const [city, setCity] = useState(defaultAddress?.city || 'Lahore');
  const [province, setProvince] = useState(defaultAddress?.province || 'Punjab');
  const [postalCode, setPostalCode] = useState(defaultAddress?.postalCode || '54000');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

  // Confirmation view state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      brand: item.product.brand,
      image: item.product.thumbnail,
      price: item.product.price,
      quantity: item.quantity,
      size: item.product.size,
    }));

    const newOrder = createOrder({
      status: 'Pending',
      paymentStatus: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Pending',
      paymentMethod,
      items: orderItems,
      subtotal,
      discount: discountAmount,
      shippingFee,
      total,
      shippingAddress: {
        id: 'addr-' + Date.now(),
        fullName,
        phone,
        addressLine,
        apartment,
        city,
        province,
        postalCode,
      },
      customerEmail: email,
      customerNotes: orderNotes,
    });

    setCompletedOrder(newOrder);
    clearCart();
  };

  // Order Confirmation Screen
  if (completedOrder) {
    return (
      <div className="w-full bg-[#F9F7F4] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-8 sm:p-12 shadow-luxury text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto shadow-xs">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
                ORDER CONFIRMED & VERIFIED
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-black uppercase">
                Thank You For Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Your order <strong className="text-black">#{completedOrder.orderNumber}</strong> has been placed successfully and is being packed in our temperature-controlled beauty facility.
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#E8D6C9] text-left text-xs space-y-4">
              <div className="flex justify-between border-b border-[#E8D6C9] pb-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Order Number</span>
                  <span className="font-bold text-black text-sm">{completedOrder.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Placed On</span>
                  <span className="font-semibold text-gray-700">{completedOrder.createdAt}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Delivery Destination</span>
                <p className="font-semibold text-black">{completedOrder.shippingAddress.fullName} ({completedOrder.shippingAddress.phone})</p>
                <p className="text-gray-600">{completedOrder.shippingAddress.addressLine}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.province}</p>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Payment Method</span>
                <p className="font-semibold text-black">
                  {completedOrder.paymentMethod === 'COD'
                    ? 'Cash on Delivery (Pay Rs. ' + completedOrder.total.toLocaleString() + ' upon delivery)'
                    : completedOrder.paymentMethod === 'BankTransfer'
                    ? 'Direct Bank Transfer (Meezan Bank)'
                    : 'Online Debit/Credit Card'}
                </p>
              </div>

              {/* Items summary */}
              <div className="border-t border-[#E8D6C9] pt-3 space-y-2">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Items Purchased</span>
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-800">
                      {item.quantity}x {item.productName} ({item.size})
                    </span>
                    <span className="font-semibold text-black">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-black">
                  <span>Grand Total</span>
                  <span>Rs. {completedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Bank Transfer Instructions if BankTransfer chosen */}
            {completedOrder.paymentMethod === 'BankTransfer' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <p className="font-bold">Meezan Bank Account Details:</p>
                <p>Account Title: CosmeticsOnline PK Pvt Ltd</p>
                <p>IBAN: PK64MEZN0001234567890123</p>
                <p>Please send proof of payment on WhatsApp to +92 300 0000000 with your order number.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to={`/track-order?orderId=${completedOrder.orderNumber}`}
                className="flex-1 py-3.5 px-6 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors flex items-center justify-center gap-2"
              >
                <span>Track Live Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => window.print()}
                className="py-3.5 px-6 rounded-full border border-gray-300 text-black text-xs font-semibold hover:border-black transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-black mb-3">Your Bag is Empty</h2>
        <p className="text-sm text-gray-500 mb-6">Add beauty items before heading to checkout.</p>
        <Link to="/collection/all" className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase">
          Shop Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Checkout Minimal Header */}
      <div className="border-b border-[#E8D6C9] bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.25em] text-black">
            COSMETICSONLINE.PK
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Lock className="w-3.5 h-3.5 text-[#7A4E5A]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-black">
                1. Contact & Customer Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 321 0000000"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Email Address (for Order Updates) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-black">
                2. Nationwide Delivery Address
              </h2>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Complete Street Address *</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="House / Flat / Plot #, Street, Phase / Block / Sector"
                  className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="Apartment 4B, 3rd Floor"
                  className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs bg-white focus:ring-1 focus:ring-black"
                  >
                    {MAJOR_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Province *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs bg-white focus:ring-1 focus:ring-black"
                  >
                    {PAKISTAN_PROVINCES.map((pr) => (
                      <option key={pr} value={pr}>{pr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="54000"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Delivery Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions for the courier rider..."
                  className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-black">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-black bg-[#FAF7F5] shadow-xs'
                      : 'border-[#E8D6C9] bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Cash on Delivery (COD)</span>
                      <Banknote className="w-4 h-4 text-gray-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Pay cash to the TCS or Leopard courier upon receiving your parcel at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'BankTransfer'
                      ? 'border-black bg-[#FAF7F5] shadow-xs'
                      : 'border-[#E8D6C9] bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="BankTransfer"
                    checked={paymentMethod === 'BankTransfer'}
                    onChange={() => setPaymentMethod('BankTransfer')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Direct Online Bank Transfer</span>
                      <Building className="w-4 h-4 text-gray-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Transfer directly via Meezan Bank, HBL or SCB online banking / Raast ID.
                    </p>
                  </div>
                </label>

                {/* Card Payment (Ready architecture) */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-black bg-[#FAF7F5] shadow-xs'
                      : 'border-[#E8D6C9] bg-white hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Debit / Credit Card (Visa & Mastercard)</span>
                      <CreditCard className="w-4 h-4 text-gray-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Pay securely with 256-bit encryption. Supports local Pakistani cards.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Place Order CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-sm space-y-5 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-black border-b border-gray-100 pb-3">
                Review Bag ({cart.length} items)
              </h3>

              {/* Items preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[#FAF7F5] p-1 flex-shrink-0 flex items-center justify-center border border-[#E8D6C9]">
                      <img src={item.product.thumbnail} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-semibold text-black truncate">{item.product.name}</p>
                      <p className="text-[11px] text-gray-400">Qty: {item.quantity} • {item.product.size}</p>
                    </div>
                    <span className="text-xs font-bold text-black">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
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
                  <span>Shipping Across Pakistan</span>
                  <span className="font-semibold text-black">
                    {shippingFee === 0 ? (
                      <span className="text-green-700 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      `Rs. ${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-gray-200">
                  <span>Total Amount Due</span>
                  <span className="text-xl">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] transition-all flex items-center justify-center gap-2 shadow-md group"
              >
                <span>Place Order (Confirm)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="p-3 bg-[#FAF7F5] rounded-xl text-[10px] text-gray-500 text-center space-y-1">
                <p>By placing your order, you agree to CosmeticsOnline.pk terms of service and authentic product guarantees.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
