import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase, PortfolioImage } from '../lib/supabase';

const ITEMS_PER_PAGE = 6;

export function Portfolio() {
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [_isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [_slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [fullscreenTouchStart, setFullscreenTouchStart] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prefetchedPagesRef = useRef<Set<number>>(new Set());

  // Загружаем изображения из Supabase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPortfolioImages(data || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    // Подписываемся на изменения в реальном времени
    const subscription = supabase
      .channel('portfolio_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_images' },
        () => {
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const prefetchNextPage = (pageNumber: number) => {
    const totalPages = Math.ceil(portfolioImages.length / ITEMS_PER_PAGE);
    if (prefetchedPagesRef.current.has(pageNumber) || pageNumber > totalPages) return;
    const startIdx = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, portfolioImages.length);
    const nextPageImages = portfolioImages.slice(startIdx, endIdx);
    nextPageImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = img.image_url;
      document.head.appendChild(link);
    });
    prefetchedPagesRef.current.add(pageNumber);
  };

  useEffect(() => {
    const timer = setTimeout(() => prefetchNextPage(currentPage + 1), 500);
    return () => clearTimeout(timer);
  }, [currentPage, portfolioImages]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || isFullscreen || portfolioImages.length === 0) return;
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      if (timeSinceLastInteraction > 7000) setIsAutoPlaying(true);
      if (isAutoPlaying) handleSlideChange(currentSlide + 1, 'left', true);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, isAutoPlaying, lastInteractionTime, currentSlide, isFullscreen, portfolioImages.length]);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      else if (e.key === 'ArrowLeft') handleFullscreenNav('prev');
      else if (e.key === 'ArrowRight') handleFullscreenNav('next');
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [isFullscreen, fullscreenIndex]);

  useEffect(() => {
    if (!isFullscreen) return;
    const handlePopState = () => setIsFullscreen(false);
    window.history.pushState({ fullscreen: true }, '');
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.fullscreen) window.history.back();
    };
  }, [isFullscreen]);

  // Показываем загрузку
  if (loading) {
    return (
      <section id="portfolio" className="py-20 sm:py-32" style={{ backgroundColor: 'var(--color-light-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}>
              Наши работы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Если нет изображений
  if (portfolioImages.length === 0) {
    return (
      <section id="portfolio" className="py-20 sm:py-32" style={{ backgroundColor: 'var(--color-light-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}>
              Наши работы
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Портфолио скоро появится</p>
          </div>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(portfolioImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = portfolioImages.slice(startIndex, endIndex);

  const handleSlideChange = (newSlide: number, direction: 'left' | 'right', fromAuto = false) => {
    if (!isMobile) return;
    if (!fromAuto) {
      setIsAutoPlaying(false);
      setLastInteractionTime(Date.now());
    }
    setSlideDirection(direction);
    if (newSlide < 0) setCurrentSlide(portfolioImages.length - 1);
    else if (newSlide >= portfolioImages.length) setCurrentSlide(0);
    else setCurrentSlide(newSlide);
  };

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

  const handlePageChange = (page: number) => setCurrentPage(page);
  const openFullscreen = (index: number) => { setFullscreenIndex(index); setIsFullscreen(true); };
  const closeFullscreen = () => setIsFullscreen(false);

  const handleFullscreenNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev')
      setFullscreenIndex(prev => (prev === 0 ? portfolioImages.length - 1 : prev - 1));
    else
      setFullscreenIndex(prev => (prev === portfolioImages.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreenTouchStart = (e: React.TouchEvent) => {
    setFullscreenTouchStart(e.targetTouches[0].clientX);
  };

  const handleFullscreenTouchEnd = (e: React.TouchEvent) => {
    if (fullscreenTouchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = fullscreenTouchStart - touchEnd;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) handleFullscreenNav('next');
    else if (diff < -swipeThreshold) handleFullscreenNav('prev');
    setFullscreenTouchStart(null);
  };

  const handleFullscreenClick = (e: React.MouseEvent, area: 'left' | 'right' | 'close') => {
    e.stopPropagation();
    if (area === 'close') closeFullscreen();
    else if (area === 'left') handleFullscreenNav('prev');
    else handleFullscreenNav('next');
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
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}>
            Наши работы
          </h2>
        </motion.div>

        {!isMobile ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentImages.map((image, index) => {
                const globalIndex = startIndex + index;
                const shouldLazyLoad = currentPage > 1;
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-white shadow-md cursor-pointer"
                    onClick={() => openFullscreen(startIndex + index)}
                  >
                    <ImageWithFallback
                      src={image.image_url}
                      alt={`Проект ${globalIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={shouldLazyLoad ? 'lazy' : undefined}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </motion.div>
                );
              })}
              {/* Invisible placeholders to preserve grid height when fewer than 6 items */}
              {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - currentImages.length) }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="aspect-[4/3] rounded-lg opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-6"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className="w-2.5 h-2.5 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: currentPage === page ? 'var(--color-gold)' : 'rgba(0,0,0,0.2)',
                        transform: currentPage === page ? 'scale(1.2)' : 'scale(1)'
                      }}
                      aria-label={`Страница ${page}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-30 hover:bg-gray-50 disabled:hover:bg-transparent"
                  aria-label="Следующая страница"
                  style={{ 
                    borderColor: 'var(--border)', 
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </>
        ) : (
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
                  src={portfolioImages[currentSlide].image_url}
                  alt={`Проект ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <button onClick={() => handleSlideChange(currentSlide - 1, 'right')} className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10" />
                <button onClick={() => openFullscreen(currentSlide)} className="absolute left-1/3 top-0 bottom-0 w-1/3 cursor-pointer z-10" />
                <button onClick={() => handleSlideChange(currentSlide + 1, 'left')} className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10" />
              </div>
            </div>

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

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={e => handleFullscreenClick(e, 'close')}
          >
            <button
              onClick={e => handleFullscreenClick(e, 'close')}
              className="absolute right-6 z-50 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
              style={{ touchAction: 'manipulation', top: isMobile ? '98px' : '80px' }}
            >
              <X size={20} color="white" strokeWidth={2} />
            </button>

            <motion.div
              key={fullscreenIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ paddingTop: '80px', paddingBottom: '16px', paddingLeft: '16px', paddingRight: '16px' }}
              onTouchStart={isMobile ? handleFullscreenTouchStart : undefined}
              onTouchEnd={isMobile ? handleFullscreenTouchEnd : undefined}
            >
              <img
                src={portfolioImages[fullscreenIndex].image_url}
                alt={`Проект ${fullscreenIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
                onClick={e => e.stopPropagation()}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer" onClick={e => handleFullscreenClick(e, 'left')} />
              <div className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer" onClick={e => handleFullscreenClick(e, 'right')} />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-40">
              {fullscreenIndex + 1} / {portfolioImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}