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
      {/* SEO H1 — первый в DOM, невидим для пользователя, но читается поисковиками */}
      <h1 className="sr-only">
        Mono House — Мебель на заказ в Бишкеке | Премиум корпусная и мягкая мебель
      </h1>

      {/* Фоновое изображение */}
      <picture className="absolute inset-0 w-full h-full -z-10">
        <source srcSet="/images/hero05.webp" media="(max-width: 720px)" type="image/webp" />
        <img
          src="/images/herodesk06.webp"
          alt="Mono House — Дизайн мебели и мебелировка помещений в Бишкеке"
          className="w-full h-full object-cover"
          loading="eager"
          width="1920"
          height="1080"
        />
      </picture>

      {/* Затемнение */}
      <div className="absolute inset-0 -z-5 bg-black/35" />

      {/* Контент */}
      <div className="relative z-10 text-center px-4">
        {/* Визуальный заголовок (не H1, чтобы не дублировать) */}
        <motion.div
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
        </motion.div>

        {/* Подзаголовок — адаптивный */}
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

      {/* Удалён скрытый блок с left: -9999px — больше не нужен */}
    </section>
  );
}