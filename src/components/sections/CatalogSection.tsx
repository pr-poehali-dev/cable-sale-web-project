import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import ProductCard from '../ProductCard';
import { CableProduct } from '../types';

interface CatalogSectionProps {
  products: CableProduct[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterSection: string;
  setFilterSection: (section: string) => void;
  filterMaterial: string;
  setFilterMaterial: (material: string) => void;
  filterPurpose: string;
  setFilterPurpose: (purpose: string) => void;
  onAddToCart: (product: CableProduct, length: number) => void;
}

export default function CatalogSection({
  products,
  searchQuery,
  setSearchQuery,
  filterSection,
  setFilterSection,
  filterMaterial,
  setFilterMaterial,
  filterPurpose,
  setFilterPurpose,
  onAddToCart
}: CatalogSectionProps) {
  return (
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
            <SelectItem value="25 мм²">25 мм²</SelectItem>
            <SelectItem value="70 мм²">70 мм²</SelectItem>
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
            <SelectItem value="Контрольный">Контрольный</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            index={idx}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Товары не найдены</p>
        </div>
      )}
    </div>
  );
}