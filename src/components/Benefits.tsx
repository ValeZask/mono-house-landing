import { motion } from 'motion/react';
import { Award, Briefcase, Clock, DollarSign, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

const benefits = [
  {
    icon: Award,
    title: 'Богатый опыт работы',
    description: 'Многолетний опыт в сфере мебелирования и дизайна интерьеров',
  },
  {
    icon: Briefcase,
    title: 'Портфолио реализованных проектов',
    description: 'Десятки успешно завершенных проектов различной сложности',
  },
  {
    icon: Clock,
    title: 'Точное соблюдение сроков',
    description: 'Гарантируем выполнение работ в установленные сроки без задержек',
  },
  {
    icon: DollarSign,
    title: 'Выгодные цены',
    description: 'Конкурентные цены и прозрачное ценообразование на все услуги',
  },
  {
    icon: Sparkles,
    title: 'Любые стили мебели под заказ',
    description: 'От классики до модерна — воплотим любую идею в жизнь',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 sm:py-32 bg-white">
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
            Почему выбирают нас
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  style={{ backgroundColor: 'var(--color-light-bg)', border: 'none' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-charcoal)' }}
                  >
                    <Icon size={28} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <h3
                    className="text-xl mb-3"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    {benefit.description}
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
