import { motion } from 'framer-motion';

const gold = '#D99A00';
const EASE = [0.16, 1, 0.3, 1];

function usePathProps(isHovered, delay = 0) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.5, delay, ease: EASE },
  };
}

export function ConsultIcon({ isHovered }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="26" height="26" aria-hidden="true">
      {/* bubble 1 */}
      <motion.rect
        key={`c1-${isHovered}`}
        x="4" y="6" width="16" height="10" rx="2.2"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0)}
      />
      {/* bubble 1 lines */}
      <motion.path
        key={`c2-${isHovered}`}
        d="M7.5 10.5 H16.5"
        stroke={gold} strokeWidth="1.4" strokeLinecap="round"
        {...usePathProps(isHovered, 0.08)}
      />
      <motion.path
        key={`c3-${isHovered}`}
        d="M7.5 13 H13.5"
        stroke={gold} strokeWidth="1.4" strokeLinecap="round"
        {...usePathProps(isHovered, 0.14)}
      />
      {/* bubble 2 */}
      <motion.rect
        key={`c4-${isHovered}`}
        x="10" y="16" width="14" height="8.5" rx="1.8"
        stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0.12)}
      />
      {/* tiny roof corner */}
      <motion.path
        key={`c5-${isHovered}`}
        d="M21 9 L24 6 L27 9"
        stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0.2)}
      />
      <motion.path
        key={`c6-${isHovered}`}
        d="M24 6 V9.5"
        stroke={gold} strokeWidth="1.3" strokeLinecap="round"
        {...usePathProps(isHovered, 0.24)}
      />
    </svg>
  );
}

export function PlanIcon({ isHovered }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="26" height="26" aria-hidden="true">
      {/* outer square */}
      <motion.rect
        key={`p1-${isHovered}`}
        x="5.5" y="5.5" width="21" height="21" rx="1.2"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0)}
      />
      {/* interior grid */}
      <motion.path
        key={`p2-${isHovered}`}
        d="M16.5 5.5 V26.5"
        stroke={gold} strokeWidth="1.4" strokeLinecap="round"
        {...usePathProps(isHovered, 0.1)}
      />
      <motion.path
        key={`p3-${isHovered}`}
        d="M5.5 16.5 H26.5"
        stroke={gold} strokeWidth="1.4" strokeLinecap="round"
        {...usePathProps(isHovered, 0.16)}
      />
      {/* inner room */}
      <motion.rect
        key={`p4-${isHovered}`}
        x="9" y="9" width="7" height="7" rx="0.6"
        stroke={gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0.22)}
      />
      {/* measurement ticks */}
      <motion.path
        key={`p5-${isHovered}`}
        d="M5.5 3.5 V5.5 M26.5 3.5 V5.5 M3.5 5.5 H5.5 M3.5 26.5 H5.5"
        stroke={gold} strokeWidth="1" strokeLinecap="round" opacity="0.7"
        {...usePathProps(isHovered, 0.28)}
      />
    </svg>
  );
}

export function BuildIcon({ isHovered }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="26" height="26" aria-hidden="true">
      {/* base */}
      <motion.path
        key={`b1-${isHovered}`}
        d="M5 26 H27"
        stroke={gold} strokeWidth="1.5" strokeLinecap="round"
        {...usePathProps(isHovered, 0.18)}
      />
      {/* left column */}
      <motion.path
        key={`b2-${isHovered}`}
        d="M9 12 V26"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round"
        {...usePathProps(isHovered, 0.05)}
      />
      {/* right column */}
      <motion.path
        key={`b3-${isHovered}`}
        d="M23 12 V26"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round"
        {...usePathProps(isHovered, 0.1)}
      />
      {/* beam */}
      <motion.path
        key={`b4-${isHovered}`}
        d="M6 12 H26"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round"
        {...usePathProps(isHovered, 0.12)}
      />
      {/* roof frame */}
      <motion.path
        key={`b5-${isHovered}`}
        d="M6 12 L16 5 L26 12"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0)}
      />
      {/* inner vertical */}
      <motion.path
        key={`b6-${isHovered}`}
        d="M16 5 V12"
        stroke={gold} strokeWidth="1.3" strokeLinecap="round"
        {...usePathProps(isHovered, 0.16)}
      />
      {/* mid beam */}
      <motion.path
        key={`b7-${isHovered}`}
        d="M9 19 H23"
        stroke={gold} strokeWidth="1.2" strokeLinecap="round" opacity="0.9"
        {...usePathProps(isHovered, 0.22)}
      />
    </svg>
  );
}

export function HandoverIcon({ isHovered }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width="26" height="26" aria-hidden="true">
      {/* doorway house */}
      <motion.path
        key={`h1-${isHovered}`}
        d="M8 26 V12 L16 6 L24 12 V26"
        stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        {...usePathProps(isHovered, 0)}
      />
      <motion.path
        key={`h2-${isHovered}`}
        d="M8 26 H24"
        stroke={gold} strokeWidth="1.5" strokeLinecap="round"
        {...usePathProps(isHovered, 0.08)}
      />
      {/* door line */}
      <motion.path
        key={`h3-${isHovered}`}
        d="M14 12 V26"
        stroke={gold} strokeWidth="1.3" strokeLinecap="round"
        {...usePathProps(isHovered, 0.14)}
      />
      {/* handle */}
      <motion.circle
        key={`h4-${isHovered}`}
        cx="17.2" cy="19" r="0.9"
        stroke={gold} strokeWidth="1.2"
        fill={gold}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.22, ease: EASE }}
      />
      {/* key */}
      <motion.g key={`h5-${isHovered}`} {...usePathProps(isHovered, 0.18)}>
        <motion.circle cx="24.5" cy="11" r="2.6" stroke={gold} strokeWidth="1.5" fill="none" {...usePathProps(isHovered, 0.2)} />
        <motion.path d="M26.3 13.2 L29 16.2" stroke={gold} strokeWidth="1.5" strokeLinecap="round" {...usePathProps(isHovered, 0.26)} />
        <motion.path d="M27.2 16.2 H28.5 M27.2 17.6 H28" stroke={gold} strokeWidth="1.2" strokeLinecap="round" {...usePathProps(isHovered, 0.3)} />
      </motion.g>
    </svg>
  );
}
