import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { navLinks } from '../../data/siteData';
import logo from '../../assets/logomain.png';
import styles from './Navbar.module.css';

const NAV_EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: NAV_EASE }}
    >
      <div className={styles.inner}>
        <motion.a
          href="#home"
          className={styles.logo}
          onClick={(e) => handleNav(e, '#home')}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: NAV_EASE }}
        >
          <img src={logo} alt="Triangle Builders" />
        </motion.a>

        <motion.nav
          className={styles.nav}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
          }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.href ? styles.navActive : ''}`}
              onClick={(e) => handleNav(e, link.href)}
              variants={{
                hidden: { opacity: 0, y: -5 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: NAV_EASE } },
              }}
            >
              {link.label}
              {link.label === 'Services' && <ChevronDown size={12} strokeWidth={2} className={styles.dropdownIcon} />}
            </motion.a>
          ))}
        </motion.nav>

        <motion.a
          href="#contact"
          className={styles.cta}
          onClick={(e) => handleNav(e, '#contact')}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: NAV_EASE }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.ctaText}>GET A QUOTE</span> <motion.span className={styles.ctaArrow} whileHover={{ x: 4 }}><ArrowRight size={14} strokeWidth={2} /></motion.span>
        </motion.a>

        <button className={styles.burger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNav(e, link.href)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className={styles.mobileCta} onClick={(e) => handleNav(e, '#contact')}>
              GET A QUOTE <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
