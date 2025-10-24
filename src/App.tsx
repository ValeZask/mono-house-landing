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

export default function App() {
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
