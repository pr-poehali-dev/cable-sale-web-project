import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function DeliverySection() {
  return (
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
  );
}
