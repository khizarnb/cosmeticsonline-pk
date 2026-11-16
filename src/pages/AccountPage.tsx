import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';
import { useWishlist } from '../context/WishlistContext';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, isAdmin, login, register, logout, addAddress, removeAddress } = useAuth();
  const { orders } = useStoreData();
  const { wishlistCount } = useWishlist();

  // Auth toggle
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // New address form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Lahore');
  const [newAddrProvince, setNewAddrProvince] = useState('Punjab');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      await login(emailInput, passwordInput);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput && emailInput) {
      await register(nameInput, emailInput, phoneInput);
    }
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddrName && newAddrLine) {
      addAddress({
        fullName: newAddrName,
        phone: newAddrPhone,
        addressLine: newAddrLine,
        city: newAddrCity,
        province: newAddrProvince,
        isDefault: false,
      });
      setShowAddressModal(false);
      setNewAddrName('');
      setNewAddrLine('');
    }
  };

  // If not logged in, show luxury Login / Register tab form
  if (!isAuthenticated) {
    return (
      <div className="w-full bg-[#F9F7F4] min-h-screen py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-8 shadow-luxury space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
                COSMETICSONLINE.PK
              </span>
              <h1 className="font-serif text-3xl font-bold text-black uppercase">
                {authMode === 'login' ? 'Customer Sign In' : 'Create Account'}
              </h1>
              <p className="text-xs text-gray-500">
                Access order history, tracking details & saved wishlist
              </p>
            </div>

            {/* Switch Tabs */}
            <div className="flex border-b border-[#E8D6C9]">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center ${
                  authMode === 'login'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center ${
                  authMode === 'register'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="fatima.tariq@gmail.com"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] focus:ring-1 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-black text-white font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors"
                >
                  Sign In
                </button>

                {/* Quick Demo Logins for Pair Programming Convenience */}
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider">
                    Quick Demo Credentials
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => login('fatima.tariq@gmail.com')}
                      className="flex-1 py-2 rounded-lg bg-[#FAF7F5] border border-[#E8D6C9] text-[11px] font-semibold text-black hover:border-black"
                    >
                      Demo Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => login('admin@cosmeticsonline.pk')}
                      className="flex-1 py-2 rounded-lg bg-[#F4ECEE] border border-[#DEC5C2] text-[11px] font-semibold text-[#7A4E5A] hover:bg-[#E3CFD5]"
                    >
                      Store Admin
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ayesha Khan"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ayesha@gmail.com"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mobile Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+92 321 0000000"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] focus:ring-1 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-black text-white font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Customer Dashboard
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Customer Account</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: User card & Navigation */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F5] border border-[#E8D6C9] flex items-center justify-center font-bold text-lg text-[#7A4E5A]">
                {user?.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-black">{user?.fullName}</h3>
                <p className="text-xs text-gray-400">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-700">
                  {user?.role === 'admin' ? 'Store Administrator' : 'VIP Member'}
                </span>
              </div>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-[#FAF7F5]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Order History ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-[#FAF7F5]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses ({user?.addresses?.length || 0})</span>
              </button>

              <Link
                to="/wishlist"
                className="w-full flex items-center justify-between p-3 rounded-xl text-gray-700 hover:bg-[#FAF7F5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>My Wishlist</span>
                </div>
                <span className="text-xs bg-[#FAF7F5] border px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-[#7A4E5A] bg-[#F4ECEE] hover:bg-[#E3CFD5] transition-colors font-bold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Store Admin Portal</span>
                </Link>
              )}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 text-left transition-colors pt-4 border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-black">Order History</h2>
                  <p className="text-xs text-gray-500">Track and view previous purchases</p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-black">No orders yet</p>
                    <p className="text-xs text-gray-500 mt-1">When you place an order, it will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-[#E8D6C9] bg-[#FAF7F5] space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8D6C9] pb-3 text-xs">
                          <div>
                            <span className="font-bold text-black text-sm">Order #{ord.orderNumber}</span>
                            <span className="text-gray-400 block text-[11px]">{ord.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                ord.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : ord.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                            <span className="text-xs font-bold text-black">
                              Rs. {ord.total.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                <img src={item.image} alt={item.productName} className="w-8 h-8 object-contain rounded" />
                                <span className="text-gray-800">
                                  {item.quantity}x {item.productName} ({item.size})
                                </span>
                              </div>
                              <span className="font-semibold text-black">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking details */}
                        {ord.trackingNumber && (
                          <div className="pt-2 border-t border-[#E8D6C9] flex items-center justify-between text-xs text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-[#7A4E5A]" /> Courier: {ord.courier}
                            </span>
                            <Link
                              to={`/track-order?orderId=${ord.orderNumber}`}
                              className="font-bold text-black hover:text-[#7A4E5A]"
                            >
                              Track Live ({ord.trackingNumber}) →
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-black">Shipping Addresses</h2>
                    <p className="text-xs text-gray-500">Manage multiple delivery destinations across Pakistan</p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user?.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl border border-[#E8D6C9] bg-[#FAF7F5] relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-black">{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{addr.addressLine}</p>
                        <p className="text-xs text-gray-600">{addr.city}, {addr.province}</p>
                        <p className="text-xs text-gray-500 mt-2 font-medium">{addr.phone}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-gray-200 flex justify-end">
                        <button
                          onClick={() => removeAddress(addr.id)}
                          className="text-gray-400 hover:text-red-600 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Address Dialog Form */}
                {showAddressModal && (
                  <form onSubmit={handleCreateAddress} className="p-6 rounded-2xl bg-[#F5ECE5] border border-[#DEC5C2] space-y-4 text-xs">
                    <h4 className="font-bold text-sm text-black">Add New Shipping Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          placeholder="Recipient Name"
                          className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          placeholder="+92 321 0000000"
                          className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Complete Address Line</label>
                      <input
                        type="text"
                        required
                        value={newAddrLine}
                        onChange={(e) => setNewAddrLine(e.target.value)}
                        placeholder="House, Street, Sector"
                        className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Province</label>
                        <input
                          type="text"
                          required
                          value={newAddrProvince}
                          onChange={(e) => setNewAddrProvince(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-4 py-2 font-semibold text-gray-600 hover:text-black"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-black text-white font-bold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
