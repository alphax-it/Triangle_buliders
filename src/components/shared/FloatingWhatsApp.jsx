import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  const phoneNumber = '917530074011';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hello Triangle Builders, I would like to enquire about your building construction and consulting services.'
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Chat on WhatsApp with Triangle Builders at +91 75300 74011"
      title="Chat on WhatsApp (+91 75300 74011)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className={styles.pulse} aria-hidden="true" />
      <span className={styles.iconWrapper}>
        <WhatsAppIcon size={28} color="#FFFFFF" />
      </span>
      <span className={styles.tooltip}>Chat with us on WhatsApp</span>
    </motion.a>
  );
}
