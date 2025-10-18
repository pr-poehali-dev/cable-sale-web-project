import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { CableProduct } from './types';

interface ProductCardProps {
  product: CableProduct;
  onAddToCart: (product: CableProduct, length: number) => void;
  index: number;
}

export default function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [length, setLength] = useState<number>(10);

  const calculatePrice = () => {
    const basePrice = product.pricePerMeter * length;
    const discount = length >= 100 && product.wholesaleDiscount ? product.wholesaleDiscount / 100 : 0;
    return basePrice * (1 - discount);
  };

  const hasDiscount = length >= 100 && product.wholesaleDiscount;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
        <Icon name="Cable" size={48} className="text-slate-400" />
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            Нет в наличии
          </Badge>
        )}
        {product.inStock && (
          <Badge className="absolute top-2 right-2 bg-green-500">
            <Icon name="Check" size={12} className="mr-1" />
            В наличии
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon name="Ruler" size={14} />
            <span>Сечение: {product.section}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={14} />
            <span>{product.material}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={14} />
            <span>{product.purpose}</span>
          </div>
          {product.inStock && (
            <div className="flex items-center gap-2 text-green-600">
              <Icon name="Package" size={14} />
              <span>На складе: {product.stock} м</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Цена за метр:</span>
            <span className="font-semibold">{product.pricePerMeter} ₽/м</span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Длина (м):</label>
            <Input
              type="number"
              min="1"
              max={product.stock}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              disabled={!product.inStock}
            />
          </div>

          {hasDiscount && (
            <Badge variant="secondary" className="mt-2 w-full justify-center">
              <Icon name="Percent" size={12} className="mr-1" />
              Оптовая скидка {product.wholesaleDiscount}%!
            </Badge>
          )}

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Итого:</span>
            <div className="text-right">
              {hasDiscount && (
                <div className="text-sm text-muted-foreground line-through">
                  {(product.pricePerMeter * length).toFixed(2)} ₽
                </div>
              )}
              <div className="text-2xl font-bold text-primary">
                {calculatePrice().toFixed(2)} ₽
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg"
          onClick={() => onAddToCart(product, length)}
          disabled={!product.inStock}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          {product.inStock ? 'В корзину' : 'Недоступно'}
        </Button>
      </CardContent>
    </Card>
  );
}
