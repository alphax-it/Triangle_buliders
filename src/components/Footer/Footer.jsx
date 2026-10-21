import { ArrowRight } from 'lucide-react';
import { navLinks } from '../../data/siteData';
import { contactInfo } from '../../data/siteData';
import logo from '../../assets/logomain.png';
import WhatsAppIcon from '../shared/WhatsAppIcon';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={logo} alt="Triangle Builders construction company logo" width="160" height="48" className={styles.logo} />
            <p className={styles.brandText}>
              Premier building contractors and civil engineering consultants based in Tiruppur.
              Quality craftsmanship, transparent documentation, and on-time delivery.
            </p>
            <a href="#contact" className={styles.ctaBtn} onClick={(e) => handleNav(e, '#contact')}>
              GET A QUOTE <ArrowRight size={13} strokeWidth={2} />
            </a>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.footerLink} onClick={(e) => handleNav(e, link.href)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Our Services</h4>
            <a href="#services" className={styles.footerLink} onClick={(e) => handleNav(e, '#services')}>Building Contractor</a>
            <a href="#services" className={styles.footerLink} onClick={(e) => handleNav(e, '#services')}>Consulting Engineer</a>
            <a href="#services" className={styles.footerLink} onClick={(e) => handleNav(e, '#services')}>Interior / Elevation Work</a>
            <a href="#services" className={styles.footerLink} onClick={(e) => handleNav(e, '#services')}>Renovation &amp; Remodeling</a>
            <a href="#services" className={styles.footerLink} onClick={(e) => handleNav(e, '#services')}>Corporation / Panchayat Approval</a>
            <a href="#loan" className={styles.footerLink} onClick={(e) => handleNav(e, '#loan')}>Bank Loan Assistance</a>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <a
              href="https://maps.google.com/?q=Triangle+Builders,+Silver+Complex,+Sulthan+Pettai,+Mangalam+Road,+Tiruppur+641687"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              5 - FF, Silver Complex, Sulthan Pettai, Mangalam Road, Tiruppur – 641687
            </a>
            <div className={styles.footerPhoneRow}>
              <a
                href="https://wa.me/917530074011"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waIconBtn}
                title="Chat on WhatsApp (+91 75300 74011)"
                aria-label="Chat with Triangle Builders on WhatsApp"
              >
                <WhatsAppIcon size={13} color="#ffffff" />
              </a>
              <a href="tel:+917530074011" className={styles.footerLink}>+91 75300 74011</a>
            </div>
            <a href="tel:+917530074033" className={styles.footerLink}>+91 75300 74033</a>
            <a href="mailto:trianglebuilders.tp@gmail.com" className={styles.footerLink}>trianglebuilders.tp@gmail.com</a>
            <span className={styles.footerLink}>GSTIN: 33AAVFT5396H1ZG</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} Triangle Builders. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
