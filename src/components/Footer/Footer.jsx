import { ArrowRight } from 'lucide-react';
import { navLinks } from '../../data/siteData';
import { contactInfo } from '../../data/siteData';
import logo from '../../assets/logomain.png';
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
            <img src={logo} alt="Triangle Builders" className={styles.logo} />
            <p className={styles.brandText}>
              Building premium spaces with trust, quality craftsmanship, and
              on-time delivery since 2005.
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
            <h4 className={styles.colTitle}>Services</h4>
            <span className={styles.footerLink}>Residential Construction</span>
            <span className={styles.footerLink}>Commercial Projects</span>
            <span className={styles.footerLink}>Interior Design</span>
            <span className={styles.footerLink}>Renovation</span>
            <span className={styles.footerLink}>Construction Consulting</span>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contact Info</h4>
            {contactInfo.map((info, i) => (
              <span key={i} className={styles.footerLink}>{info.value}</span>
            ))}
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
