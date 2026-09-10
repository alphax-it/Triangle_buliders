import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Maximize, Users } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { stats } from '../../data/siteData';
import styles from './Stats.module.css';

const icons = [Building2, Maximize, Users];
const EASE = [0.16, 1, 0.3, 1];

function formatCount(value, raw) {
  return Math.round(raw).toLocaleString('en-IN');
}

function StatItem({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const raw = useCountUp(stat.value, inView, 1200);
  const Icon = icons[index % icons.length];
  const display = formatCount(stat.value, raw);

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <div className={styles.iconBox}>
        <Icon size={22} strokeWidth={1.4} />
      </div>
      <div className={styles.value}>{stat.prefix || ''}{display}{stat.suffix}</div>
      <div className={styles.label}>{stat.label}</div>
    </motion.div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [floatY, setFloatY] = useState(-8);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 640) setFloatY(-4);
      else if (w <= 768) setFloatY(-6);
      else setFloatY(-8);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className={styles.stats} id="stats">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.div
          className={styles.floatWrap}
          animate={
            inView && !shouldReduceMotion
              ? { y: [0, floatY, 0] }
              : { y: 0 }
          }
          transition={
            inView && !shouldReduceMotion
              ? {
                  y: {
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: 0.7,
                  },
                }
              : {}
          }
          style={{ willChange: 'transform' }}
        >
          <motion.div
            className={styles.panel}
            animate={
              inView && !shouldReduceMotion
                ? {
                    boxShadow: [
                      '0 15px 40px rgba(0,0,0,0.04)',
                      '0 22px 50px rgba(0,0,0,0.055)',
                      '0 15px 40px rgba(0,0,0,0.04)',
                    ],
                  }
                : {}
            }
            transition={
              inView && !shouldReduceMotion
                ? {
                    boxShadow: {
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: 0.7,
                    },
                  }
                : {}
            }
          >
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
