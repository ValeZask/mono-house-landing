import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Partnership } from './components/Partnership';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Admin } from './pages/Admin';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(window.location.pathname === '/admin');
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  // Если это админ-панель, показываем её
  if (isAdminRoute) {
    return <Admin />;
  }

  // Иначе обычный лендинг
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Partnership />
      <Services />
      <Benefits />
      <Portfolio />
      <Testimonials />
      <Process />
      <ContactForm />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}