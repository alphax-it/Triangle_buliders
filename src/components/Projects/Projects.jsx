import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { projects } from '../../data/siteData';
import buildingImg from '../../assets/building.png';
import styles from './Projects.module.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Projects() {
  const [active, setActive] = useState(2);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const carouselRef = useRef(null);

  const prev = () => setActive((p) => (p === 0 ? projects.length - 1 : p - 1));
  const next = () => setActive((p) => (p === projects.length - 1 ? 0 : p + 1));

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const el = carouselRef.current;
    if (!el) return;
    // only when carousel is in viewport, listen?
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // drag handling
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <p className={styles.eyebrow}>OUR PROJECTS</p>
            <h2 className={styles.heading}>
              FEATURED <span className={styles.goldText}>PROJECTS</span>
            </h2>
          </div>
          <div className={styles.controls}>
            <motion.button onClick={prev} className={styles.controlBtn} aria-label="Previous" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ChevronLeft size={18} /></motion.button>
            <motion.button onClick={next} className={styles.controlBtn} aria-label="Next" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ChevronRight size={18} /></motion.button>
          </div>
        </motion.div>

        <motion.div
          ref={carouselRef}
          className={styles.carousel}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ cursor: 'grab' }}
          tabIndex={0}
          aria-label="Project carousel"
        >
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                animate={{
                  scale: isActive ? 1.02 : 0.95,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.45, ease: EASE }}
                onClick={() => setActive(i)}
                whileHover={{ y: isActive ? -4 : -2 }}
              >
                <div className={styles.yearBadge}>{project.year}</div>
                <div className={styles.visual}>
                  <motion.img
                    src={buildingImg}
                    alt={`Project ${project.year}`}
                    className={styles.projectImg}
                    animate={{ scale: isActive ? 1.03 : 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    whileHover={{ scale: 1.04 }}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.area}>{project.area}</span>
                  <span className={styles.value}>{project.value}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className={styles.dots}>
          {projects.map((_, i) => (
            <motion.button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
