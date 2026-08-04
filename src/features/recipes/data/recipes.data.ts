import type { Recipe } from "../types/recipes.types";

/**
 * Data resep statis. Berperan sebagai "database" — 
 * akan diakses HANYA lewat recipeService, tidak diimport langsung oleh komponen.
 */

export const RecipeData : Recipe[] = [
    {id: 'r001',
    title: 'Terong Balado',
    description: 'Terong goreng disiram sambal balado pedas manis, cocok jadi lauk sehari-hari.',
    imageUrl: '/images/terong-balado.jpg',
    ingredients: [
      { name: 'Terong ungu', quantity: '3 buah' },
      { name: 'Cabai merah keriting', quantity: '10 buah' },
      { name: 'Bawang merah', quantity: '5 siung' },
      { name: 'Bawang putih', quantity: '3 siung' },
      { name: 'Tomat', quantity: '1 buah' },
      { name: 'Gula merah', quantity: '1 sdt' },
      { name: 'Garam', quantity: 'secukupnya' },
    ],
    steps: [
      'Potong terong memanjang, goreng hingga layu, tiriskan.',
      'Haluskan cabai, bawang merah, bawang putih, dan tomat.',
      'Tumis bumbu halus hingga matang dan harum.',
      'Masukkan terong goreng, aduk rata dengan bumbu.',
      'Tambahkan gula merah dan garam, masak sebentar hingga meresap.',
    ],
    cookingTimeMinutes: 30,
    servings: 3,
    category: 'main-course',
  },
  {
    id: 'r002',
    title: 'Sayur Asem Terong',
    description: 'Sayur bening asam segar dengan terong, kacang panjang, dan jagung manis.',
    imageUrl: '/images/sayur-asem.jpg',
    ingredients: [
      { name: 'Terong ungu', quantity: '1 buah' },
      { name: 'Kacang panjang', quantity: '5 batang' },
      { name: 'Jagung manis', quantity: '1 buah' },
      { name: 'Asam jawa', quantity: '2 sdm' },
      { name: 'Lengkuas', quantity: '1 ruas' },
      { name: 'Daun salam', quantity: '2 lembar' },
    ],
    steps: [
      'Rebus air bersama lengkuas dan daun salam hingga mendidih.',
      'Masukkan jagung, masak 5 menit.',
      'Tambahkan kacang panjang dan terong.',
      'Masukkan air asam jawa, garam, dan gula. Masak hingga sayur matang.',
    ],
    cookingTimeMinutes: 25,
    servings: 4,
    category: 'soup',
  },
  {
    id: 'r003',
    title: 'Ayam Goreng Lengkuas',
    description: 'Ayam goreng dengan aroma lengkuas dan bawang putih yang gurih.',
    imageUrl: '/images/ayam-goreng-lengkuas.jpg',
    ingredients: [
      { name: 'Ayam potong', quantity: '500 gram' },
      { name: 'Lengkuas', quantity: '2 ruas, memarkan' },
      { name: 'Bawang putih', quantity: '5 siung' },
      { name: 'Ketumbar bubuk', quantity: '1 sdt' },
      { name: 'Daun jeruk', quantity: '3 lembar' },
    ],
    steps: [
      'Haluskan bawang putih dan ketumbar, lumuri ke ayam.',
      'Rebus ayam bersama lengkuas dan daun jeruk hingga empuk dan bumbu meresap.',
      'Goreng ayam hingga kecokelatan.',
    ],
    cookingTimeMinutes: 40,
    servings: 4,
    category: 'main-course',
  },
  {
    id: 'r004',
    title: 'Es Kelapa Muda',
    description: 'Minuman segar kelapa muda dengan sirup dan es batu.',
    imageUrl: '/images/es-kelapa-muda.jpg',
    ingredients: [
      { name: 'Kelapa muda', quantity: '1 buah, kerok dagingnya' },
      { name: 'Sirup gula merah', quantity: '3 sdm' },
      { name: 'Es batu', quantity: 'secukupnya' },
    ],
    steps: [
      'Campurkan daging kelapa muda dengan air kelapa dalam gelas saji.',
      'Tambahkan sirup gula merah.',
      'Tambahkan es batu, aduk rata, sajikan dingin.',
    ],
    cookingTimeMinutes: 10,
    servings: 2,
    category: 'beverage',
  },
  {
    id: 'r005',
    title: 'Pisang Goreng Crispy',
    description: 'Pisang goreng dengan tepung crispy, renyah di luar dan lembut di dalam.',
    imageUrl: '/images/pisang-goreng.jpg',
    ingredients: [
      { name: 'Pisang kepok', quantity: '5 buah' },
      { name: 'Tepung terigu', quantity: '150 gram' },
      { name: 'Tepung beras', quantity: '50 gram' },
      { name: 'Air es', quantity: '150 ml' },
      { name: 'Minyak goreng', quantity: 'secukupnya' },
    ],
    steps: [
      'Campur tepung terigu, tepung beras, dan air es hingga jadi adonan agak kental.',
      'Potong pisang menjadi dua bagian memanjang.',
      'Celupkan pisang ke adonan, goreng hingga keemasan.',
    ],
    cookingTimeMinutes: 20,
    servings: 4,
    category: 'dessert',
  },
]