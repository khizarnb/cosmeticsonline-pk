import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Brand, Order, Coupon, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BRANDS, INITIAL_ORDERS, INITIAL_COUPONS } from '../data/mockData';

interface StoreDataContextType {
  products: Product[];
  brands: Brand[];
  orders: Order[];
  coupons: Coupon[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addBrand: (brand: Omit<Brand, 'id'>) => Brand;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courier?: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  resetToDefaultData: () => void;
  getProductById: (id: string) => Product | undefined;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'cosmetics_online_products_v1',
  BRANDS: 'cosmetics_online_brands_v1',
  ORDERS: 'cosmetics_online_orders_v1',
  COUPONS: 'cosmetics_online_coupons_v1',
};

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANDS);
      return saved ? JSON.parse(saved) : INITIAL_BRANDS;
    } catch {
      return INITIAL_BRANDS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      rating: prodData.rating || 5.0,
      reviewCount: prodData.reviewCount || 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const addBrand = (brandData: Omit<Brand, 'id'>): Brand => {
    const newBrand: Brand = {
      ...brandData,
      id: 'brand-' + Date.now(),
      productCount: brandData.productCount || 0,
    };
    setBrands((prev) => [...prev, newBrand]);
    return newBrand;
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((item) => item.id !== id));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: `CO-PK-${randomSuffix}`,
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      trackingNumber: orderData.paymentMethod === 'COD' ? `TCS-${randomSuffix}` : undefined,
      courier: 'TCS Express Pakistan',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock for ordered items
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const orderItem = orderData.items.find((item) => item.productId === p.id);
        if (orderItem) {
          const newQty = Math.max(0, p.stockQuantity - orderItem.quantity);
          return {
            ...p,
            stockQuantity: newQty,
            inStock: newQty > 0,
          };
        }
        return p;
      })
    );

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courier?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            trackingNumber: trackingNumber ?? o.trackingNumber,
            courier: courier ?? o.courier,
            paymentStatus: status === 'Delivered' ? 'Paid' : o.paymentStatus,
          };
        }
        return o;
      })
    );
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev.filter((c) => c.code !== coupon.code), coupon]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setBrands(INITIAL_BRANDS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BRANDS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.COUPONS);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        brands,
        orders,
        coupons,
        addProduct,
        updateProduct,
        deleteProduct,
        addBrand,
        updateBrand,
        deleteBrand,
        createOrder,
        updateOrderStatus,
        addCoupon,
        deleteCoupon,
        resetToDefaultData,
        getProductById,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
