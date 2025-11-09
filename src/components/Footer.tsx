import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer
      className="py-6"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
    >
      {/* SEO‑H2 – первый элемент в футере */}
      <h2 className="sr-only">
        Контакты Mono House в Бишкеке — телефон, адрес, Instagram, WhatsApp
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="text-3xl mb-4"
              style={{
                color: 'var(--color-gold)',
                fontFamily: 'Playfair Display, serif',
              }}
            >
              Mono House
            </div>
            <p className="text-white/70 mb-6">
              Превращаем пространство в произведение искусства
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Контакты
            </div>
            <div className="space-y-4">
              <a
                href="mailto:monohouse.01@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={20} style={{ color: 'var(--color-gold)' }} />
                <span>monohouse.01@gmail.com</span>
              </a>
              <a
                href="tel:+996507909567"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={20} style={{ color: 'var(--color-gold)' }} />
                <span>+996 507 909 567</span>
              </a>
              <a
                href="tel:+996500914700"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={20} style={{ color: 'var(--color-gold)' }} />
                <span>+996 500 914 700</span>
              </a>
              <a
                href="https://2gis.kg/bishkek/geo/70000001053828677/74.609138,42.854126"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                aria-label="Адрес на 2ГИС"
              >
                <MapPin size={37} style={{ color: 'var(--color-gold)' }} />
                <span>
                  Baytik Tower, ул. Байтик баатыра, 66/1 стр; ул. Радищева, 28, Бишкек
                </span>
              </a>
            </div>
          </motion.div>

          {/* Social Media & Messengers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Мы в соцсетях
            </div>
            <div className="space-y-4 mb-6">
              <a
                href="https://www.instagram.com/mono_house.kg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                aria-label="Instagram Mono House"
              >
                <Instagram size={20} style={{ color: 'var(--color-gold)' }} />
                <span>@mono_house.kg</span>
              </a>
            </div>

            <div
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              WhatsApp
            </div>
            <div className="space-y-4">
              <a
                href="https://wa.me/996507909567?text=Здравствуйте,%20интересуюсь%20услугами%20мебели%20от%20Mono%20House"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <FaWhatsapp size={20} style={{ color: 'var(--color-gold)' }} />
                <span>+996 507 909 567</span>
              </a>
              <a
                href="https://wa.me/996500914700?text=Здравствуйте,%20интересуюсь%20услугами%20мебели%20от%20Mono%20House"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <FaWhatsapp size={20} style={{ color: 'var(--color-gold)' }} />
                <span>+996 500 914 700</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-5 border-t text-center text-white/50"
          style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
        >
          <p>© 2025 Mono House. Все права защищены</p>
        </motion.div>
      </div>

      {/* Скрытый блок полностью удалён – используется sr‑only */}
    </footer>
  );
}