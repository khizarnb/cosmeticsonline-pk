import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  Tag,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { Product, Order, Brand, Coupon, OrderStatus, CategoryType } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    brands,
    orders,
    coupons,
    addProduct,
    updateProduct,
    deleteProduct,
    addBrand,
    deleteBrand,
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    resetToDefaultData,
  } = useStoreData();

  const [activeTab, setActiveTab] = useState<'metrics' | 'products' | 'orders' | 'brands' | 'promotions'>('metrics');

  // Product Add / Edit modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('COSRX');
  const [prodCategory, setProdCategory] = useState<CategoryType>('Skincare');
  const [prodSize, setProdSize] = useState('100ml');
  const [prodPrice, setProdPrice] = useState(4500);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(5500);
  const [prodStock, setProdStock] = useState(25);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop');
  const [prodDescription, setProdDescription] = useState('Premium high-performance skincare formula.');

  // Order tracking update state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Processing');
  const [newTracking, setNewTracking] = useState('');
  const [newCourier, setNewCourier] = useState('TCS Express Pakistan');

  // Coupon modal state
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(15);
  const [couponMinSpend, setCouponMinSpend] = useState(5000);

  // Brand modal state
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brandOrigin, setBrandOrigin] = useState('South Korea');
  const [brandDesc, setBrandDesc] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const inStockCount = products.filter((p) => p.inStock).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdBrand('COSRX');
    setProdCategory('Skincare');
    setProdSize('50ml');
    setProdPrice(4500);
    setProdOriginalPrice(5500);
    setProdStock(30);
    setProdImage('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop');
    setProdDescription('High efficacy beauty active with 100% genuine formulation.');
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdBrand(p.brand);
    setProdCategory(p.category);
    setProdSize(p.size);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdStock(p.stockQuantity);
    setProdImage(p.thumbnail);
    setProdDescription(p.description);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: prodName,
        brand: prodBrand,
        category: prodCategory,
        size: prodSize,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercent:
          prodOriginalPrice > prodPrice
            ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100)
            : 0,
        stockQuantity: Number(prodStock),
        inStock: Number(prodStock) > 0,
        thumbnail: prodImage,
        images: [prodImage],
        description: prodDescription,
      });
    } else {
      addProduct({
        name: prodName,
        brand: prodBrand,
        category: prodCategory,
        size: prodSize,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercent:
          prodOriginalPrice > prodPrice
            ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100)
            : 0,
        rating: 5.0,
        reviewCount: 1,
        images: [prodImage],
        thumbnail: prodImage,
        inStock: Number(prodStock) > 0,
        stockQuantity: Number(prodStock),
        description: prodDescription,
        keyBenefits: ['100% Authentic verified distributor stock', 'Dermatologist tested formulation'],
        howToUse: 'Apply gently after cleansing as directed.',
        ingredients: 'Water, Active Extracts, Glycerin.',
      });
    }
    setShowProductModal(false);
  };

  const handleUpdateOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus, newTracking, newCourier);
      setSelectedOrder(null);
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode) {
      addCoupon({
        code: couponCode.trim().toUpperCase(),
        discountPercent: Number(couponDiscount),
        minSpend: Number(couponMinSpend),
        description: `${couponDiscount}% OFF on minimum spend of Rs. ${couponMinSpend.toLocaleString()}`,
      });
      setShowCouponModal(false);
      setCouponCode('');
    }
  };

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName) {
      addBrand({
        name: brandName,
        slug: brandName.toLowerCase().replace(/\s+/g, '-'),
        origin: brandOrigin,
        bannerUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
        description: brandDesc || `${brandName} authentic beauty range.`,
        isFeatured: true,
        productCount: 0,
      });
      setShowBrandModal(false);
      setBrandName('');
      setBrandDesc('');
    }
  };

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20 select-none">
      {/* Top Admin Nav Bar */}
      <div className="bg-[#000000] text-white border-b border-gray-900 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-widest uppercase">
              COSMETICSONLINE.PK
            </span>
            <span className="bg-[#7A4E5A] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                if (confirm('Reset catalog and orders to default demo data?')) {
                  resetToDefaultData();
                }
              }}
              className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Store</span>
            </button>
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-semibold transition-all"
            >
              View Storefront →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 border-b border-[#E8D6C9]">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Overview & Sales
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
            }`}
          >
            <Package className="w-4 h-4" /> Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'brands'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Brands ({brands.length})
          </button>

          <button
            onClick={() => setActiveTab('promotions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'promotions'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white border border-[#E8D6C9] text-gray-700 hover:border-black'
            }`}
          >
            <Tag className="w-4 h-4" /> Discount Coupons ({coupons.length})
          </button>
        </div>

        {/* 1. OVERVIEW & METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Store Revenue</span>
                <p className="font-serif text-3xl font-bold text-black">PKR {totalRevenue.toLocaleString()}</p>
                <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Orders Processed</span>
                <p className="font-serif text-3xl font-bold text-black">{orders.length}</p>
                <span className="text-[11px] text-gray-500 font-medium">Nationwide Pakistan fulfillment</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Average Order Value (AOV)</span>
                <p className="font-serif text-3xl font-bold text-black">PKR {averageOrderValue.toLocaleString()}</p>
                <span className="text-[11px] text-[#7A4E5A] font-semibold">Healthy luxury basket size</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8D6C9] shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Active Catalog SKUs</span>
                <p className="font-serif text-3xl font-bold text-black">{inStockCount} / {products.length}</p>
                <span className="text-[11px] text-green-700 font-semibold">{inStockCount} in stock</span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-black">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#7A4E5A] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="divide-y divide-gray-100 text-xs">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-black">#{ord.orderNumber} - {ord.shippingAddress.fullName}</p>
                        <p className="text-gray-400 text-[11px]">{ord.createdAt} • {ord.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-black block">Rs. {ord.total.toLocaleString()}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-bold text-black border-b border-gray-100 pb-3">
                  Quick Catalog Actions
                </h3>
                <div className="space-y-2.5">
                  <button
                    onClick={handleOpenAddProduct}
                    className="w-full py-3 px-4 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add New Product
                  </button>
                  <button
                    onClick={() => {
                      setShowBrandModal(true);
                      setActiveTab('brands');
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-[#E8D6C9] text-xs font-bold uppercase tracking-wider hover:border-black flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Add New Brand
                  </button>
                  <button
                    onClick={() => {
                      setShowCouponModal(true);
                      setActiveTab('promotions');
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-[#E8D6C9] text-xs font-bold uppercase tracking-wider hover:border-black flex items-center justify-center gap-2"
                  >
                    <Tag className="w-4 h-4" /> Create Promo Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-black">Product Catalog Management</h2>
                <p className="text-xs text-gray-500">Live products reflected instantaneously across the store</p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E8D6C9] text-gray-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">Product</th>
                    <th className="py-3 px-2">Brand</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2">Price (PKR)</th>
                    <th className="py-3 px-2">Stock</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-2 flex items-center gap-3">
                        <img src={p.thumbnail} alt={p.name} className="w-10 h-10 object-contain rounded bg-[#FAF7F5] p-1 border" />
                        <div>
                          <p className="font-bold text-black line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.size}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-medium">{p.brand}</td>
                      <td className="py-3 px-2">{p.category}</td>
                      <td className="py-3 px-2 font-bold text-black">Rs. {p.price.toLocaleString()}</td>
                      <td className="py-3 px-2">{p.stockQuantity} units</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-gray-500 hover:text-black"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-black">Orders & Shipment Management</h2>
              <p className="text-xs text-gray-500">Update fulfillment status and add Pakistani courier tracking numbers</p>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E8D6C9] text-gray-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">Order #</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">City</th>
                    <th className="py-3 px-2">Method</th>
                    <th className="py-3 px-2">Total</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Tracking #</th>
                    <th className="py-3 px-2 text-right">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-2 font-bold text-black">{ord.orderNumber}</td>
                      <td className="py-3 px-2">
                        <p className="font-medium text-black">{ord.shippingAddress.fullName}</p>
                        <p className="text-[10px] text-gray-400">{ord.shippingAddress.phone}</p>
                      </td>
                      <td className="py-3 px-2">{ord.shippingAddress.city}</td>
                      <td className="py-3 px-2 font-medium">{ord.paymentMethod}</td>
                      <td className="py-3 px-2 font-bold text-black">Rs. {ord.total.toLocaleString()}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            ord.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : ord.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-mono text-[11px] text-gray-600">
                        {ord.trackingNumber || 'Unassigned'}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewStatus(ord.status);
                            setNewTracking(ord.trackingNumber || '');
                            setNewCourier(ord.courier || 'TCS Express Pakistan');
                          }}
                          className="px-3 py-1 rounded-lg bg-black text-white text-[10px] font-bold uppercase hover:bg-[#7A4E5A]"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. BRANDS MANAGEMENT */}
        {activeTab === 'brands' && (
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-black">Brand Directory Management</h2>
                <p className="text-xs text-gray-500">Add authentic international beauty brands to directory</p>
              </div>
              <button
                onClick={() => setShowBrandModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
              >
                <Plus className="w-4 h-4" /> Add Brand
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl border border-[#E8D6C9] bg-[#FAF7F5] flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-black">{b.name}</h4>
                    <span className="text-[10px] text-[#7A4E5A] uppercase font-semibold">{b.origin}</span>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{b.description}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block font-medium">{b.productCount} SKUs</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete brand ${b.name}?`)) deleteBrand(b.id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROMOTIONS & COUPONS */}
        {activeTab === 'promotions' && (
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-black">Discount Codes & Promotions</h2>
                <p className="text-xs text-gray-500">Live coupons redeemable during cart checkout</p>
              </div>
              <button
                onClick={() => setShowCouponModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
              >
                <Plus className="w-4 h-4" /> Create Coupon
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-5 rounded-2xl border border-[#DEC5C2] bg-[#FAF7F5] relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-black bg-white px-2.5 py-1 rounded-md border border-[#E8D6C9]">
                        {c.code}
                      </span>
                      <span className="text-xs font-bold text-[#7A4E5A]">
                        {c.discountPercent}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">{c.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Min Spend: Rs. {c.minSpend.toLocaleString()}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8D6C9] max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
            <h3 className="font-serif text-2xl font-bold text-black">
              {editingProduct ? 'Edit Product' : 'Add New Beauty SKU'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as CategoryType)}
                    className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs bg-white"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="K-Beauty">K-Beauty</option>
                    <option value="Treatments">Treatments</option>
                    <option value="Gift Sets">Gift Sets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Size / Net Volume</label>
                <input
                  type="text"
                  value={prodSize}
                  onChange={(e) => setProdSize(e.target.value)}
                  placeholder="e.g. 100ml / 50g"
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-black text-white font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8D6C9] space-y-4">
            <h3 className="font-serif text-xl font-bold text-black">
              Update Order #{selectedOrder.orderNumber}
            </h3>

            <form onSubmit={handleUpdateOrderStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] bg-white text-xs font-semibold"
                >
                  <option value="Pending">Pending Verification</option>
                  <option value="Processing">Processing & Packed</option>
                  <option value="Shipped">Dispatched / Shipped</option>
                  <option value="Delivered">Delivered (Completed)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Courier Partner</label>
                <input
                  type="text"
                  value={newCourier}
                  onChange={(e) => setNewCourier(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Courier Tracking Number</label>
                <input
                  type="text"
                  value={newTracking}
                  onChange={(e) => setNewTracking(e.target.value)}
                  placeholder="e.g. TCS-98210344"
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-black text-white font-bold"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8D6C9] space-y-4">
            <h3 className="font-serif text-xl font-bold text-black">Create Discount Coupon</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. GLOW15"
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs uppercase"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Discount %</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={couponDiscount}
                  onChange={(e) => setCouponDiscount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Minimum Spend (PKR)</label>
                <input
                  type="number"
                  required
                  value={couponMinSpend}
                  onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-black text-white font-bold"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Modal */}
      {showBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8D6C9] space-y-4">
            <h3 className="font-serif text-xl font-bold text-black">Add New Brand</h3>
            <form onSubmit={handleCreateBrand} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Innisfree"
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Origin Country</label>
                <input
                  type="text"
                  required
                  value={brandOrigin}
                  onChange={(e) => setBrandOrigin(e.target.value)}
                  placeholder="e.g. South Korea"
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Brand Description</label>
                <textarea
                  rows={2}
                  value={brandDesc}
                  onChange={(e) => setBrandDesc(e.target.value)}
                  placeholder="Brief brand story..."
                  className="w-full p-2.5 rounded-lg border border-[#E8D6C9] text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBrandModal(false)}
                  className="px-4 py-2 font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-black text-white font-bold"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
