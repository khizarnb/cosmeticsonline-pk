# CosmeticsOnline.pk — Premium Beauty E-Commerce Platform

Pakistan's premier luxury beauty destination for 100% authentic Korean skincare, international makeup, clinical haircare, and designer fragrances.

---

## 💎 Official Brand Identity & Design System

Built strictly following the official **CosmeticsOnline.pk Brand Identity Guide**:

### Brand Color Palette
- **Obsidian (`#000000`)**: Primary typography, high-impact buttons, navigation, and dark footer.
- **Ivory (`#F9F7F4`)**: Main website background, clean editorial canvas.
- **Nude (`#E8D6C9`)**: Product plinths, card borders, secondary cards, subtle dividers.
- **Rose Taupe (`#C8A5A1`)**: Accent backgrounds, promotional sections, trust icons.
- **Mauve (`#7A4E5A`)**: Special offers, badges, primary accents, review stars and highlights.

### Typography
- **Headings / UI / Buttons**: `Montserrat` (Clean modern geometric sans-serif)
- **Editorial Headings & Luxury Accents**: `Cormorant Garamond` (High-end editorial serif)

### Logo Variations
- **Primary Logo Lockup**: Intertwined `CO` monogram with 4-point sparkle star + `COSMETICSONLINE.PK` + subline `── SKINCARE • MAKEUP • HAIRCARE • FRAGRANCE ──`
- **Reversed Dark Logo**: Pure white and Rose Taupe on Obsidian `#000000`
- **Icon-Only Monogram**: Vector SVG badge with star

---

## 🚀 Technology Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS** (Configured with brand tokens)
- **Framer Motion** & Lucide Line Icons
- **React Router 7**

---

## 🛍 Complete Feature Architecture

### 1. Multi-Level Header & Navigation
- **Announcement Bar**: Black bar with 4 core trust guarantees:
  1. *100% Original Products*
  2. *Nationwide Delivery Across Pakistan*
  3. *Easy Returns Within 7 Days*
  4. *Secure & Multiple Payment Options*
- **Main Header**: Scalable vector logo, search bar trigger, user profile dropdown, wishlist badge, dynamic shopping bag counter.
- **Mega Menus**: Interactive category menus for **Brands**, **Skincare**, **Makeup**, **Haircare**, **Fragrance**, **K-Beauty**, **New Arrivals**, and highlighted **Offers**.
- **Search Modal**: Instant autocomplete suggestions, matching products preview, brand badges, and trending search pills.
- **Mobile Drawer**: Responsive slide-over navigation with complete category trees.

### 2. Complete 11-Section Homepage (Reference Fidelity)
1. **Hero Slider**: 3 distinct editorial slides with luxury beauty photography, typography lockup, and automatic rotation.
2. **Shop by Category**: 7 categories (*Skincare, Makeup, Haircare, Fragrance, K-Beauty, Treatments, Gift Sets*).
3. **Trending Bestsellers**: Category tabs (*All, Skincare, Makeup, Haircare, Fragrance*), discount tags, wishlist toggles, star ratings, and direct *Add to Bag*.
4. **Discover Top Brands**: Clean divider grid featuring *COSRX, The Ordinary, LANEIGE, Anua, Beauty of Joseon, MISSHA, d'Alba, Dear Klairs*.
5. **K-Beauty Promotional Banner**: Soft blush Korean skincare banner with cherry blossom aesthetics.
6. **New Arrivals**: Freshly curated international & K-Beauty arrivals.
7. **Shop by Concern**: 8 interactive concern pills (*Hydration, Brightening, Acne & Breakouts, Barrier Repair, Anti-Aging, Sun Protection, Hair Fall, Sensitive Skin*).
8. **Promotional Dual Banners**: Side-by-side *Up to 30% Off* and *Bundle & Save* sections.
9. **The Beauty Journal**: 3 editorial cards linking to in-depth skincare guides.
10. **Trust Benefits**: 5 guarantee badges with line icons.
11. **Newsletter Subscription**: Direct subscription bar with instant confirmation.
12. **Dark Obsidian Footer**: Comprehensive shop, help, about links, Pakistani payment logos, and social channels.

### 3. Collections & Multifaceted Filtering (`/collection/:categorySlug`)
- Price range slider up to Rs. 50,000+
- Multi-select Brand filters
- Skin Concern & Skin Type filters
- In-stock availability toggle
- Sorting: *Featured, Best Selling, New Arrivals, Price Low-High, Price High-Low, A–Z*
- Active filter badges with one-click removal and reset

### 4. Product Detail Page (PDP) (`/product/:productId`)
- Interactive image gallery with thumbnail selectors
- Brand link, product title, net volume, stock status
- Current PKR price, original price, discount % tag
- Quantity controls + *Add to Bag* + *Instant Buy Now* + *Wishlist* toggle
- 4 Tabbed specifications: *Key Benefits, How to Use, Full Ingredients, Specifications*
- Customer reviews breakdown with verified buyer badges + *Write a Review* form
- Frequently Bought Together / Related products carousel
- Mobile sticky bottom purchase bar

### 5. Brands Directory (`/brands` & `/brand/:brandSlug`)
- A–Z alphabetical navigation index
- Live brand search
- Featured brand showcases
- Brand story header, origin country badges, and brand-specific product catalogs

### 6. Cart & Wishlist Experiences
- **Slide-Over Cart Drawer**: Free shipping progress bar (Free delivery over Rs. 5,000), quantity controls, item removal, discount coupon box, dynamic subtotal and total.
- **Dedicated Cart Page (`/cart`)**: Item list, order notes input, coupon verification, shipping fees.
- **Wishlist Page (`/wishlist`)**: Saved products, one-click *Move All to Bag*, guest & member persistence.

### 7. Pakistani Checkout & Order Confirmation (`/checkout`)
- Contact information: Full Name, Email, Phone (+92)
- Nationwide delivery address: All Pakistani provinces (*Punjab, Sindh, KPK, Balochistan, Islamabad Capital Territory, Gilgit-Baltistan, AJK*) and major cities (*Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, etc.*)
- Payment options:
  - **Cash on Delivery (COD)**
  - **Direct Bank Transfer** (Meezan Bank / HBL / SCB account details)
  - **Debit / Credit Card (Visa / Mastercard / Raast)**
- Order Confirmation screen with generated Order Number (e.g. `CO-PK-89214`), printable receipt, and live tracking link.

### 8. Real-Time Order Tracking (`/track-order`)
- Track by Order ID or Courier Tracking number
- 5-stage live status pipeline:
  1. *Order Confirmed*
  2. *Packaged in Warehouse*
  3. *Dispatched to Courier (TCS / Leopard)*
  4. *Out for Delivery*
  5. *Delivered*

### 9. Customer Account Dashboard (`/account`)
- Dual-mode Sign In / Register with quick demo credentials
- Order history with tracking shortcuts
- Multiple saved shipping addresses with default address switcher

### 10. Store Admin Portal (`/admin`)
- Overview metrics: Gross Revenue, Total Orders, Average Order Value (AOV), Active SKUs
- **Products CRUD**: Create new product, live price edits, stock updates, image URLs, delete product
- **Orders Management**: Change status (*Pending, Processing, Shipped, Delivered, Cancelled*), assign TCS/Leopard courier tracking numbers
- **Brands Management**: Add/edit brands in the A–Z directory
- **Promotions Management**: Create and manage discount coupons (e.g. `BEAUTY10`, `GLOW20`)
- **Reset Storefront**: Single click reset to initial catalog data

---

## 🏃‍♂️ Getting Started

### Install Dependencies
```bash
npm.cmd install
```

### Start Development Server
```bash
npm.cmd run dev
```

### Build for Production
```bash
npm.cmd run build
```

---

© 2026 CosmeticsOnline.pk. All Rights Reserved.
