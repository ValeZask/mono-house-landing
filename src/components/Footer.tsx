import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: 'var(--color-charcoal)' }}>
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
              <div className="flex items-center gap-3 text-white/40">
                <MapPin size={20} style={{ color: 'var(--color-gold)' }} />
                <span>Скоро здесь будет наш адрес</span>
              </div>
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
              <div className="flex items-center gap-3 text-white/40">
                <Instagram size={20} style={{ color: 'var(--color-gold)' }} />
                <span>Coming soon</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <Facebook size={20} style={{ color: 'var(--color-gold)' }} />
                <span>Coming soon</span>
              </div>
            </div>

            <h4
              className="text-xl mb-6 text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Мессенджеры
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/40">
                <MessageCircle size={20} style={{ color: 'var(--color-gold)' }} />
                <span>WhatsApp - Coming soon</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <MessageCircle size={20} style={{ color: 'var(--color-gold)' }} />
                <span>Telegram - Coming soon</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-17 border-t text-center text-white/50"
          style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
        >
          <p>© 2025 Mono House. Все права защищены</p>
        </motion.div>
      </div>
    </footer>
  );
}
