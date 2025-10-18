import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  onNavigateToCatalog: () => void;
}

export default function HomeSection({ onNavigateToCatalog }: HomeSectionProps) {
  return (
    <div className="space-y-12">
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
              onClick={onNavigateToCatalog}
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
    </div>
  );
}
