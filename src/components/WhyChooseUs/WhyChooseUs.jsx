import { motion } from 'framer-motion';
import { Shield, Clock, Users, CheckCircle } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import styles from './WhyChooseUs.module.css';

const benefits = [
  {
    title: 'QUALITY ASSURANCE',
    description: 'We use best materials and ensure superior quality.',
    icon: Shield,
  },
  {
    title: 'ON-TIME DELIVERY',
    description: 'We value your time and always deliver on schedule.',
    icon: Clock,
  },
  {
    title: 'EXPERIENCED TEAM',
    description: 'Skilled professionals with years of experience.',
    icon: Users,
  },
  {
    title: 'CUSTOMER SATISFACTION',
    description: 'Your satisfaction is our highest priority.',
    icon: CheckCircle,
  },
];

const iconColors = ['#F4B900', '#D4960A', '#E8A817', '#C8A030'];
const EASE = [0.16, 1, 0.3, 1];

export default function WhyChooseUs() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ threshold: 0.15 });

  return (
    <section className={styles.section} id="whyus">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className={styles.eyebrow}>WHY</p>
          <h2 className={styles.heading}>
            CHOOSE <span className={styles.goldText}>US?</span>
          </h2>
        </motion.div>

        <div ref={gridRef} className={styles.grid}>
          {benefits.map((b, i) => (
            <BenefitItem key={i} benefit={b} index={i} color={iconColors[i]} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitItem({ benefit, index, color, inView }) {
  const Icon = benefit.icon;
  return (
    <motion.div
      className={styles.benefitWrapper}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
    >
      <div className={styles.benefit}>
        <div className={styles.benefitContent}>
          <div className={styles.iconCircle} style={{ background: `${color}18`, color }}>
            <Icon size={26} strokeWidth={1.6} />
          </div>
          <h4 className={styles.benefitTitle}>{benefit.title}</h4>
          <p className={styles.benefitDesc}>{benefit.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
