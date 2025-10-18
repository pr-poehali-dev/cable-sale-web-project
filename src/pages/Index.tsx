import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CableProduct {
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

const products: CableProduct[] = [
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

interface CartItem extends CableProduct {
  length: number;
}

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterMaterial, setFilterMaterial] = useState<string>('all');
  const [filterPurpose, setFilterPurpose] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState('home');

  const filteredProducts = products.filter(product => {
    const matchesSection = filterSection === 'all' || product.section === filterSection;
    const matchesMaterial = filterMaterial === 'all' || product.material === filterMaterial;
    const matchesPurpose = filterPurpose === 'all' || product.purpose === filterPurpose;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesMaterial && matchesPurpose && matchesSearch;
  });

  const addToCart = (product: CableProduct, length: number) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, length: item.length + length } : item
      ));
    } else {
      setCart([...cart, { ...product, length }]);
    }
    toast.success(`${product.name} добавлен в корзину (${length}м)`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info('Товар удален из корзины');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemTotal = item.pricePerMeter * item.length;
      const discount = item.length >= 100 && item.wholesaleDiscount ? item.wholesaleDiscount / 100 : 0;
      return sum + itemTotal * (1 - discount);
    }, 0);
  };

  const getTotalLength = () => {
    return cart.reduce((sum, item) => sum + item.length, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="space-y-12">
            <section className="relative py-20 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-secondary animate-fade-in">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
              <div className="relative container mx-auto px-6 text-center text-white">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Icon name="Award" size={14} className="mr-1" />
                  Сертифицированная продукция
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Кабельная продукция<br />премиум-класса
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
                  Широкий ассортимент, честные цены, гарантия качества
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="text-lg"
                    onClick={() => setActiveTab('catalog')}
                  >
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    Смотреть каталог
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Калькулятор расчета
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Truck',
                  title: 'Быстрая доставка',
                  description: 'Доставка по России за 1-3 дня. Бесплатно от 50 000 ₽'
                },
                {
                  icon: 'Shield',
                  title: 'Гарантия качества',
                  description: 'Все товары сертифицированы и имеют паспорт качества'
                },
                {
                  icon: 'Percent',
                  title: 'Оптовые скидки',
                  description: 'Скидки до 20% при заказе от 100 метров'
                }
              ].map((feature, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow animate-fade-in">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-3xl font-bold mb-6">Каталог продукции</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Input
                  placeholder="Поиск по названию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="md:col-span-4"
                />
                
                <Select value={filterSection} onValueChange={setFilterSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Сечение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все сечения</SelectItem>
                    <SelectItem value="1.5 мм²">1.5 мм²</SelectItem>
                    <SelectItem value="2.5 мм²">2.5 мм²</SelectItem>
                    <SelectItem value="4 мм²">4 мм²</SelectItem>
                    <SelectItem value="16 мм²">16 мм²</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterMaterial} onValueChange={setFilterMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Материал" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все материалы</SelectItem>
                    <SelectItem value="Медь">Медь</SelectItem>
                    <SelectItem value="Алюминий">Алюминий</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPurpose} onValueChange={setFilterPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Назначение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все назначения</SelectItem>
                    <SelectItem value="Силовой">Силовой</SelectItem>
                    <SelectItem value="Гибкий">Гибкий</SelectItem>
                    <SelectItem value="Установочный">Установочный</SelectItem>
                    <SelectItem value="Соединительный">Соединительный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    index={idx}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">Товары не найдены</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl">О компании</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  КабельПро - ведущий поставщик кабельной продукции на рынке России. 
                  Мы работаем с 2010 года и за это время завоевали доверие тысяч клиентов.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {[
                    { label: 'Лет на рынке', value: '14+' },
                    { label: 'Довольных клиентов', value: '5000+' },
                    { label: 'Видов продукции', value: '500+' },
                    { label: 'Городов доставки', value: '200+' }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl">Доставка и оплата</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Truck" className="text-primary" />
                    Условия доставки
                  </h3>
                  <ul className="space-y-2 ml-8">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Бесплатная доставка при заказе от 50 000 ₽</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Доставка по Москве - 1 день</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Доставка по России - 2-5 дней</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Самовывоз со склада бесплатно</span>
                    </li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="CreditCard" className="text-primary" />
                    Способы оплаты
                  </h3>
                  <ul className="space-y-2 ml-8">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Безналичный расчет для юридических лиц</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Оплата картой онлайн</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-green-500 mt-1" size={16} />
                      <span>Наличными при получении</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl">Контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Адрес офиса</h4>
                        <p className="text-muted-foreground">г. Москва, ул. Кабельная, д. 15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" className="text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Телефон</h4>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">info@kabelpro.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Режим работы</h4>
                        <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                        <p className="text-muted-foreground">Сб-Вс: выходной</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" />
                      <h4 className="font-semibold mb-2">Онлайн-консультант</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Нужна помощь в подборе кабеля?
                      </p>
                      <Button size="lg">
                        <Icon name="Send" size={16} className="mr-2" />
                        Написать нам
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-slate-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">КабельПро</h3>
              <p className="text-slate-400 text-sm">
                Надежный поставщик кабельной продукции с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Силовые кабели</li>
                <li>Гибкие кабели</li>
                <li>Установочные провода</li>
                <li>Соединительные кабели</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Сертификаты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@kabelpro.ru</li>
                <li>г. Москва, ул. Кабельная, 15</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-slate-700 mb-6" />
          <div className="text-center text-sm text-slate-400">
            © 2024 КабельПро. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ 
  product, 
  onAddToCart,
  index 
}: { 
  product: CableProduct; 
  onAddToCart: (product: CableProduct, length: number) => void;
  index: number;
}) {
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
