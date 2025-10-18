import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface HeaderProps {
  cart: CartItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  removeFromCart: (productId: number) => void;
  getTotalPrice: () => number;
  getTotalLength: () => number;
}

export default function Header({ 
  cart, 
  activeTab, 
  setActiveTab, 
  removeFromCart,
  getTotalPrice,
  getTotalLength
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                КабельПро
              </h1>
              <p className="text-xs text-muted-foreground">Кабельная продукция премиум-класса</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => setActiveTab('home')}>Главная</Button>
            <Button variant="ghost" onClick={() => setActiveTab('catalog')}>Каталог</Button>
            <Button variant="ghost" onClick={() => setActiveTab('about')}>О компании</Button>
            <Button variant="ghost" onClick={() => setActiveTab('delivery')}>Доставка</Button>
            <Button variant="ghost" onClick={() => setActiveTab('contacts')}>Контакты</Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-secondary">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map((item) => {
                  const itemTotal = item.pricePerMeter * item.length;
                  const hasDiscount = item.length >= 100 && item.wholesaleDiscount;
                  const discount = hasDiscount ? item.wholesaleDiscount! / 100 : 0;
                  const finalPrice = itemTotal * (1 - discount);
                  
                  return (
                    <Card key={item.id} className="animate-scale-in">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.length} м × {item.pricePerMeter} ₽/м
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                        
                        {hasDiscount && (
                          <Badge variant="secondary" className="mb-2">
                            <Icon name="Percent" size={12} className="mr-1" />
                            Оптовая скидка {item.wholesaleDiscount}%
                          </Badge>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {hasDiscount && (
                              <span className="line-through mr-2">{itemTotal.toFixed(2)} ₽</span>
                            )}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {finalPrice.toFixed(2)} ₽
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Общая длина:</span>
                      <span className="font-semibold">{getTotalLength()} м</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{getTotalPrice().toFixed(2)} ₽</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
