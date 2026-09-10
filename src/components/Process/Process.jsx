import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { processSteps } from '../../data/siteData';
import { ConsultIcon, PlanIcon, BuildIcon, HandoverIcon } from './ProcessIcons';
import styles from './Process.module.css';

const EASE = [0.16, 1, 0.3, 1];
const iconMap = [ConsultIcon, PlanIcon, BuildIcon, HandoverIcon];

const expandedTexts = [
  'We begin by understanding your requirements, budget and vision to define the right direction for your project.',
  'Our engineers and designers prepare detailed planning, design and execution strategy.',
  'Our experienced team manages construction with quality control, precision and continuous supervision.',
  'After final inspection and quality checks, we hand over your completed project with confidence.',
];

export default function Process() {
  const [active, setActive] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ threshold: 0.15 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggle = (i) => setActive((prev) => (prev === i ? null : i));

  const getGridTemplate = () => {
    if (!isDesktop || active === null) return '1fr 1fr 1fr 1fr';
    const cols = ['0.75fr', '0.75fr', '0.75fr', '0.75fr'];
    cols[active] = '1.8fr';
    return cols.join(' ');
  };

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>OUR PROCESS</p>
            <h2 className={styles.heading}>
              HOW WE <span className={styles.gold}>WORK</span>
            </h2>
          </div>
          <motion.p
            className={styles.headerDesc}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            From the first conversation to final handover, we follow a structured process to
            deliver every project with clarity, precision and quality.
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          className={styles.grid}
          style={{ gridTemplateColumns: getGridTemplate() }}
        >
          {processSteps.map((step, i) => {
            const isActive = active === i;
            return (
              <Step
                key={step.id}
                step={step}
                index={i}
                inView={gridInView}
                isActive={isActive}
                onToggle={() => toggle(i)}
                expandedText={expandedTexts[i]}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Step({ step, index, inView, isActive, onToggle, expandedText }) {
  const Icon = iconMap[index];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      layout
    >
      <motion.div
        className={styles.iconBox}
        animate={
          isActive ? { scale: 1.08 } : hovered ? { scale: 1.05 } : { scale: 1 }
        }
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Icon isHovered={hovered || isActive} />
      </motion.div>

      <div className={styles.num}>{step.id}</div>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.desc}>{step.description}</p>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="expanded"
            className={styles.expanded}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 6, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className={styles.expandedText}>{expandedText}</p>
            <motion.span
              className={styles.cta}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
            >
              START YOUR PROJECT <ArrowRight size={14} strokeWidth={2} />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        className={styles.arrow}
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <ArrowRight size={16} strokeWidth={1.8} />
      </motion.span>

      <motion.div
        className={styles.goldAccent}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay: index * 0.12 + 0.25, ease: EASE }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}
