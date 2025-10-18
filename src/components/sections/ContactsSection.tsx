import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
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
  );
}
