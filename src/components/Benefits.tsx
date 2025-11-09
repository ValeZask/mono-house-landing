import { motion } from 'framer-motion';
import { Award, Briefcase, Clock, DollarSign, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Богатый опыт работы',
    description:
      'Многолетний опыт в сфере мебелирования и дизайна интерьеров',
  },
  {
    icon: Briefcase,
    title: 'Портфолио реализованных проектов',
    description:
      'Десятки успешно завершенных проектов различной сложности',
  },
  {
    icon: Clock,
    title: 'Точное соблюдение сроков',
    description:
      'Гарантируем выполнение работ в установленные сроки без задержек',
  },
  {
    icon: DollarSign,
    title: 'Выгодные цены',
    description:
      'Конкурентные цены и прозрачное ценообразование на все услуги',
  },
  {
    icon: Sparkles,
    title: 'Любые стили мебели под заказ',
    description:
      'От классики до модерна — воплотим любую идею в жизнь',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-12 sm:py-20 bg-white">
      {/* SEO‑H2 – первый элемент в секции */}
      <h2 className="sr-only">
        Почему выбирают Mono House — преимущества мебели на заказ в Бишкеке
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Визуальный заголовок (не H2, чтобы не дублировать) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div
            className="text-3xl sm:text-4xl mb-4"
            style={{
              color: 'var(--color-charcoal)',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Почему выбирают нас
          </div>
        </motion.div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className="bg-[var(--color-light-bg)] p-5 sm:p-6 h-full transition-shadow duration-300 rounded-sm border-l-2"
                  style={{ borderColor: 'var(--color-gold)' }}
                >
                  <div className="flex items-start gap-4 sm:block">
                    {/* Иконка */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4"
                      style={{ backgroundColor: 'var(--color-charcoal)' }}
                    >
                      <Icon
                        size={24}
                        className="sm:w-7 sm:h-7"
                        style={{ color: 'var(--color-gold)' }}
                      />
                    </div>

                    {/* Текст */}
                    <div className="flex-1">
                      <div
                        className="text-lg sm:text-xl mb-2"
                        style={{
                          color: 'var(--color-charcoal)',
                          fontFamily: 'Playfair Display, serif',
                        }}
                      >
                        {benefit.title}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Скрытый блок полностью удалён – используется sr‑only */}
    </section>
  );
}