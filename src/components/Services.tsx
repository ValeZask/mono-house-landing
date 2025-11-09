import { motion } from 'framer-motion';
import { Sofa, Ruler, Truck, Home } from 'lucide-react';

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
    <section id="services" className="py-12 sm:py-20" style={{ backgroundColor: 'var(--color-light-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
          >
            Наши услуги
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className="bg-white p-5 sm:p-6 h-full transition-shadow duration-300 rounded-sm border-l-2"
                  style={{ borderColor: 'var(--color-gold)' }}
                >
                  <div className="flex items-start gap-4 sm:block">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4"
                      style={{ backgroundColor: 'var(--color-gold)' }}
                    >
                      <Icon size={24} className="sm:w-7 sm:h-7" style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg sm:text-xl mb-2"
                        style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🔹 Скрытые SEO-заголовки */}
        <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          <h3>Подбор мебели в Бишкеке</h3>
          <h3>Дизайн мебели под заказ</h3>
          <h3>Доставка и сборка мебели</h3>
          <h3>Комплексное оформление интерьера</h3>
        </div>
      </div>
    </section>
  );
}
