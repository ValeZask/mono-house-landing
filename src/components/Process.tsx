import { motion } from 'motion/react';
import { MessageCircle, Ruler, Palette, Package, Truck } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Консультация',
    description: 'Обсуждаем ваши пожелания и требования',
  },
  {
    icon: Ruler,
    title: 'Замеры и планирование',
    description: 'Делаем точные замеры и составляем план',
  },
  {
    icon: Palette,
    title: 'Подбор и дизайн',
    description: 'Подбираем мебель или разрабатываем дизайн',
  },
  {
    icon: Package,
    title: 'Производство/закупка',
    description: 'Изготавливаем или приобретаем мебель',
  },
  {
    icon: Truck,
    title: 'Доставка и установка',
    description: 'Доставляем и профессионально собираем',
  },
];

export function Process() {
  return (
    <section 
      id="process" 
      className="py-20 sm:py-32"
      style={{ backgroundColor: 'var(--color-light-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl mb-4"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
          >
            Как мы работаем
          </h2>
          <p className="text-lg mt-4" style={{ color: 'var(--color-text-muted)' }}>
            Простой и прозрачный процесс от идеи до реализации
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative mb-8">
            {/* Connecting Line */}
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
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <Icon size={28} style={{ color: 'var(--color-gold)' }} />
                        </div>
                        {/* Number Badge */}
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

                    {/* Title */}
                    <h3
                      className="text-lg mb-2 px-2"
                      style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm px-2" style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Number Badge */}
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full mb-4 text-sm"
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: 'white',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                  >
                    <Icon size={26} style={{ color: 'var(--color-gold)' }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl mb-2"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}