import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Услуги' },
    { href: '#benefits', label: 'Преимущества' },
    { href: '#portfolio', label: 'Работы' },
    { href: '#process', label: 'Процесс' },
    { href: '#contact', label: 'Контакты' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      // Десктоп — сразу скроллим
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{ 
        zIndex: 9999,
        backgroundColor: isScrolled ? 'rgba(44, 44, 44, 0.75)' : 'rgba(44, 44, 44, 0.5)',
        backdropFilter: 'blur(12px)',
        pointerEvents: 'auto'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <button
            onClick={() => scrollToSection('#hero')}
            className="text-2xl tracking-wide transition-colors"
            style={{ 
              color: isScrolled ? 'var(--color-gold)' : 'var(--color-gold)', 
              fontFamily: 'Playfair Display, serif' 
            }}
          >
            Mono House
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="transition-colors hover:opacity-70"
                style={{ color: isScrolled ? 'white' : 'white' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 relative"
            style={{ 
              color: isScrolled ? 'white' : 'white',
              zIndex: 10000,
              pointerEvents: 'auto'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ 
              backgroundColor: 'rgba(44, 44, 44, 0.95)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              zIndex: 9999
            }}
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection(link.href);
                  }}
                  className="block w-full text-left py-3 transition-colors hover:opacity-70 active:opacity-50"
                  style={{ 
                    color: 'white',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
