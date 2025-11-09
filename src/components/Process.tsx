import { motion } from 'framer-motion';
import { MessageCircle, Ruler, Palette, Package, Truck } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Консультация',
    description: 'Обсуждаем ваши пожелания и требования',
  },
  {
    icon: Ruler,
    title: 'Замеры',
    description: 'Делаем точные замеры и составляем план',
  },
  {
    icon: Palette,
    title: 'Дизайн',
    description: 'Подбираем мебель или разрабатываем дизайн',
  },
  {
    icon: Package,
    title: 'Производство',
    description: 'Создаём или закупаем мебель',
  },
  {
    icon: Truck,
    title: 'Доставка',
    description: 'Привозим и устанавливаем',
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-16 sm:py-20"
      style={{ backgroundColor: 'var(--color-light-bg)' }}
    >
      {/* SEO‑H2 – первый элемент в секции */}
      <h2 className="sr-only">
        Процесс работы Mono House — от консультации до установки мебели в Бишкеке
      </h2>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Визуальный заголовок (не H2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="text-3xl sm:text-4xl mb-4"
            style={{
              color: 'var(--color-charcoal)',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Как мы работаем
          </div>
          <p
            className="text-base sm:text-lg"
            style={{ color: 'var(--color-text-muted)' }}
          >
            От идеи до установки — просто и прозрачно
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative mb-8">
            <div
              className="absolute top-8 left-0 right-0 h-0.5"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
            />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-md hover:shadow-lg transition-all duration-300">
                          <Icon size={28} style={{ color: 'var(--color-gold)' }} />
                        </div>
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                          style={{
                            backgroundColor: 'var(--color-gold)',
                            color: 'white',
                            fontFamily: 'Playfair Display, serif',
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div
                      className="text-lg mb-1"
                      style={{
                        color: 'var(--color-charcoal)',
                        fontFamily: 'Playfair Display, serif',
                      }}
                    >
                      {step.title}
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile — карточки */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className="bg-white p-5 sm:p-6 h-full transition-all duration-300 hover:shadow-lg rounded-sm border-l-2 hover:border-l-4"
                  style={{ borderColor: 'var(--color-gold)' }}
                >
                  <div className="flex items-start gap-4 sm:block">
                    {/* Иконка */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: 'var(--color-gold)' }}
                    >
                      <Icon
                        size={24}
                        className="sm:w-7 sm:h-7"
                        style={{ color: 'white' }}
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
                        {step.title}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {step.description}
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