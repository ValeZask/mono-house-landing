import { motion } from 'motion/react';
import { Sofa, Ruler, Truck, Home } from 'lucide-react';
import { Card } from './ui/card';

const services = [
  {
    icon: Sofa,
    title: 'Подбор мебели',
    description: 'Индивидуальный подбор мебели с учетом ваших предпочтений, стиля интерьера и бюджета',
  },
  {
    icon: Ruler,
    title: 'Дизайн мебели',
    description: 'Разработка уникальных дизайнерских решений и создание мебели по индивидуальным эскизам',
  },
  {
    icon: Truck,
    title: 'Доставка и сборка',
    description: 'Профессиональная доставка и качественная сборка мебели точно в срок',
  },
  {
    icon: Home,
    title: 'Комплексное оформление',
    description: 'Полное мебелирование от концепции до реализации с учетом всех деталей',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-32" style={{ backgroundColor: 'var(--color-light-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl mb-4"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
          >
            Наши услуги
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  >
                    <Icon size={32} style={{ color: 'white' }} />
                  </div>
                  <h3
                    className="text-2xl mb-4"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}