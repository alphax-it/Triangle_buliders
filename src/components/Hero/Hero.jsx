import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mouse } from 'lucide-react';
import buildingImg from '../../assets/building.png';
import styles from './Hero.module.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const visualRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 50, damping: 20 });
  const springY = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined' || window.innerWidth < 768) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16; // ±8px
      const y = (e.clientY / window.innerHeight - 0.5) * 10; // ±5px
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my, shouldReduceMotion]);

  // subtle scroll parallax
  useEffect(() => {
    if (shouldReduceMotion) return;
    const onScroll = () => {
      if (!visualRef.current) return;
      const rect = visualRef.current.getBoundingClientRect();
      const offset = Math.max(-10, Math.min(10, (window.innerHeight - rect.top) * 0.02 - 5));
      visualRef.current.style.setProperty('--parallax-y', `${offset}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [shouldReduceMotion]);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            >
              BUILDING A <span className={styles.goldText}>BETTER TOMORROW</span>
            </motion.p>

            <h1 className={styles.title}>
              <motion.span
                className={styles.line}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
              >
                WE BUILD
              </motion.span>
              <motion.span
                className={`${styles.line} ${styles.golden}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
              >
                YOUR DREAMS
              </motion.span>
            </h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
            >
              From concept to creation, we build world-class spaces with quality,
              on-time delivery and trust.
            </motion.p>

            <motion.div
              className={styles.buttons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
            >
              <motion.a
                href="#services"
                className={styles.btnPrimary}
                onClick={(e) => handleNav(e, '#services')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                EXPLORE OUR SERVICES <motion.span className={styles.btnArrow} whileHover={{ x: 4 }}><ArrowRight size={14} strokeWidth={2} /></motion.span>
              </motion.a>
              <motion.a
                href="#projects"
                className={styles.btnText}
                onClick={(e) => handleNav(e, '#projects')}
                whileHover={{ x: 2 }}
              >
                VIEW OUR PROJECTS <motion.span className={styles.btnArrow} whileHover={{ x: 4 }}><ArrowRight size={13} strokeWidth={2} /></motion.span>
              </motion.a>
            </motion.div>

            <motion.div
              className={styles.scrollHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            >
              <div className={styles.scrollIcon}><Mouse size={18} strokeWidth={1.5} /></div>
              <span>SCROLL DOWN</span>
            </motion.div>
          </div>

          <motion.div
            ref={visualRef}
            className={styles.visual}
            style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <motion.div
              className={styles.imgWrap}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
            >
              <motion.img
                src={buildingImg}
                alt="Triangle Builders modern luxury villa"
                className={styles.heroImg}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
