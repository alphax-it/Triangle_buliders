import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { contactInfo } from '../../data/siteData';
import styles from './Contact.module.css';

const iconMap = [MapPin, Phone, Mail, Clock];
const EASE = [0.16, 1, 0.3, 1];

export default function Contact() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className={styles.eyebrow}>GET IN TOUCH</p>
          <h2 className={styles.heading}>
            LET'S <span className={styles.goldText}>CONNECT</span>
          </h2>
          <p className={styles.subtext}>
            Ready to start your project? Reach out and let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <Form />
          <InfoPanel />
        </div>
      </div>
    </section>
  );
}

function InfoPanel() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={styles.infoPanel}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={styles.infoItem}>
        <div className={styles.infoIcon}><MapPin size={18} strokeWidth={1.8} /></div>
        <div>
          <h4 className={styles.infoLabel}>Office Address</h4>
          <a
            href="https://maps.google.com/?q=Triangle+Builders,+Silver+Complex,+Sulthan+Pettai,+Mangalam+Road,+Tiruppur+641687"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoLink}
          >
            5 - FF, Silver Complex, Sulthan Pettai, Mangalam Road, Tiruppur – 641687, Tamil Nadu
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoIcon}><Phone size={18} strokeWidth={1.8} /></div>
        <div>
          <h4 className={styles.infoLabel}>Call Us (Click to Dial)</h4>
          <div className={styles.phoneLinks}>
            <a href="tel:+917530074011" className={styles.infoLink}>+91 75300 74011</a>
            <span className={styles.divider}>/</span>
            <a href="tel:+917530074033" className={styles.infoLink}>+91 75300 74033</a>
          </div>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoIcon}><Mail size={18} strokeWidth={1.8} /></div>
        <div>
          <h4 className={styles.infoLabel}>Email Address</h4>
          <a href="mailto:trianglebuilders.tp@gmail.com" className={styles.infoLink}>
            trianglebuilders.tp@gmail.com
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoIcon}><Clock size={18} strokeWidth={1.8} /></div>
        <div>
          <h4 className={styles.infoLabel}>Business Information</h4>
          <p className={styles.infoValue}>GSTIN: 33AAVFT5396H1ZG</p>
          <p className={styles.infoSubtext}>Serving Tiruppur &amp; Surrounding Regions</p>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Triangle Builders office location on Mangalam Road, Tiruppur"
          src="https://maps.google.com/maps?q=Silver+Complex,+Sulthan+Pettai,+Mangalam+Road,+Tiruppur+641687&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="150"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
}

function Form() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <motion.form
      ref={ref}
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className={styles.field}>
          <label htmlFor="service">Service Interested In</label>
          <select id="service" name="service" value={formData.service} onChange={handleChange}>
            <option value="">Select a service</option>
            <option value="residential">Residential Construction</option>
            <option value="commercial">Commercial Projects</option>
            <option value="interior">Interior Design</option>
            <option value="renovation">Renovation</option>
            <option value="consulting">Construction Consulting</option>
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." />
      </div>
      <motion.button
        type="submit"
        className={styles.submitBtn}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        {submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'} <motion.span className={styles.btnArrow} whileHover={{ x: 4 }}><Send size={14} strokeWidth={2} /></motion.span>
      </motion.button>
    </motion.form>
  );
}
