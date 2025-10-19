import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const portfolioImages = [
  { url: '/images/portfolio-1.jpg', title: 'Современный интерьер' },
  { url: '/images/portfolio-2.jpg', title: 'Гостиная премиум класса' },
  { url: '/images/portfolio-3.jpg', title: 'Элегантная спальня' },
  { url: '/images/portfolio-4.jpg', title: 'Минималистичная столовая' },
  { url: '/images/portfolio-5.jpg', title: 'Современный офис' },
  { url: '/images/portfolio-6.jpg', title: 'Люксовая кухня' },
  { url: '/images/portfolio-7.jpg', title: 'Современная гостиная' },
  { url: '/images/portfolio-8.jpg', title: 'Элегантная столовая' },
  { url: '/images/portfolio-9.jpg', title: 'Роскошная спальня' },
  { url: '/images/portfolio-10.jpg', title: 'Современная кухня' },
  { url: '/images/portfolio-11.jpg', title: 'Минималистичный офис' },
  { url: '/images/portfolio-12.jpg', title: 'Современная ванная' },
];

const ITEMS_PER_PAGE = 6;

export function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [_isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [_slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const containerRef = useRef<HTMLDivElement>(null);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Автоплей слайдера на мобильном
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      if (timeSinceLastInteraction > 15000) setIsAutoPlaying(true);

      if (isAutoPlaying) {
        handleSlideChange(currentSlide + 1, 'left');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isAutoPlaying, lastInteractionTime, currentSlide]);

  const totalPages = Math.ceil(portfolioImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = portfolioImages.slice(startIndex, endIndex);

  // Управление слайдом
  const handleSlideChange = (newSlide: number, direction: 'left' | 'right') => {
    if (!isMobile) return;
    setIsAutoPlaying(false);
    setSlideDirection(direction);
    setLastInteractionTime(Date.now());

    if (newSlide < 0) setCurrentSlide(portfolioImages.length - 1);
    else if (newSlide >= portfolioImages.length) setCurrentSlide(0);
    else setCurrentSlide(newSlide);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchDelta(0);
    setIsDragging(true);
    setIsAutoPlaying(false);
    setLastInteractionTime(Date.now());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.targetTouches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    setIsDragging(false);
    const swipeThreshold = 50;

    if (touchDelta > swipeThreshold) handleSlideChange(currentSlide - 1, 'right');
    else if (touchDelta < -swipeThreshold) handleSlideChange(currentSlide + 1, 'left');

    setTouchStart(null);
    setTouchDelta(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="portfolio" className="py-20 sm:py-32" style={{ backgroundColor: 'var(--color-light-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-4" style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}>
            Наши работы
          </h2>
          <p className="text-lg mt-4" style={{ color: 'var(--color-text-muted)' }}>
            Здесь скоро появятся фотографии наших проектов
          </p>
        </motion.div>

        {!isMobile ? (
          <>
            {/* Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentImages.map((image, index) => (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-white shadow-md"
                >
                  <ImageWithFallback src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h3 className="text-white text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>{image.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                  style={{ backgroundColor: currentPage === 1 ? '#E5E5E5' : 'var(--color-gold)', color: 'white' }}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className="w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center"
                      style={{
                        backgroundColor: currentPage === page ? 'var(--color-gold)' : 'white',
                        color: currentPage === page ? 'white' : 'var(--color-charcoal)',
                        border: currentPage === page ? 'none' : '2px solid var(--color-gold)',
                        fontFamily: 'Playfair Display, serif',
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                  style={{ backgroundColor: currentPage === totalPages ? '#E5E5E5' : 'var(--color-gold)', color: 'white' }}
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          /* Mobile Slider */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg shadow-lg touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
            >
              <div className="relative aspect-[4/3] bg-white">
                <ImageWithFallback
                  src={portfolioImages[currentSlide].url}
                  alt={portfolioImages[currentSlide].title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {portfolioImages[currentSlide].title}
                  </h3>
                </div>

                {/* Click zones */}
                <button
                  onClick={() => handleSlideChange(currentSlide - 1, 'right')}
                  className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
                  style={{ background: 'transparent' }}
                  aria-label="Предыдущий слайд"
                />
                <button
                  onClick={() => handleSlideChange(currentSlide + 1, 'left')}
                  className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
                  style={{ background: 'transparent' }}
                  aria-label="Следующий слайд"
                />
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {portfolioImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index, index > currentSlide ? 'left' : 'right')}
                  className="transition-all duration-300"
                  style={{
                    width: currentSlide === index ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: 'var(--color-gold)',
                    opacity: currentSlide === index ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
