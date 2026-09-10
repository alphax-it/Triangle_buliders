import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Process from './components/Process/Process';
import LoanSupport from './components/LoanSupport/LoanSupport';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/shared/ScrollProgress';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Process />
        <LoanSupport />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
