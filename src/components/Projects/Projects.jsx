import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { projects } from '../../data/siteData';
import buildingImg from '../../assets/building.png';
import styles from './Projects.module.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Projects() {
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  // Extract unique sorted years descending
  const years = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);
    return ['ALL', ...unique];
  }, []);

  // Filter projects by touched/selected year
  const filteredProjects = useMemo(() => {
    if (selectedYear === 'ALL') return projects;
    return projects.filter((p) => p.year === selectedYear);
  }, [selectedYear]);

  const prev = () => setActive((p) => (p === 0 ? filteredProjects.length - 1 : p - 1));
  const next = () => setActive((p) => (p === filteredProjects.length - 1 ? 0 : p + 1));

  // Reset active index and scroll position when filter changes
  useEffect(() => {
    setActive(0);
    cardRefs.current = [];
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedYear]);

  // Center active card in carousel view
  useEffect(() => {
    const cardEl = cardRefs.current[active];
    const container = carouselRef.current;
    if (cardEl && container) {
      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [active, filteredProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filteredProjects.length]);

  // Drag handling
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <p className={styles.eyebrow}>OUR PORTFOLIO</p>
            <h2 className={styles.heading}>
              COMPLETED <span className={styles.goldText}>PROJECTS</span>
            </h2>
          </div>
          <div className={styles.controls}>
            <motion.button onClick={prev} className={styles.controlBtn} aria-label="Previous project" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ChevronLeft size={18} /></motion.button>
            <motion.button onClick={next} className={styles.controlBtn} aria-label="Next project" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ChevronRight size={18} /></motion.button>
          </div>
        </motion.div>

        {/* Year Filter Tabs */}
        <div className={styles.yearFilterBar}>
          <div className={styles.yearFilters} role="tablist" aria-label="Filter completed projects by year">
            {years.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.yearTab} ${isSelected ? styles.yearTabActive : ''}`}
                  onClick={() => setSelectedYear(yr)}
                >
                  <span>{yr}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          ref={carouselRef}
          className={styles.carousel}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ cursor: 'grab' }}
          tabIndex={0}
          aria-label="Completed projects carousel"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isActive = i === active;
              const projectName = project.name || (project.title ? project.title.split('-')[0].trim() : 'Project');
              const locationName = project.location || (project.title && project.title.includes('-') ? project.title.split('-')[1].trim() : null);

              return (
                <motion.div
                  key={`${project.year}-${projectName}-${i}`}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.02 : 0.95,
                    y: isActive ? -2 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  onClick={() => setActive(i)}
                  whileHover={{ y: isActive ? -4 : -2 }}
                >
                  <button
                    type="button"
                    className={styles.yearBadge}
                    title={`Click to filter year ${project.year}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedYear(project.year);
                    }}
                  >
                    {project.year}
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visualLink}
                    aria-label={`View photos for ${projectName}'s project in ${locationName || 'Tiruppur'}`}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                  >
                    <div className={styles.visual}>
                      <motion.img
                        src={project.image || buildingImg}
                        alt={`${projectName}'s project in ${locationName || 'Tiruppur'} - Triangle Builders`}
                        className={styles.projectImg}
                        animate={{ scale: isActive ? 1.03 : 1 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        whileHover={{ scale: 1.04 }}
                        loading="lazy"
                        width="500"
                        height="320"
                        onError={(e) => {
                          e.currentTarget.src = buildingImg;
                        }}
                      />
                      <div className={styles.overlay}>
                        <span className={styles.viewBadge}>Photos ↗</span>
                      </div>
                    </div>
                  </a>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.projectName} title={projectName}>
                      {projectName}
                    </h3>
                    <div className={styles.cardMeta}>
                      {locationName && (
                        <span className={styles.location} title={locationName}>
                          <MapPin size={12} className={styles.locIcon} />
                          {locationName}
                        </span>
                      )}
                      <span className={styles.area}>{project.area}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 1 && (
          <div className={styles.dots}>
            {filteredProjects.map((_, i) => (
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
        )}
      </div>
    </section>
  );
}
