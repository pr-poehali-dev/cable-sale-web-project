import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
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
              <li>Контрольные кабели</li>
              <li>Установочные провода</li>
              <li>Соединительные кабели</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  О компании
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('delivery')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Доставка
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('delivery')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Оплата
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Сертификаты
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>+7 (903) 278-68-49</li>
              <li>+7 (495) 225-33-83</li>
              <li>inna-my@mail.ru</li>
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