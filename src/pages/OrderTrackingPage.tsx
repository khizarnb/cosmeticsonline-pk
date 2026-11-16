import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || '';
  const { orders } = useStoreData();

  const [orderQuery, setOrderQuery] = useState(urlOrderId);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (urlOrderId) {
      const match = orders.find(
        (o) => o.orderNumber.toLowerCase() === urlOrderId.trim().toLowerCase()
      );
      if (match) {
        setActiveOrder(match);
      }
      setSearched(true);
    }
  }, [urlOrderId, orders]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = orderQuery.trim().toUpperCase();
    const match = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.orderNumber.toUpperCase().includes(clean)
    );
    setActiveOrder(match || null);
    setSearched(true);
  };

  // Determine stage (0 to 4)
  const getStageIndex = (status: string) => {
    if (status === 'Delivered') return 4;
    if (status === 'Shipped') return 2;
    if (status === 'Processing') return 1;
    return 0; // Pending
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & verified by CosmeticsOnline' },
    { title: 'Packaged in Warehouse', desc: 'Temperature-controlled packing with QR seals' },
    { title: 'Dispatched to Courier', desc: 'Handed over to TCS / Leopard Express' },
    { title: 'Out for Delivery', desc: 'Rider is on the way to your doorstep' },
    { title: 'Delivered', desc: 'Successfully delivered to recipient' },
  ];

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Track Your Order</span>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> NATIONWIDE EXPRESS LOGISTICS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-black uppercase">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-sans">
            Enter your CosmeticsOnline.pk order number (e.g. <strong className="text-black">CO-PK-89214</strong>) to view real-time shipping updates.
          </p>

          {/* Search Box */}
          <form onSubmit={handleTrackSubmit} className="pt-4 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. CO-PK-89214)"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#E8D6C9] text-xs text-black uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors shadow-xs whitespace-nowrap"
            >
              Track Order
            </button>
          </form>
        </div>
      </div>

      {/* Order Status Display */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {searched && !activeOrder && (
          <div className="bg-white rounded-3xl p-10 border border-red-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-black">Order Not Found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              We couldn't locate an active order matching "<strong>{orderQuery}</strong>". Please verify the ID sent to your email or SMS. Try sample order ID <strong className="text-black">CO-PK-89214</strong>.
            </p>
          </div>
        )}

        {activeOrder && (
          <div className="bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D6C9] pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Tracking Active Shipment
                </span>
                <h2 className="font-serif text-2xl font-bold text-black">
                  Order #{activeOrder.orderNumber}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Placed on: {activeOrder.createdAt}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Courier Tracking #
                </span>
                <span className="font-bold text-black text-sm">{activeOrder.trackingNumber || 'Pending Assignment'}</span>
                <p className="text-[11px] text-[#7A4E5A] font-semibold">{activeOrder.courier || 'TCS Express Pakistan'}</p>
              </div>
            </div>

            {/* Step Progression Timeline */}
            <div className="py-4">
              <h3 className="font-serif text-lg font-bold text-black mb-6">Delivery Progress</h3>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8D6C9] space-y-8">
                {steps.map((step, idx) => {
                  const currentStage = getStageIndex(activeOrder.status);
                  const isCompleted = idx <= currentStage;
                  const isCurrent = idx === currentStage;

                  return (
                    <div key={idx} className="relative">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-[#7A4E5A] text-white shadow-xs'
                            : 'bg-white border-2 border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-black' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#FAF7F5] border border-[#E8D6C9] text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 block mb-1">
                  Recipient Destination
                </span>
                <p className="font-semibold text-black">{activeOrder.shippingAddress.fullName}</p>
                <p className="text-gray-600">{activeOrder.shippingAddress.addressLine}</p>
                <p className="text-gray-600">{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.province}</p>
                <p className="text-gray-600 mt-1">{activeOrder.shippingAddress.phone}</p>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 block mb-1">
                  Payment & Delivery Status
                </span>
                <p className="font-semibold text-black">Payment: {activeOrder.paymentMethod} ({activeOrder.paymentStatus})</p>
                <p className="text-gray-600 mt-1">Amount Due: <strong>Rs. {activeOrder.total.toLocaleString()}</strong></p>
                <div className="mt-2 flex items-center gap-1.5 text-green-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Insured against transit damage & leakage</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
