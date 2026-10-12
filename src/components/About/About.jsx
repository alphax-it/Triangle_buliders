import { motion } from 'framer-motion';
import { ArrowRight, Compass, HardHat, ShieldCheck, Award } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import styles from './About.module.css';

const EASE = [0.16, 1, 0.3, 1];

const pillars = [
  {
    icon: Compass,
    title: 'Architectural Precision',
    desc: 'Tailored designs crafted with structural excellence and modern aesthetics.'
  },
  {
    icon: HardHat,
    title: 'Expert Execution',
    desc: 'Skilled on-site engineers ensuring flawless craftsmanship at every stage.'
  },
  {
    icon: ShieldCheck,
    title: 'Certified Quality',
    desc: 'Top-tier materials and rigorous quality control from foundation to finish.'
  },
  {
    icon: Award,
    title: 'On-Time Delivery',
    desc: 'Disciplined project schedules and transparent milestone tracking.'
  }
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            ref={ref}
            className={styles.content}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className={styles.eyebrow}>WHO WE ARE</p>
            <h2 className={styles.title}>ABOUT US</h2>
            <div className={styles.text}>
              <p className={styles.highlight}>
                Triangle Builders is a trusted name in construction and consulting,
                delivering excellence from foundation to finishing across Tiruppur and beyond.
              </p>
              <p>
                With decades of experience and a passion for precision, we bring innovation,
                reliability and uncompromising quality to every build. Our team of skilled
                professionals works closely with clients to ensure every detail is perfected,
                from initial planning to final handover.
              </p>
            </div>
            <motion.a
              href="#contact"
              className={styles.cta}
              onClick={(e) => handleNav(e, '#contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              GET IN TOUCH <motion.span className={styles.ctaArrow} whileHover={{ x: 4 }}><ArrowRight size={14} strokeWidth={1.5} /></motion.span>
            </motion.a>
          </motion.div>

          <motion.div
            className={styles.pillarsGrid}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.pillarCard}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.pillarIconBox}>
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.pillarTitle}>{item.title}</h3>
                  <p className={styles.pillarDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
