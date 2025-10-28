import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatKyrgyzPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');

    // убираем 996 и 0
    if (digits.startsWith('996')) digits = digits.slice(3);
    if (digits.startsWith('0')) digits = digits.slice(1);
    digits = digits.slice(0, 9);

    let formatted = '+996';
    if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) formatted += ')';
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 5);
    if (digits.length > 5) formatted += '-' + digits.slice(5, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // если пользователь удаляет, не мешаем
    if (input.length < formData.phone.length) {
      setFormData({ ...formData, phone: input });
      return;
    }

    const formatted = formatKyrgyzPhone(input);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!/^996\d{9}$/.test(cleanPhone)) {
      toast.error('Введите корректный кыргызский номер (+996 XXX XX-XX-XX)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

      setTimeout(() => {
        setFormData({ name: '', phone: '', comment: '' });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{ color: 'var(--color-gold)', fontFamily: 'Playfair Display, serif' }}
          >
            Оставьте заявку
          </h2>
          <p className="text-lg text-white/80">
            Свяжитесь с нашим специалистом для расчета стоимости
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <CheckCircle size={64} className="mx-auto mb-4" style={{ color: 'var(--color-gold)' }} />
              <h3
                className="text-2xl mb-2"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'Playfair Display, serif' }}
              >
                Спасибо за обращение!
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Мы получили вашу заявку и свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 sm:p-12 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" style={{ color: 'var(--color-charcoal)' }}>
                    Имя <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    required
                    className="mt-2 border-gray-300 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" style={{ color: 'var(--color-charcoal)' }}>
                    Телефон <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+996 (XXX) XX-XX-XX"
                    required
                    className="mt-2 border-gray-300 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>

                <div>
                  <Label htmlFor="comment" style={{ color: 'var(--color-charcoal)' }}>
                    Комментарий
                  </Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Расскажите о вашем проекте..."
                    rows={4}
                    className="mt-2 border-gray-300 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
