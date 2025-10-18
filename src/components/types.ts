export interface CableProduct {
  id: number;
  name: string;
  section: string;
  material: string;
  purpose: string;
  pricePerMeter: number;
  stock: number;
  image: string;
  inStock: boolean;
  wholesaleDiscount?: number;
}

export interface CartItem extends CableProduct {
  length: number;
}
