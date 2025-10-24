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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        zIndex: 9999,
        backgroundColor: 'var(--color-light-bg)',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'auto',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
{/* Лого + надпись */}
<button
  onClick={() => scrollToSection('#hero')}
  className="flex items-center space-x-2 transition-colors"
  style={{ padding: 0, border: 'none', background: 'transparent' }}
>
  <img
    src="/images/logo1.png"
    alt="Mono House"
    className="h-10 sm:h-12" // размер логотипа
  />
  <span
    className="text-2xl tracking-wide"
    style={{ color: '#000000', fontFamily: 'Playfair Display, serif' }}
  >
    Mono House
  </span>
</button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="transition-colors hover:opacity-70"
                style={{ color: '#000000' }}
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
              color: '#000000',
              zIndex: 10000,
              pointerEvents: 'auto',
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
              backgroundColor: 'rgba(255,255,255,0.97)',
              borderColor: 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)',
              position: 'relative',
              zIndex: 9999,
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
                    color: '#000000',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
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
