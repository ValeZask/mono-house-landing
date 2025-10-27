import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Partnership() {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок "О нас" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl sm:text-4xl mb-6"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
          >
            О нас
          </h2>
        </motion.div>

        {/* Основная информация о Mono House */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p
            className="text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span
              style={{
                color: 'var(--color-charcoal)',
                fontWeight: 600,
                fontSize: '1.15em',
                fontFamily: 'Playfair Display, serif',
              }}
            >
              Mono House
            </span>{' '}
            — Премиальная компания по дизайну мебели и мебелировке помещений в Бишкеке.
            Мы специализируемся на комплексном оснащении жилых и коммерческих пространств,
            создавая индивидуальные мебельные решения с учётом стиля и функциональности интерьера.
          </p>

          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Наша команда профессионалов реализует проекты любой сложности —
            от подбора готовой мебели до создания эксклюзивных решений.
            Мы предлагаем полный цикл услуг: проектирование мебели, производство, доставку и установку.
          </p>
        </motion.div>

        {/* Разделитель */}
        <div className="flex items-center justify-center gap-4 py-12">
          <div className="h-px w-16" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="h-px w-16" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        {/* Информация о партнерстве с Nills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Текст о партнерстве */}
            <div className="lg:col-span-2 space-y-4">
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Официальное представительство
              </p>
              
              <div className="flex items-center gap-3">
                <h3
                  className="text-2xl sm:text-3xl tracking-tight"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
                >
                  Nills
                </h3>
                <a
                  href="https://nills.com/ru/hakkimizda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'var(--color-light-bg)',
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <ExternalLink 
                    size={14} 
                    style={{ color: 'var(--color-gold)' }} 
                    className="group-hover:scale-110 transition-transform duration-300" 
                  />
                  <span className="text-xs">nills.com</span>
                </a>
              </div>

              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Официальный представитель премиальной турецкой мебельной компании Nills в Бишкеке. 
                Эксклюзивная мебель высочайшего качества с гарантией подлинности.
              </p>
            </div>

            {/* Компактное изображение */}
            <div className="relative overflow-hidden rounded-lg shadow-lg h-48 lg:h-56">
              <ImageWithFallback
                src="/images/nills.webp"
                alt="Nills company building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}