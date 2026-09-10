import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

export default function SectionReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
