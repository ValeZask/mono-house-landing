import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  const instagramReviews = [
    { url: 'https://www.instagram.com/', name: 'Азиз' },
    { url: 'https://www.instagram.com/', name: 'Айжан' },
    { url: 'https://www.instagram.com/', name: 'Нурлан' },
    { url: 'https://www.instagram.com/', name: 'Карина' },
    { url: 'https://www.instagram.com/', name: 'Эльдар' },
    { url: 'https://www.instagram.com/', name: 'Динара' },
    { url: 'https://www.instagram.com/', name: 'Азамат' },
    { url: 'https://www.instagram.com/', name: 'Камила' },
  ];

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(instagramReviews.length / itemsPerPage));
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return instagramReviews.slice(start, start + itemsPerPage);
  }, [page, instagramReviews]);
  const goToPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

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
            Видео-отзывы в Instagram
          </h2>
        </motion.div>

        {/* Список ссылок на Instagram-отзывы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="min-h-[400px]">
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {currentItems.map((item, index) => (
                <li key={index} className="py-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 group rounded-lg px-3 py-3 transition-colors hover:bg-white"
                    aria-label={`Смотреть отзыв от заказчика ${item.name} в Instagram`}
                  >
                    <div className="flex items-center gap-3">
                      <Instagram size={20} style={{ color: 'var(--color-gold)' }} />
                      <span
                        className="underline decoration-transparent group-hover:decoration-current transition-colors"
                        style={{ color: 'var(--color-charcoal)' }}
                      >
                        {`Отзыв от заказчика ${item.name}`}
                      </span>
                    </div>
                    <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-charcoal)' }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-30 hover:bg-gray-50 disabled:hover:bg-transparent"
                aria-label="Предыдущая страница"
                style={{ 
                  borderColor: 'var(--border)', 
                  color: 'var(--color-charcoal)'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const isActive = pageNumber === page;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className="w-2.5 h-2.5 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: isActive ? 'var(--color-gold)' : 'rgba(0,0,0,0.2)',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)'
                      }}
                      aria-label={`Страница ${pageNumber}`}
                    />
                  );
                })}
              </div>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-30 hover:bg-gray-50 disabled:hover:bg-transparent"
                aria-label="Следующая страница"
                style={{ 
                  borderColor: 'var(--border)', 
                  color: 'var(--color-charcoal)'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}