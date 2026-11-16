export type CategoryType = 
  | 'Skincare' 
  | 'Makeup' 
  | 'Haircare' 
  | 'Fragrance' 
  | 'K-Beauty' 
  | 'Treatments' 
  | 'Gift Sets';

export type SkinConcernType = 
  | 'Hydration' 
  | 'Brightening' 
  | 'Acne & Breakouts' 
  | 'Barrier Repair' 
  | 'Anti-Aging' 
  | 'Sun Protection' 
  | 'Hair Fall' 
  | 'Sensitive Skin';

export type SkinType = 
  | 'All Skin Types' 
  | 'Oily' 
  | 'Dry' 
  | 'Combination' 
  | 'Sensitive'
  | 'Normal'
  | 'Acne-Prone'
  | 'Dehydrated'
  | 'Mature'
  | 'Dull';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  subCategory?: string;
  size: string;
  price: number; // in PKR
  originalPrice?: number; // in PKR
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbnail: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockQuantity: number;
  skinType?: SkinType[];
  skinConcern?: SkinConcernType[];
  description: string;
  keyBenefits: string[];
  howToUse: string;
  ingredients: string;
  specifications?: Record<string, string>;
  reviews?: Review[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  origin: string;
  logoUrl?: string;
  bannerUrl: string;
  description: string;
  isFeatured: boolean;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  description: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'COD' | 'BankTransfer' | 'Card';
export type PaymentStatus = 'Pending' | 'Paid' | 'Cash on Delivery';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: Address;
  customerEmail: string;
  customerNotes?: string;
  trackingNumber?: string;
  courier?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
}

export interface FilterState {
  category?: CategoryType | 'All';
  brand: string[];
  minPrice: number;
  maxPrice: number;
  skinType: string[];
  skinConcern: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'bestselling' | 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';
}
