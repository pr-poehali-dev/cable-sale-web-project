import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
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
  );
}
