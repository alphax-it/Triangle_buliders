import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { services } from '../../data/siteData';
import { BuildingContractorIcon, ConsultingEngineerIcon, InteriorElevationIcon, RenovationIcon, ApprovalIcon, LoanAssistanceIcon } from './ServiceIcons';
import styles from './Services.module.css';

const EASE = [0.22, 1, 0.36, 1];
const iconMap = [BuildingContractorIcon, ConsultingEngineerIcon, InteriorElevationIcon, RenovationIcon, ApprovalIcon, LoanAssistanceIcon];

export default function Services() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ threshold: 0.1 });

  const handleCtaClick = useCallback((e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>WHAT WE DO</span>
            <h2 className={styles.title}>OUR SERVICES</h2>
            <p className={styles.subtitle}>
              End-to-end construction and consulting solutions tailored to your needs.
            </p>
          </div>
          <a href="#contact" className={styles.viewAll} onClick={handleCtaClick}>
            VIEW ALL SERVICES <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>

        <div ref={gridRef} className={styles.grid}>
          {services.map((s, i) => {
            const Icon = iconMap[i];
            const isActive = active === i;
            const isHover = hovered === i;
            return (
              <motion.div
                key={s.id}
                className={styles.cardWrapper}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              >
                <div
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  onClick={() => setActive((prev) => (prev === i ? null : i))}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Uiverse rising color bubble */}
                  <div className={styles.hoverBubble} />

                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>
                      <Icon isHovered={isActive || isHover} />
                    </div>
                    <span className={styles.cardNum}>{s.id}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.description}</p>

                  <div className={styles.cardBottom}>
                    <span className={styles.cardArrow}>
                      <ArrowRight size={16} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
