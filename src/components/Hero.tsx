import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: "url('/images/hero04.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      

      {/* Логотип */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl tracking-tight mb-4"
          style={{ color: '#000000', fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mono House
        </motion.h1>
        
        {/* Подзаголовок */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl"
          style={{ 
            color: '#000000', 
            fontFamily: 'Playfair Display, serif',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Дизайн и мебелирование интерьеров в Бишкеке
        </motion.p>
      </div>
    </section>
  );
}