import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Partnership() {
  return (
    <section className="py-8 sm:py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок "О нас" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2
            className="text-3xl sm:text-4xl mb-4"
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
          className="space-y-5"
        >
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
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
            — изготовление корпусной и мягкой мебели премиум-сегмента на заказ в Бишкеке.
            Мы создаем индивидуальные интерьерные решения для квартир, домов, офисов и коммерческих пространств,
            где каждый элемент разрабатывается специально под ваш проект.
          </p>

          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Полный цикл производства от проектирования до монтажа: разрабатываем дизайн,
            изготавливаем мебель на собственном производстве, доставляем и устанавливаем
            в вашем помещении. Работаем с элитными материалами и современными технологиями,
            гарантируя высокое качество и долговечность каждого изделия.
          </p>
        </motion.div>

        {/* Разделитель */}
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px w-16" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="h-px w-16" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        {/* Информация о Nills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                Официальное представительство
              </p>

              <div className="flex items-center gap-2">
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
                    color: 'var(--color-charcoal)',
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

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Мы — официальный представитель турецкого бренда Nills в Бишкеке. 
                Компания известна премиальной мебелью современного дизайна и высоким качеством исполнения.
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Коллекции Nills сочетают элегантность, комфорт и долговечность, создавая атмосферу уюта в каждом пространстве.
              </p>
            </div>

            {/* Оптимизированная картинка через picture */}
            <div className="relative overflow-hidden rounded-lg shadow-lg h-52 lg:h-52">
<picture className="w-full h-full block">
  <source srcSet="/images/nills.webp" media="(max-width: 720px)" type="image/webp" />
  <img
    src="/images/nills.webp"
    alt="Официальное представительство Nills в Бишкеке"
    className="w-full h-full object-cover"
    loading="lazy"
    width="600"
    height="350"
  />
</picture>

            </div>
          </div>
        </motion.div>

        {/* 🔹 Скрытые SEO-теги */}
        <div
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <h1>Мебель на заказ в Бишкеке</h1>
          <h2>Премиум корпусная и мягкая мебель</h2>
          <h2>Индивидуальные интерьерные решения</h2>
        </div>
      </div>
    </section>
  );
}
