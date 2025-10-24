import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function Testimonials() {
  const videoId = "1i3EBSxjLAY";

  return (
    <section 
      className="py-1 sm:py-2" 
      style={{ backgroundColor: 'var(--color-light-bg)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
          >
            Отзывы клиентов
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Узнайте мнение тех, кто уже доверился нам
          </p>
        </motion.div>

        {/* Видео контейнер */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* YouTube iframe с aspect ratio 16:9 */}
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Видео-отзыв клиента"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Декоративная линия снизу */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 sm:w-24" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
          <div className="h-px w-16 sm:w-24" style={{ backgroundColor: 'var(--color-gold)' }} />
        </motion.div>
      </div>
    </section>
  );
}