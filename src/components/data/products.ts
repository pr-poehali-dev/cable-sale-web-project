import { CableProduct } from '../types';

export const products: CableProduct[] = [
  {
    id: 1,
    name: 'ВВГ 3x1.5',
    section: '1.5 мм²',
    material: 'Медь',
    purpose: 'Силовой',
    pricePerMeter: 45,
    stock: 2500,
    image: '/placeholder.svg',
    inStock: true,
    wholesaleDiscount: 15
  },
  {
    id: 2,
    name: 'ВВГ 3x2.5',
    section: '2.5 мм²',
    material: 'Медь',
    purpose: 'Силовой',
    pricePerMeter: 78,
    stock: 1800,
    image: '/placeholder.svg',
    inStock: true,
    wholesaleDiscount: 15
  },
  {
    id: 3,
    name: 'ВВГ 3x4',
    section: '4 мм²',
    material: 'Медь',
    purpose: 'Силовой',
    pricePerMeter: 125,
    stock: 950,
    image: '/placeholder.svg',
    inStock: true,
    wholesaleDiscount: 20
  },
  {
    id: 4,
    name: 'ПУНП 2x1.5',
    section: '1.5 мм²',
    material: 'Медь',
    purpose: 'Установочный',
    pricePerMeter: 32,
    stock: 0,
    image: '/placeholder.svg',
    inStock: false
  },
  {
    id: 5,
    name: 'КГ 1x16',
    section: '16 мм²',
    material: 'Медь',
    purpose: 'Гибкий',
    pricePerMeter: 280,
    stock: 450,
    image: '/placeholder.svg',
    inStock: true,
    wholesaleDiscount: 20
  },
  {
    id: 6,
    name: 'ПВС 3x1.5',
    section: '1.5 мм²',
    material: 'Медь',
    purpose: 'Соединительный',
    pricePerMeter: 52,
    stock: 3200,
    image: '/placeholder.svg',
    inStock: true,
    wholesaleDiscount: 15
  }
];
