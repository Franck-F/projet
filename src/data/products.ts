import { Product } from '../types';

const brands = ['Nike', 'Adidas', 'Puma', 'Converse', 'Vans', 'New Balance', 'Jordan', 'Reebok'];
const colors = ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Gris', 'Marron', 'Rose'];

// Tailles réalistes par catégorie
const menSizes = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
const womenSizes = [35, 36, 37, 38, 39, 40, 41, 42];
const kidsSizes = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

function generateRandomStock(size: number, category: string): number {
  // Stocks plus élevés pour les tailles courantes
  if (category === 'men' && [41, 42, 43, 44].includes(size)) return Math.floor(Math.random() * 20) + 5;
  if (category === 'women' && [37, 38, 39, 40].includes(size)) return Math.floor(Math.random() * 20) + 5;
  if (category === 'kids' && [28, 29, 30, 31, 32, 33, 34].includes(size)) return Math.floor(Math.random() * 15) + 3;
  
  // Stocks plus faibles pour les tailles extrêmes
  return Math.floor(Math.random() * 8) + 1;
}

function generateProductSizes(category: 'men' | 'women' | 'kids') {
  const sizes = category === 'men' ? menSizes : category === 'women' ? womenSizes : kidsSizes;
  return sizes.map(size => ({
    size,
    stock: generateRandomStock(size, category)
  }));
}

const menProducts = [
  'Air Force 1', 'Air Max 90', 'Air Jordan 1', 'Stan Smith', 'Gazelle', 'Ultraboost', 'Chuck Taylor',
  'Old Skool', 'Authentic', 'Suede Classic', 'RS-X', 'Gel-Kayano', '990v5', 'Fresh Foam', 'Club C',
  'Blazer Mid', 'Cortez', 'Dunk Low', 'Air Max 95', 'Air Max 97', 'Yeezy Boost', 'Superstar',
  'Forum Low', 'Continental 80', 'NMD R1', 'ZX 2K', 'Future Rider', 'Rider FV', 'Mirage Sport',
  'Thunder Spectra', 'Cell Endura', '574 Core', '327', 'X-90', '2002R', 'Nano X', 'Zig Kinetica'
];

const womenProducts = [
  'Air Force 1 Shadow', 'Air Max 270', 'Air Jordan 1 Low', 'Stan Smith W', 'Gazelle W', 'Ultraboost 22 W',
  'Chuck 70', 'Old Skool Platform', 'SK8-Hi', 'Suede Heart', 'Cali Sport', 'Gel-Quantum 180', '327 W',
  'Fresh Foam X', 'Club C Double', 'Blazer Low 77', 'Cortez W', 'Dunk Low Disrupt', 'Air Max 90 W',
  'Air Max 1 W', 'Falcon W', 'Superstar W', 'Forum Bold', 'Ozelia', 'Rivalry Low', 'ZX 22 Boost',
  'Mayze', 'Carina 2.0', 'Smash v2', 'Thunder Electric', 'Cali Dream', '57/40', 'XC-72', '2002R W',
  'Fresh Foam Arishi', 'Floatride Run', 'Zig Dynamica', 'Nano X1', 'Legacy Lifter'
];

const kidsProducts = [
  'Air Force 1 PS', 'Air Max SC PS', 'Revolution 6 PS', 'Stan Smith CF C', 'Grand Court CF C', 'RapidaRun K',
  'Chuck Taylor Star C', 'Old Skool V', 'Authentic Elastic', 'Suede AC PS', 'Smash v2 PS', 'R78 PS',
  'YV996', 'PV574', '327 PS', 'Fresh Foam Arishi PS', 'Reebok Royal Prime 2', 'Classic Leather PS',
  'Club C Revenge PS', 'Zig Dynamica PS', 'Air Max Bolt PS', 'Revolution 6 TD', 'Cortez Basic PS',
  'Dunk Low PS', 'Blazer Mid 77 PS', 'Gazelle CF C', 'Superstar CF C', 'Forum Low CF C', 'Tensaurus C',
  'Grand Court I', 'EQT Support CF C', 'ZX 2K Flux PS', 'Suede XL PS', 'Vikky v2 Ribbon AC PS',
  'Courtflex v2 PS', 'X-Ray 2 Square AC PS'
];

export const products: Product[] = [
  // Produits Hommes
  ...menProducts.map((name, index) => ({
    id: `men-${index + 1}`,
    name,
    brand: brands[index % brands.length],
    category: 'men' as const,
    price: Math.floor(Math.random() * 120) + 60,
    description: `Chaussure ${name} pour homme, confort et style garantis. Parfaite pour un usage quotidien avec des matériaux de qualité premium.`,
    image: `https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg`,
    sizes: generateProductSizes('men'),
    color: colors[index % colors.length],
    isActive: true,
    createdAt: new Date()
  })),
  
  // Produits Femmes
  ...womenProducts.map((name, index) => ({
    id: `women-${index + 1}`,
    name,
    brand: brands[index % brands.length],
    category: 'women' as const,
    price: Math.floor(Math.random() * 110) + 55,
    description: `Chaussure ${name} pour femme, élégance et confort réunis. Design moderne avec des finitions soignées pour toutes les occasions.`,
    image: `https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg`,
    sizes: generateProductSizes('women'),
    color: colors[index % colors.length],
    isActive: true,
    createdAt: new Date()
  })),
  
  // Produits Enfants
  ...kidsProducts.map((name, index) => ({
    id: `kids-${index + 1}`,
    name,
    brand: brands[index % brands.length],
    category: 'kids' as const,
    price: Math.floor(Math.random() * 70) + 30,
    description: `Chaussure ${name} pour enfant, sécurité et confort adaptés aux plus petits. Matériaux durables et designs colorés.`,
    image: `https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg`,
    sizes: generateProductSizes('kids'),
    color: colors[index % colors.length],
    isActive: true,
    createdAt: new Date()
  }))
];