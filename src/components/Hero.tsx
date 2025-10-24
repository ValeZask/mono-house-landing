import { motion } from 'motion/react';

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
      {/* Лёгкое затемнение фона */}
      

      {/* Логотип */}
      <motion.h1
        className="relative z-10 text-6xl sm:text-7xl md:text-8xl tracking-tight text-center"
        style={{ color: '#000000', fontFamily: 'Playfair Display, serif' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mono House
      </motion.h1>
    </section>
  );
}
