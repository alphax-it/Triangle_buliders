import { motion } from 'framer-motion';

const gold = '#D99A00';
const EASE = [0.22, 1, 0.36, 1];

function Path({ d, delay = 0, strokeWidth = 1.5, ...props }) {
  return (
    <motion.path
      d={d}
      stroke={gold}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...props}
    />
  );
}

function Rect({ x, y, width, height, rx = 0, delay = 0, strokeWidth = 1.5, ...props }) {
  return (
    <motion.rect
      x={x} y={y} width={width} height={height} rx={rx}
      stroke={gold}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...props}
    />
  );
}

function Circle({ cx, cy, r, delay = 0, strokeWidth = 1.5, ...props }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      stroke={gold}
      strokeWidth={strokeWidth}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...props}
    />
  );
}

export function BuildingContractorIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Path key={`bc1-${k}`} d="M6 28 H26" delay={0} />
      <Path key={`bc2-${k}`} d="M10 14 V28" delay={0.06} />
      <Path key={`bc3-${k}`} d="M22 14 V28" delay={0.06} />
      <Path key={`bc4-${k}`} d="M6 14 H26" delay={0.1} />
      <Path key={`bc5-${k}`} d="M6 14 L16 6 L26 14" delay={0.14} />
      <Path key={`bc6-${k}`} d="M16 6 V14" delay={0.18} strokeWidth={1.2} />
      <Path key={`bc7-${k}`} d="M10 20 H14 V28" delay={0.22} strokeWidth={1.2} />
      <Path key={`bc8-${k}`} d="M18 20 H22" delay={0.26} strokeWidth={1.2} />
      <Path key={`bc9-${k}`} d="M18 24 H22" delay={0.28} strokeWidth={1.2} />
    </svg>
  );
}

export function ConsultingEngineerIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Path key={`ce1-${k}`} d="M5 7 H27" delay={0} />
      <Path key={`ce2-${k}`} d="M5 7 V25 H27 V7" delay={0.06} rx={1} />
      <Path key={`ce3-${k}`} d="M12 7 V25" delay={0.12} strokeWidth={1.2} />
      <Path key={`ce4-${k}`} d="M5 16 H27" delay={0.16} strokeWidth={1.2} />
      <Path key={`ce5-${k}`} d="M8 10 H10" delay={0.2} strokeWidth={1.8} />
      <Path key={`ce6-${k}`} d="M8 13 H10" delay={0.22} strokeWidth={1.8} />
      <Path key={`ce7-${k}`} d="M15 19 L18 22 L24 15" delay={0.26} strokeWidth={1.6} />
      <Path key={`ce8-${k}`} d="M3 28 H29" delay={0.3} strokeWidth={1} />
    </svg>
  );
}

export function InteriorElevationIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Rect key={`ie1-${k}`} x="5" y="5" width="22" height="22" rx="1.5" delay={0} />
      <Path key={`ie2-${k}`} d="M5 13 H27" delay={0.08} strokeWidth={1.2} />
      <Path key={`ie3-${k}`} d="M10 17 H16 V24" delay={0.14} />
      <Path key={`ie4-${k}`} d="M20 17 V24 H24" delay={0.18} />
      <Path key={`ie5-${k}`} d="M10 8 H14" delay={0.22} strokeWidth={1.8} />
      <Path key={`ie6-${k}`} d="M10 10.5 H12" delay={0.24} strokeWidth={1.8} />
      <Path key={`ie7-${k}`} d="M20 8 L24 8 L24 12" delay={0.28} />
      <Path key={`ie8-${k}`} d="M22 6 V8" delay={0.3} strokeWidth={1.2} />
    </svg>
  );
}

export function RenovationIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Path key={`rn1-${k}`} d="M8 28 V14 L16 8 L24 14 V28" delay={0} />
      <Path key={`rn2-${k}`} d="M8 28 H24" delay={0.06} />
      <Path key={`rn3-${k}`} d="M14 28 V20 H18 V28" delay={0.12} />
      <Path key={`rn4-${k}`} d="M4 16 L8 12" delay={0.18} strokeWidth={1.8} />
      <Path key={`rn5-${k}`} d="M2 18 L6 14" delay={0.2} strokeWidth={1.8} />
      <Path key={`rn6-${k}`} d="M28 16 L24 12" delay={0.22} strokeWidth={1.8} />
      <Path key={`rn7-${k}`} d="M30 18 L26 14" delay={0.24} strokeWidth={1.8} />
      <Path key={`rn8-${k}`} d="M12 17 H20" delay={0.28} strokeWidth={1.2} />
      <Path key={`rn9-${k}`} d="M12 21 H20" delay={0.3} strokeWidth={1.2} />
    </svg>
  );
}

export function ApprovalIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Rect key={`ap1-${k}`} x="6" y="4" width="20" height="24" rx="1.5" delay={0} />
      <Path key={`ap2-${k}`} d="M10 10 H22" delay={0.08} strokeWidth={1.2} />
      <Path key={`ap3-${k}`} d="M10 14 H22" delay={0.12} strokeWidth={1.2} />
      <Path key={`ap4-${k}`} d="M10 18 H18" delay={0.16} strokeWidth={1.2} />
      <Path key={`ap5-${k}`} d="M10 22 H16" delay={0.2} strokeWidth={1.2} />
      <Path key={`ap6-${k}`} d="M20 20 L22 22 L26 17" delay={0.26} strokeWidth={1.8} />
    </svg>
  );
}

export function LoanAssistanceIcon({ isHovered }) {
  const k = isHovered ? 1 : 0;
  return (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28" aria-hidden="true">
      <Path key={`la1-${k}`} d="M4 28 H28" delay={0} />
      <Path key={`la2-${k}`} d="M8 28 V12 H24 V28" delay={0.06} />
      <Path key={`la3-${k}`} d="M4 12 H28" delay={0.12} />
      <Path key={`la4-${k}`} d="M8 8 L16 4 L24 8" delay={0.18} />
      <Path key={`la5-${k}`} d="M16 4 V8" delay={0.22} strokeWidth={1.2} />
      <Path key={`la6-${k}`} d="M12 18 H14 V22 H12 Z" delay={0.26} strokeWidth={1.2} />
      <Path key={`la7-${k}`} d="M18 18 H20 V22 H18 Z" delay={0.28} strokeWidth={1.2} />
      <Path key={`la8-${k}`} d="M14 20 H18" delay={0.3} strokeWidth={1.2} />
    </svg>
  );
}
