import { motion } from 'framer-motion';
import { ArrowRight, Landmark } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import styles from './LoanSupport.module.css';

const EASE = [0.16, 1, 0.3, 1];

export default function LoanSupport() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className={styles.section} id="loan">
      <div className={styles.container}>
        <motion.div
          ref={ref}
          className={styles.banner}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.div
            className={styles.iconWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            <Landmark size={28} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <h2 className={styles.heading}>LOAN &amp; APPROVAL SUPPORT</h2>
            <p className={styles.text}>
              We assist you with Tiruppur Corporation &amp; Panchayat building approvals, civil engineer valuations, and seamless construction loan documentation.
            </p>
          </motion.div>
          <motion.a
            href="#contact"
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            GET SUPPORT <motion.span className={styles.btnArrow} whileHover={{ x: 4 }}><ArrowRight size={14} strokeWidth={2} /></motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
