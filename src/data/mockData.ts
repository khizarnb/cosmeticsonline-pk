import { Product, Brand, BlogPost, Coupon, Order } from '../types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'cosrx',
    name: 'COSRX',
    slug: 'cosrx',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    description: 'COSRX is a cult-favourite Korean skincare brand focused on high-concentration active ingredients and gentle, effective formulations for sensitive and acne-prone skin.',
    isFeatured: true,
    productCount: 14,
  },
  {
    id: 'the-ordinary',
    name: 'The Ordinary',
    slug: 'the-ordinary',
    origin: 'Canada',
    bannerUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
    description: 'Clinical formulations with integrity. The Ordinary offers targeted, science-backed treatments at accessible price points.',
    isFeatured: true,
    productCount: 18,
  },
  {
    id: 'laneige',
    name: 'LANEIGE',
    slug: 'laneige',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    description: 'Global water science leader renowned for barrier-boosting moisture and world-famous Lip Sleeping Masks.',
    isFeatured: true,
    productCount: 12,
  },
  {
    id: 'anua',
    name: 'Anua',
    slug: 'anua',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=1200&auto=format&fit=crop',
    description: 'Simple, pure formulations starring soothing natural ingredients like Heartleaf to bring peace and calm to irritated skin.',
    isFeatured: true,
    productCount: 8,
  },
  {
    id: 'beauty-of-joseon',
    name: 'Beauty of Joseon',
    slug: 'beauty-of-joseon',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    description: 'Reinterpreting traditional Korean Hanbang herbal wisdom with modern dermatological science for radiant, glass-like skin.',
    isFeatured: true,
    productCount: 11,
  },
  {
    id: 'missha',
    name: 'MISSHA',
    slug: 'missha',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    description: 'Pioneers in high-efficacy anti-aging ampoules and BB creams, loved across Asia for over two decades.',
    isFeatured: true,
    productCount: 9,
  },
  {
    id: 'dalba',
    name: "d'Alba",
    slug: 'dalba',
    origin: 'South Korea & Italy',
    bannerUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d99cece2?q=80&w=1200&auto=format&fit=crop',
    description: 'Luxurious Italian White Truffle infused glow skincare and the globally viral First Spray Serum.',
    isFeatured: true,
    productCount: 6,
  },
  {
    id: 'klairs',
    name: 'Dear Klairs',
    slug: 'klairs',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1556228722-d0b77b7f1e63?q=80&w=1200&auto=format&fit=crop',
    description: 'Simple but enough. Cruelty-free, vegan-friendly skincare meticulously crafted for even the most reactive skin.',
    isFeatured: true,
    productCount: 7,
  },
  {
    id: 'skin1004',
    name: 'Skin1004',
    slug: 'skin1004',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1200&auto=format&fit=crop',
    description: 'Pure Centella Asiatica harvested from the untouched nature of Madagascar for ultimate barrier relief and healing.',
    isFeatured: false,
    productCount: 5,
  },
  {
    id: 'round-lab',
    name: 'Round Lab',
    slug: 'round-lab',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1200&auto=format&fit=crop',
    description: 'Clean K-Beauty formulated with natural mineral-rich Korean ingredients such as Inje Silver Birch Sap and Dokdo Island deep sea water.',
    isFeatured: false,
    productCount: 6,
  },
  {
    id: 'romand',
    name: 'Rom&nd',
    slug: 'romand',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop',
    description: 'Trendy Korean cosmetics brand famous for viral lip tints, soft matte cushion compacts, and editorial eye palettes.',
    isFeatured: false,
    productCount: 8,
  },
  {
    id: 'torriden',
    name: 'Torriden',
    slug: 'torriden',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop',
    description: 'Award-winning low molecular hyaluronic acid treatments focused on deep hydration without heaviness.',
    isFeatured: false,
    productCount: 4,
  },
  {
    id: 'dr-althea',
    name: 'Dr. Althea',
    slug: 'dr-althea',
    origin: 'South Korea',
    bannerUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    description: 'Dermatological relief treatments designed to restore compromised moisture barriers and soothe redness.',
    isFeatured: false,
    productCount: 4,
  },
  {
    id: 'olaplex',
    name: 'Olaplex',
    slug: 'olaplex',
    origin: 'USA',
    bannerUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop',
    description: 'Patented bond-building hair technology that repairs extreme damage from chemical treatments and heat styling.',
    isFeatured: false,
    productCount: 5,
  },
  {
    id: 'dior',
    name: 'Dior',
    slug: 'dior',
    origin: 'France',
    bannerUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    description: 'Legendary French haute couture house presenting timeless luxury fragrances, skincare and runway makeup.',
    isFeatured: false,
    productCount: 6,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'cosrx-snail-96',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Skincare',
    subCategory: 'Essences & Serums',
    size: '100ml',
    price: 5520,
    originalPrice: 6900,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 2317,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 45,
    skinType: ['All Skin Types', 'Dry', 'Combination', 'Sensitive'],
    skinConcern: ['Hydration', 'Barrier Repair', 'Acne & Breakouts'],
    description: 'Enriched with 96.3% skin-boosting snail secretion filtrate, this lightweight essence nourishes, repairs, and revitalizes dry and depleted skin without feeling sticky. Provides deep moisture, accelerates recovery from acne scars, and bestows an unmistakable dewy glow.',
    keyBenefits: [
      '96.3% Snail Secretion Filtrate for deep cellular repair',
      'Fades dark spots and improves skin texture',
      'Plumps skin with lasting moisture without clogging pores',
      'Hypoallergenic, fragrance-free, and dermatologist-tested'
    ],
    howToUse: 'After cleansing and toning, dispense 2-3 pumps onto palms and gently pat across the face and neck until fully absorbed. Follow with your favourite moisturizer.',
    ingredients: 'Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Ethyl Hexanediol, Carbomer, Panthenol, Arginine.',
    specifications: {
      'Volume': '100ml / 3.38 fl. oz.',
      'Country of Origin': 'South Korea',
      'Formulation': 'Lightweight gel-essence',
      'Authenticity': '100% Genuine with Original QR Security Seal'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Ayesha Malik (Lahore)',
        rating: 5,
        date: '14 Nov 2026',
        title: 'Miracle worker for dry acne-prone skin!',
        comment: 'I ordered from CosmeticsOnline.pk and received genuine product with batch code in 2 days. My skin has never looked so smooth and hydrated.',
        verifiedBuyer: true
      },
      {
        id: 'r2',
        author: 'Zainab Khan (Karachi)',
        rating: 5,
        date: '02 Nov 2026',
        title: 'Authentic product, fast delivery',
        comment: '100% authentic COSRX. In Karachi humidity it hydrates without any greasy film. Must have!',
        verifiedBuyer: true
      }
    ]
  },
  {
    id: 'laneige-lip-sleeping-mask',
    name: 'Lip Sleeping Mask (Berry)',
    brand: 'LANEIGE',
    category: 'Skincare',
    subCategory: 'Lip Care',
    size: '20g',
    price: 4675,
    originalPrice: 5500,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 4102,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 60,
    skinType: ['All Skin Types'],
    skinConcern: ['Hydration', 'Sensitive Skin'],
    description: 'An iconic leave-on overnight lip mask that melts away dead skin cells and delivers intensive moisture with its Berry Fruit Complex™, Vitamin C, and coconut oil infusion for baby-soft, plumper lips by morning.',
    keyBenefits: [
      'Berry Fruit Complex™ rich in antioxidants',
      'Moisture Wrap™ technology locks in hydration all night',
      'Eliminates chapping, flakiness, and roughness in one sleep',
      'Sweet berry aroma with spatula included'
    ],
    howToUse: 'Before going to bed, apply an adequate amount to the lips using the included spatula. Gently wipe clean with a tissue or cotton pad the next morning.',
    ingredients: 'Diisostearyl Malate, Hydrogenated Polyisobutene, Phytosteryl/Isostearyl/Cetyl/Stearyl/Behenyl Dimer Dilinoleate, Polybutene, Shea Butter, Synthetic Wax, Candelilla Cera, Astrocaryum Murumuru Seed Butter, Raspberry/Strawberry/Cranberry Fruit Extracts.',
    specifications: {
      'Net Weight': '20g',
      'Flavour': 'Sweet Berry',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'ordinary-niacinamide-zinc',
    name: 'Niacinamide 10% + Zinc 1% Serum',
    brand: 'The Ordinary',
    category: 'Skincare',
    subCategory: 'Serums',
    size: '30ml',
    price: 3350,
    originalPrice: 4450,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 6441,
    images: [
      'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 80,
    skinType: ['Oily', 'Combination', 'All Skin Types'],
    skinConcern: ['Acne & Breakouts', 'Brightening'],
    description: 'A high-strength vitamin and mineral blemish formula that visibly targets skin blemishes, controls excess sebum secretion, and refines enlarged pores.',
    keyBenefits: [
      '10% pure Niacinamide (Vitamin B3) for clarity & tone',
      '1% Zinc PCA to balance visible sebum activity',
      'Helps prevent future congestion and breakouts',
      'Water-based lightweight serum'
    ],
    howToUse: 'Apply a few drops to the entire face morning and evening before heavier creams. If irritation occurs, cease use and consult a physician.',
    ingredients: 'Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.',
    specifications: {
      'Volume': '30ml',
      'pH': '5.0 - 6.5',
      'Origin': 'Canada'
    }
  },
  {
    id: 'anua-heartleaf-77-toner',
    name: 'Heartleaf 77% Soothing Toner',
    brand: 'Anua',
    category: 'Skincare',
    subCategory: 'Toners',
    size: '250ml',
    price: 4950,
    originalPrice: 5500,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 1935,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228722-d0b77b7f1e63?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 34,
    skinType: ['Sensitive', 'Acne-Prone', 'All Skin Types'],
    skinConcern: ['Acne & Breakouts', 'Sensitive Skin', 'Barrier Repair'],
    description: 'Korea’s #1 viral soothing toner formulated with 77% Houttuynia Cordata Extract to calm irritation, cool inflamed breakouts, and restore moisture balance.',
    keyBenefits: [
      '77% Heartleaf extract grown and harvested in Korea',
      'Immediately reduces redness and heat sensations',
      'Sub-acidic pH 5.5 to protect the acid mantle',
      'Non-comedogenic tested, zero sticky residue'
    ],
    howToUse: 'After cleansing, pour onto a cotton pad and gently swipe across the skin, or pour onto palms and pat in layers for the 7-skin method.',
    ingredients: 'Houttuynia Cordata Extract (77%), Purified Water, 1,2-Hexanediol, Glycerin, Betaine, Panthenol, Saccharum Officinarum (Sugarcane) Extract, Portulaca Oleracea Extract, Butylene Glycol, Vitex Agnus-Castus Extract, Chamomilla Recutita (Matricaria) Flower Extract.',
    specifications: {
      'Volume': '250ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'boj-relief-sun-rice-probiotics',
    name: 'Relief Sun: Rice + Probiotics SPF50+ PA++++',
    brand: 'Beauty of Joseon',
    category: 'Skincare',
    subCategory: 'Sun Care',
    size: '50ml',
    price: 4800,
    originalPrice: 6000,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 7214,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 95,
    skinType: ['All Skin Types', 'Dry', 'Combination', 'Sensitive'],
    skinConcern: ['Sun Protection', 'Brightening', 'Hydration'],
    description: 'A lightweight, moisturizing organic sunscreen that feels just like a soothing face lotion. Packed with 30% Rice Extract and grain fermented probiotics to nourish skin while delivering broad-spectrum SPF 50+ protection without white cast or pilling.',
    keyBenefits: [
      'SPF 50+ PA++++ broad spectrum UVA & UVB protection',
      '30% Rice Extract + Grain Fermented Extracts for hydration and brightness',
      'Zero white cast, zero stickiness, no burning around eyes',
      'Beautiful dewy finish that sits flawlessly under makeup'
    ],
    howToUse: 'At the final step of morning skincare, spread evenly across the face, neck, and ears 15 minutes before sun exposure. Reapply every 2 hours during direct outdoor activity.',
    ingredients: 'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-benzotriazolyl Tetramethylbutylphenol, Coco-caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin.',
    specifications: {
      'Volume': '50ml',
      'SPF Rating': 'SPF50+ PA++++',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'skin1004-centella-ampoule',
    name: 'Madagascar Centella Ampoule',
    brand: 'Skin1004',
    category: 'Skincare',
    subCategory: 'Ampoules',
    size: '55ml',
    price: 5250,
    originalPrice: 5900,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 942,
    images: [
      'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-bb43640b3c66?q=80&w=800&auto=format&fit=crop',
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 28,
    skinType: ['Sensitive', 'All Skin Types'],
    skinConcern: ['Barrier Repair', 'Sensitive Skin', 'Hydration'],
    description: 'Contains 100% pure Centella Asiatica Extract from Madagascar. Immediately calms sensitized skin, balances sebum, and locks in essential hydration for compromised skin barriers.',
    keyBenefits: [
      'Single-ingredient formulation: 100% pure Centella Asiatica',
      'Soothes irritated skin and acne redness quickly',
      'Watery texture that absorbs in seconds with zero residue'
    ],
    howToUse: 'Drop an appropriate amount with the dropper onto the face and pat gently into the skin until absorbed.',
    ingredients: '100% Centella Asiatica Extract.',
    specifications: {
      'Volume': '55ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'round-lab-birch-cream',
    name: 'Birch Juice Moisturizing Cream',
    brand: 'Round Lab',
    category: 'Skincare',
    subCategory: 'Moisturizers',
    size: '80ml',
    price: 4950,
    originalPrice: 5600,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 1104,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 32,
    skinType: ['All Skin Types', 'Dehydrated', 'Combination'],
    skinConcern: ['Hydration', 'Barrier Repair'],
    description: 'Enriched with Inje Silver Birch Sap and Vita Hyaluronic Acid to create a 48-hour moisture barrier without feeling greasy or heavy.',
    keyBenefits: [
      'Inje Birch Sap rich in 17 amino acids & minerals',
      'Vita Hyaluronic acid capsules melt seamlessly into the skin',
      'Non-sticky refreshing gel-cream formula'
    ],
    howToUse: 'Apply as the final moisturizing step in your morning and evening skincare routine.',
    ingredients: 'Water, Glycerin, Isononyl Isononanoate, Isododecane, Betula Platyphylla Japonica Juice (10,000ppm), Betaine, Glucose, Xylitol.',
    specifications: {
      'Volume': '80ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'romand-juicy-lasting-tint',
    name: 'Juicy Lasting Tint (#06 Figfig)',
    brand: 'Rom&nd',
    category: 'Makeup',
    subCategory: 'Lips',
    size: '5.5g',
    price: 2850,
    originalPrice: 3200,
    discountPercent: 11,
    rating: 4.7,
    reviewCount: 3120,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 50,
    skinType: ['All Skin Types'],
    skinConcern: [],
    description: 'A 3-in-1 lip tint that coats lips with a luscious, candied tanghulu gloss. Figfig is a chic, muted MLBB fig shade that suits all Pakistani skin tones.',
    keyBenefits: [
      'Glossy syrup shine that doesn’t feel sticky',
      'Leaves a long-lasting tint even after drinking/eating',
      'Rich in fruit extract to keep lips hydrated'
    ],
    howToUse: 'Apply gently from inside the lips toward the outer corners. Wait 30 seconds for the glossy glaze layer to set.',
    ingredients: 'Dimethicone, Cyclopentasiloxane, Polyglyceryl-2 Triisostearate, Titanium Dioxide, Iron Oxides, Kiwi Extract, Papaya Extract.',
    specifications: {
      'Shade': '#06 Figfig (Muted MLBB)',
      'Weight': '5.5g',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'torriden-dive-in-serum',
    name: 'Dive-In Low Molecule Hyaluronic Acid Serum',
    brand: 'Torriden',
    category: 'Skincare',
    subCategory: 'Serums',
    size: '50ml',
    price: 5400,
    originalPrice: 6200,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 1650,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    isNewArrival: true,
    inStock: true,
    stockQuantity: 24,
    skinType: ['All Skin Types', 'Dehydrated', 'Oily'],
    skinConcern: ['Hydration', 'Barrier Repair'],
    description: 'Infused with 5D-Complex Hyaluronic Acid of differing molecular sizes to quench inner skin dehydration and plump from within.',
    keyBenefits: [
      '5 kinds of multi-molecular hyaluronic acids',
      'Pastel blue natural hue derived from Malachite extract',
      'Instant absorption with no tacky residue'
    ],
    howToUse: 'Dispense 3-5 drops onto cleansed face and gently pat in until completely absorbed.',
    ingredients: 'Water, Butylene Glycol, Glycerin, Dipropylene Glycol, 1,2-Hexanediol, Betaine, Hydrolyzed Hyaluronic Acid, Malachite Extract.',
    specifications: {
      'Volume': '50ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'dr-althea-345-relief-cream',
    name: '345 Relief Cream',
    brand: 'Dr. Althea',
    category: 'Skincare',
    subCategory: 'Moisturizers',
    size: '50ml',
    price: 4950,
    originalPrice: 5800,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    isNewArrival: true,
    inStock: true,
    stockQuantity: 19,
    skinType: ['Acne-Prone', 'Sensitive', 'Combination'],
    skinConcern: ['Acne & Breakouts', 'Barrier Repair', 'Sensitive Skin'],
    description: 'Formulated with Resveratrol, Panthenol, and Opuntia Ficus-Indica to relieve post-blemish red marks and fortify skin defenses.',
    keyBenefits: [
      'Multi-action soothing gel-cream for post-acne marks',
      'Calms stinging and inflammation',
      'Non-greasy, fast absorbing texture'
    ],
    howToUse: 'Apply a dime-sized amount to areas with redness or across the full face morning and night.',
    ingredients: 'Water, Glycerin, Niacinamide, Panthenol, Resveratrol, Centella Asiatica Extract, Opuntia Ficus-Indica Stem Extract.',
    specifications: {
      'Volume': '50ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'olaplex-no-7-bonding-oil',
    name: 'No. 7 Bonding Oil',
    brand: 'Olaplex',
    category: 'Haircare',
    subCategory: 'Hair Oils & Serums',
    size: '30ml',
    price: 8500,
    originalPrice: 9500,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 2840,
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    inStock: true,
    stockQuantity: 20,
    skinType: [],
    skinConcern: ['Hair Fall'],
    description: 'A highly-concentrated, weightless reparative styling oil that dramatically increases shine, softness, and color vibrancy while minimizing flyaways and protecting from heat up to 450°F/232°C.',
    keyBenefits: [
      'Repairs damaged bonds within hair strands',
      'Heat protection up to 450°F / 232°C',
      'Instantly tames frizz and adds radiant mirror shine'
    ],
    howToUse: 'Turn bottle upside down and gently tap index finger on the bottom of the bottle to dispense a metered drop. Apply to wet or dry hair before styling.',
    ingredients: 'Dimethicone, Isohexadecane, C13-14 Isoparaffin, Coco-Caprylate, Phenyl Trimethicone, Bis-Aminopropyl Diglycol Dimaleate, Propanediol.',
    specifications: {
      'Volume': '30ml',
      'Origin': 'USA'
    }
  },
  {
    id: 'missha-time-revolution-ampoule',
    name: 'Time Revolution Night Repair Ampoule 5X',
    brand: 'MISSHA',
    category: 'Skincare',
    subCategory: 'Anti-Aging',
    size: '50ml',
    price: 6500,
    originalPrice: 7800,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockQuantity: 25,
    skinType: ['All Skin Types', 'Mature', 'Dry'],
    skinConcern: ['Anti-Aging', 'Brightening', 'Barrier Repair'],
    description: 'Korea’s celebrated anti-aging serum powered by 77.2% Extreme Biome™ (combining 10 different fermented ingredients) to firm, plump, and deeply rejuvenate tired skin overnight.',
    keyBenefits: [
      'Extreme Biome™ fermented complex for youthful bounce',
      'Visibly reduces fine lines and dullness',
      'Deeply nourishing for mature and dehydrated skin'
    ],
    howToUse: 'Apply at night after toner. Smooth across face and neck with gentle upward pressing motions.',
    ingredients: 'Bifida Ferment Lysate, Butylene Glycol, Glycerin, Propanediol, Betaine, Niacinamide, Pentylene Glycol, 1,2-Hexanediol.',
    specifications: {
      'Volume': '50ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'dalba-white-truffle-first-spray',
    name: 'White Truffle First Spray Serum',
    brand: "d'Alba",
    category: 'Skincare',
    subCategory: 'Mists & Sprays',
    size: '100ml',
    price: 7200,
    originalPrice: 8500,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 3820,
    images: [
      'https://images.unsplash.com/photo-1512290900672-1f41d99cece2?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1512290900672-1f41d99cece2?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    inStock: true,
    stockQuantity: 30,
    skinType: ['All Skin Types', 'Dry', 'Dull'],
    skinConcern: ['Hydration', 'Brightening', 'Anti-Aging'],
    description: 'The world-famous yellow biphase spray serum featuring Italian White Truffle extract and Avocado oil. Shaken before use, it delivers an instant luxury glass-skin mist anytime, anywhere.',
    keyBenefits: [
      'Dual-layer formulation with plant oils and nutrient serum',
      'Infused with premium Italian White Truffle',
      'Use as toner, setting spray, or mid-day moisture booster'
    ],
    howToUse: 'Shake well 3-5 times to blend the oil and serum layers. Close eyes and mist 10-20 cm away from the face.',
    ingredients: 'Water, Dipropylene Glycol, Neopentyl Glycol Diheptanoate, 1,2-Hexanediol, Niacinamide, Tuber Magnatum Extract (White Truffle), Persea Gratissima (Avocado) Oil, Helianthus Annuus (Sunflower) Seed Oil.',
    specifications: {
      'Volume': '100ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'dior-sauvage-edp',
    name: 'Sauvage Eau De Parfum',
    brand: 'Dior',
    category: 'Fragrance',
    subCategory: 'Men',
    size: '100ml',
    price: 42000,
    originalPrice: 48000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    inStock: true,
    stockQuantity: 12,
    skinType: [],
    skinConcern: [],
    description: 'An intensely fresh composition, dictated by a name that has the ring of a manifesto. Raw and noble all at once with radiant Calabrian bergamot and Papua New Guinean vanilla absolute.',
    keyBenefits: [
      '100% Authentic imported fragrance batch verified',
      'Top notes of Bergamot and spicy Sichuan Pepper',
      'Long-lasting sillage over 12+ hours'
    ],
    howToUse: 'Spray onto pulse points: wrists, inner elbows, and base of neck.',
    ingredients: 'Alcohol, Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Ethylhexyl Methoxycinnamate, Citronellol, Coumarin.',
    specifications: {
      'Concentration': 'Eau De Parfum (EDP)',
      'Volume': '100ml',
      'Origin': 'France'
    }
  },
  {
    id: 'boj-glow-serum-propolis',
    name: 'Glow Serum: Propolis + Niacinamide',
    brand: 'Beauty of Joseon',
    category: 'Skincare',
    subCategory: 'Serums',
    size: '30ml',
    price: 4200,
    originalPrice: 5000,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 4210,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    isBestseller: true,
    inStock: true,
    stockQuantity: 40,
    skinType: ['All Skin Types', 'Acne-Prone', 'Dull'],
    skinConcern: ['Brightening', 'Acne & Breakouts', 'Hydration'],
    description: 'Created specifically for inflamed, enlarged pore skin. 60% Propolis Extract and 2% Niacinamide combat redness, regulate sebum, and unveil healthy honey-dew glow.',
    keyBenefits: [
      '60% Propolis Extract naturally calms blemishes',
      '2% Niacinamide tightens pores and brightens',
      'Lotus corniculatus seed extract for gentle refinement'
    ],
    howToUse: 'Apply 2-3 drops to the face after toning and massage gently.',
    ingredients: 'Propolis Extract, Dipropylene Glycol, Glycerin, Butylene Glycol, Water, Niacinamide, 1,2-Hexanediol, Sodium Hyaluronate.',
    specifications: {
      'Volume': '30ml',
      'Origin': 'South Korea'
    }
  },
  {
    id: 'luxury-kbeauty-routine-box',
    name: 'The Glass Skin Ritual Box',
    brand: 'CosmeticsOnline.pk',
    category: 'Gift Sets',
    subCategory: 'Curated Sets',
    size: '4 Full Size Products',
    price: 18500,
    originalPrice: 22500,
    discountPercent: 18,
    rating: 5.0,
    reviewCount: 320,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    inStock: true,
    stockQuantity: 15,
    skinType: ['All Skin Types'],
    skinConcern: ['Hydration', 'Brightening', 'Barrier Repair'],
    description: 'An exclusive luxury gift box containing our 4 best-selling Korean skincare products: Anua Heartleaf Toner (250ml), COSRX Snail Essence (100ml), Beauty of Joseon Glow Serum (30ml), and BOJ Relief Sun SPF50+ (50ml), presented in a premium embossed keepsake gift box.',
    keyBenefits: [
      'Complete 4-step glass skin routine in full sizes',
      'Saves 18% compared to buying items individually',
      'Packaged in an elegant luxury ribbon box with satin liner'
    ],
    howToUse: 'Follow steps 1-4: Cleanse -> Toner -> Essence -> Serum -> Sunscreen (AM).',
    ingredients: 'See individual product listings for full ingredient breakdowns.',
    specifications: {
      'Contents': '4 Full Size Products',
      'Packaging': 'Collector’s Luxury Ribbon Gift Box'
    }
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Skincare 101: Build a Routine That Works for Your Skin',
    slug: 'skincare-101-build-routine',
    excerpt: 'Understanding your true skin barrier type, active ingredient synergies, and how to create a simple yet transformative AM/PM routine.',
    content: `
      Achieving healthy, radiant skin doesn't require an overwhelming 10-step shelf of mystery bottles. In fact, over-exfoliation and incompatible layering are the leading causes of sensitized skin barriers in Pakistan.
      
      ### Step 1: Gentle Cleansing
      Never strip your skin of its protective acid mantle with harsh sulfate bars. A low-pH gel cleanser preserves essential ceramides and lipids.
      
      ### Step 2: Hydration & Barrier Support
      Hydrators like Centella Asiatica, Snail Mucin, and Hyaluronic Acid attract moisture into the deep stratum corneum, creating resilience against environmental pollution and heat.
      
      ### Step 3: Targeted Actives
      Apply Niacinamide or Vitamin C in the morning for environmental defense and brightening. Reserve retinoids or AHAs for evening renewal.
      
      ### Step 4: Broad Spectrum Sun Protection
      The single most effective anti-aging step you can take. Modern Korean chemical sunscreens feel like weightless moisturizers with zero white cast.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read',
    date: '12 Nov 2026',
    author: 'Aiman Farooq (CosmeticsOnline Beauty Editor)',
    category: 'Skincare Advice'
  },
  {
    id: 'post-2',
    title: 'Healthy Hair Habits for Stronger, Shinier Hair',
    slug: 'healthy-hair-habits',
    excerpt: 'How to combat hard water damage, humidity frizz, and split ends using bond repair oils and scalp massage techniques.',
    content: `
      Hair health starts at the follicle and is heavily affected by hard municipal tap water and extreme seasonal changes across Pakistani cities.
      
      ### 1. Hard Water Protection
      Chlorine and heavy metals precipitate onto hair strands, making them brittle and dry. Use a clarifying shampoo once a fortnight followed by an intensive protein or bonding mask.
      
      ### 2. The Power of Bond Building
      Unlike traditional silicone serums that coat the hair superficially, patented bond-building treatments like Olaplex actively re-link broken disulfide bonds damaged by chemical bleaching and heat styling.
      
      ### 3. Scalp Care is Skincare
      Gently stimulate circulation with rosemary-infused scalp oil treatments 1 hour before showering. Healthy hair roots produce thicker, more resilient growth.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
    date: '08 Nov 2026',
    author: 'Sana Qureshi (Trichology Contributor)',
    category: 'Haircare'
  },
  {
    id: 'post-3',
    title: 'Lip Trends to Try This Season',
    slug: 'lip-trends-to-try',
    excerpt: 'From high-shine glazed syrup tints to blurred velvety blushes: here are the most requested lip finishes for Pakistani weddings and casual outings.',
    content: `
      Heavy, dehydrating liquid lipsticks have taken a backseat. 2026 is all about plush, juicy dimensions, effortless watercolor stains, and deeply nourished lips.
      
      ### The Glazed Tanghulu Finish
      Originating from Seoul's street fashion districts, this look pairs a muted nude-mauve stain with a high-refraction mirror glaze that makes lips look instantly pillowy.
      
      ### Overnight Mask Prepping
      The secret to seamless application is waking up with smooth lips. Generously coat your lips with antioxidant berry sleeping masks every evening before rest.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    readTime: '3 min read',
    date: '01 Nov 2026',
    author: 'CosmeticsOnline Beauty Team',
    category: 'Makeup & Trends'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEAUTY10',
    discountPercent: 10,
    minSpend: 3000,
    description: 'Get 10% off your entire order (Min spend Rs. 3,000)'
  },
  {
    code: 'GLOW20',
    discountPercent: 20,
    minSpend: 10000,
    description: 'Enjoy 20% off luxury skincare routines on orders over Rs. 10,000'
  },
  {
    code: 'FIRSTORDER',
    discountPercent: 15,
    minSpend: 4000,
    description: 'Welcome discount: 15% off your very first order'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'CO-PK-89214',
    createdAt: '15 Nov 2026, 04:30 PM',
    status: 'Processing',
    paymentStatus: 'Cash on Delivery',
    paymentMethod: 'COD',
    items: [
      {
        productId: 'cosrx-snail-96',
        productName: 'Advanced Snail 96 Mucin Power Essence',
        brand: 'COSRX',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
        price: 5520,
        quantity: 1,
        size: '100ml'
      },
      {
        productId: 'laneige-lip-sleeping-mask',
        productName: 'Lip Sleeping Mask (Berry)',
        brand: 'LANEIGE',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
        price: 4675,
        quantity: 1,
        size: '20g'
      }
    ],
    subtotal: 10195,
    discount: 1019,
    shippingFee: 0,
    total: 9176,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Fatima Tariq',
      phone: '+92 321 8456789',
      addressLine: 'House 42-B, Street 7, Phase 5, DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000',
      isDefault: true
    },
    customerEmail: 'fatima.tariq@gmail.com',
    customerNotes: 'Please deliver between 2 PM and 6 PM',
    trackingNumber: 'TCS-89301824',
    courier: 'TCS Express Pakistan'
  },
  {
    id: 'ord-100',
    orderNumber: 'CO-PK-87652',
    createdAt: '10 Nov 2026, 11:15 AM',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    items: [
      {
        productId: 'boj-relief-sun-rice-probiotics',
        productName: 'Relief Sun: Rice + Probiotics SPF50+ PA++++',
        brand: 'Beauty of Joseon',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        price: 4800,
        quantity: 2,
        size: '50ml'
      }
    ],
    subtotal: 9600,
    discount: 0,
    shippingFee: 0,
    total: 9600,
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Hamza Siddiqui',
      phone: '+92 300 2345678',
      addressLine: 'Apartment 402, Clifton View Towers, Block 2',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75600',
      isDefault: true
    },
    customerEmail: 'hamza.siddiqui@yahoo.com',
    trackingNumber: 'LEO-44912093',
    courier: 'Leopard Courier'
  }
];
