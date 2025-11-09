import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Картинка фона */}
<picture className="absolute inset-0 w-full h-full -z-10">
  <source
    srcSet="/images/hero05.webp"
    media="(max-width: 720px)"
    type="image/webp"
  />
  <img
    src="/images/herodesk06.webp"
    alt="Mono House — Дизайн мебели и мебелировка помещений в Бишкеке"
    className="w-full h-full object-cover"
    loading="eager"
    width="1920"
    height="1080"
  />
</picture>


      {/* Затемнение фона */}
      <div className="absolute inset-0 -z-5 bg-black/35"></div>

      {/* Логотип и текст */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl tracking-tight mb-6"
          style={{
            color: '#e6e0d4',
            fontFamily: 'Playfair Display, serif',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mono House
        </motion.h1>

        {/* адаптированный текст */}
        {isMobile ? (
          <motion.div
            className="flex flex-col gap-2 text-lg sm:text-xl font-medium leading-snug"
            style={{
              color: '#f1ede4',
              fontFamily: 'Playfair Display, serif',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>Корпусная и мягкая мебель премиум-сегмента под заказ в Бишкеке.</p>
            <p>Полный цикл от проектирования до установки.</p>
          </motion.div>
        ) : (
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-snug"
            style={{
              color: '#d8d3c8',
              fontFamily: 'Playfair Display, serif',
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Корпусная и мягкая мебель премиум-сегмента под заказ в Бишкеке. Полный цикл от
            проектирования до установки.
          </motion.p>
        )}
      </div>

      {/* Скрытые заголовки для SEO */}
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
        <h2>Мебель на заказ в Бишкеке</h2>
        <h2>Премиум корпусная и мягкая мебель</h2>
        <h2>Индивидуальные интерьерные решения</h2>
      </div>
    </section>
  );
}
