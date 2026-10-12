import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import styles from './Faq.module.css';

const EASE = [0.16, 1, 0.3, 1];

const faqs = [
  {
    q: "What construction services does Triangle Builders offer in Tiruppur?",
    a: "Triangle Builders provides complete turnkey building contracting, civil and structural engineering consultation, architectural planning, modern interior & elevation works, home renovations, corporation/panchayat approval assistance, and bank loan documentation support across Tiruppur and surrounding regions."
  },
  {
    q: "Where is the Triangle Builders office located?",
    a: "Our office is located at 5 - FF, Silver Complex, Sulthan Pettai, Mangalam Road, Tiruppur – 641687, Tamil Nadu. We welcome clients for in-person project consultations and architectural planning discussions."
  },
  {
    q: "Do you assist with Tiruppur Corporation and Panchayat building plan approvals?",
    a: "Yes. We prepare compliant architectural drawings, structural stability certificates, and handle documentation liaison for Tiruppur City Municipal Corporation and village panchayat building plan sanctions according to local building rules."
  },
  {
    q: "How does Triangle Builders support housing and construction bank loans?",
    a: "We provide end-to-end assistance with bank loan paperwork, including detailed civil engineer cost estimates, approved blue-print documentation, and periodic stage-wise valuation reports required by leading public and private banks."
  },
  {
    q: "Do you handle old house renovations and floor extensions in Tiruppur?",
    a: "Yes. We carry out detailed structural condition assessments, modern spatial reconfiguration, vertical/horizontal floor extensions, and exterior elevation upgrades for older residential and commercial properties."
  },
  {
    q: "How can I request a construction quote from Triangle Builders?",
    a: "You can submit an enquiry through the contact form on this website or call our team directly at +91 75300 74011 or +91 75300 74033. We will review your site dimensions, discuss your requirements, and provide a transparent, itemized estimate."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className={styles.eyebrow}>COMMON QUESTIONS</p>
          <h2 id="faq-heading" className={styles.heading}>
            FREQUENTLY ASKED <span className={styles.goldText}>QUESTIONS</span>
          </h2>
          <p className={styles.subtext}>
            Clear answers about building contracting, engineering approvals, and construction services in Tiruppur.
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`${styles.faqCard} ${isOpen ? styles.cardOpen : ''}`}
                initial={{ opacity: 0, y: 15 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * index, ease: EASE }}
              >
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className={styles.questionIcon}>
                    <HelpCircle size={18} strokeWidth={1.8} />
                  </span>
                  <span className={styles.questionText}>{item.q}</span>
                  <motion.span
                    className={styles.chevron}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className={styles.answerText}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
