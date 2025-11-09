import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="py-6" style={{ backgroundColor: 'var(--color-charcoal)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl mb-4"
              style={{ color: 'var(--color-gold)', fontFamily: 'Playfair Display, serif' }}
            >
              Mono House
            </h3>
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
            <h4
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Контакты
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:monohouse.01@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={20} style={{ color: 'var(--color-gold)' }} />
                <span>monohouse.01@gmail.com</span>
              </a>
              <a
                href="tel:0507909567"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={20} style={{ color: 'var(--color-gold)' }} />
                <span>0507909567</span>
              </a>
              <a
                href="tel:0500914700"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={20} style={{ color: 'var(--color-gold)' }} />
                <span>0500914700</span>
              </a>
              <a
                href="https://2gis.kg/bishkek/geo/70000001053828677/74.609138,42.854126"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                aria-label="Адрес на 2ГИС"
              >
                <MapPin size={37} style={{ color: 'var(--color-gold)' }} />
                <span>Baytik Tower, ул. Байтик баатыра, 66/1 стр; ул. Радищева, 28, Бишкек</span>
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
            <h4
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Мы в соцсетях
            </h4>
            <div className="space-y-4 mb-6">
              <a
                href="https://www.instagram.com/mono_house.kg?igsh=MTk2M2E0cXhneWZ1YQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                aria-label="Instagram Mono House"
              >
                <Instagram size={20} style={{ color: 'var(--color-gold)' }} />
                <span>@mono_house.kg</span>
              </a>
            </div>

            <h4
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              WhatsApp
            </h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/996507909567?text=Здравствуйте,%20интересуюсь%20услугами%20мебели%20от%20Mono%20House"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <FaWhatsapp size={20} color="var(--color-gold)" />
                <span>0507909567</span>
              </a>
              <a
                href="https://wa.me/996500914700?text=Здравствуйте,%20интересуюсь%20услугами%20мебели%20от%20Mono%20House"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <FaWhatsapp size={20} color="var(--color-gold)" />
                <span>0500914700</span>
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
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
  <h3>Контакты Mono House Бишкек</h3>
  <h3>Электронная почта monohouse.01@gmail.com</h3>
  <h3>Телефоны: 0507909567, 0500914700</h3>
  <h3>Адрес: Baytik Tower, ул. Байтик баатыра, 66/1 стр; ул. Радищева, 28, Бишкек</h3>
  <h3>Instagram @mono_house.kg</h3>
  <h3>WhatsApp для заказа мебели</h3>
</div>

    </footer>
  );
}
