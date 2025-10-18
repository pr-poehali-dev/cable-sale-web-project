import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeSection from '@/components/sections/HomeSection';
import CatalogSection from '@/components/sections/CatalogSection';
import AboutSection from '@/components/sections/AboutSection';
import DeliverySection from '@/components/sections/DeliverySection';
import ContactsSection from '@/components/sections/ContactsSection';
import { products } from '@/components/data/products';
import { CableProduct, CartItem } from '@/components/types';

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
      <Header 
        cart={cart}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        getTotalLength={getTotalLength}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="space-y-12">
            <HomeSection onNavigateToCatalog={() => setActiveTab('catalog')} />
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <CatalogSection
              products={filteredProducts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterSection={filterSection}
              setFilterSection={setFilterSection}
              filterMaterial={filterMaterial}
              setFilterMaterial={setFilterMaterial}
              filterPurpose={filterPurpose}
              setFilterPurpose={setFilterPurpose}
              onAddToCart={addToCart}
            />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliverySection />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsSection />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
