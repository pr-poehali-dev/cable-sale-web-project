import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutSection() {
  return (
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
  );
}
