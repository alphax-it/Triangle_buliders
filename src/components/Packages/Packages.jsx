import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Shield, 
  Award, 
  Gem, 
  Crown, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { 
  packagesSummary, 
  packagesComparison, 
  packageBenefits, 
  packageNotes 
} from '../../data/packagesData';
import styles from './Packages.module.css';

const EASE = [0.16, 1, 0.3, 1];

const getPackageIcon = (id) => {
  switch (id) {
    case 'silver':
      return <Shield size={24} strokeWidth={2.2} />;
    case 'gold':
      return <Award size={24} strokeWidth={2.2} />;
    case 'diamond':
      return <Gem size={24} strokeWidth={2.2} />;
    case 'platinum':
    default:
      return <Crown size={24} strokeWidth={2.2} />;
  }
};

const getBtnStyle = (id) => {
  if (id === 'silver') return styles.quoteBtnOutline;
  if (id === 'diamond') return styles.quoteBtnDark;
  return styles.quoteBtn;
};

export default function Packages() {
  const [showFullComparison, setShowFullComparison] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.15 });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.1 });

  const toggleExpand = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const handleSelectPackage = useCallback((pkgName) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const messageField = document.querySelector('#contact textarea, #contact input[name="service"]');
      if (messageField) {
        messageField.focus();
      }
    }
  }, []);

  return (
    <section className={styles.section} id="packages">
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={styles.eyebrow}>CONSTRUCTION PACKAGES</span>
          <h2 className={styles.title}>
            OUR BUILDING <span className={styles.goldText}>PACKAGES</span>
          </h2>
          <p className={styles.subtitle}>
            Transparent, all-inclusive construction specifications with genuine branded materials, 
            IS 456 standard execution, and fixed per sq.ft pricing from Silver to Platinum.
          </p>
        </motion.div>

        {/* 4 Packages Cards Grid */}
        <div ref={cardsRef} className={styles.cardsGrid}>
          {packagesSummary.map((pkg, idx) => {
            const isPlatinum = pkg.id === 'platinum';
            const isExpanded = expandedCard === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                className={`${styles.packageCard} ${isPlatinum ? styles.packageCardFeatured : ''} ${isExpanded ? styles.cardMobileExpanded : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: EASE }}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Mobile Tap Header */}
                <div 
                  className={styles.mobileSummaryHeader}
                  onClick={() => toggleExpand(pkg.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  <div className={styles.mobileLeft}>
                    <div className={styles.iconWrapperSmall}>
                      {getPackageIcon(pkg.id)}
                    </div>
                    <div>
                      <h3 className={styles.packageNameMobile}>{pkg.name}</h3>
                      <p className={styles.packageTaglineMobile}>{pkg.tagline}</p>
                    </div>
                  </div>
                  <div className={styles.mobileRight}>
                    <div className={styles.mobilePrice}>
                      <span className={styles.currency}>₹</span>
                      <span className={styles.priceAmountMobile}>{pkg.rate}</span>
                      <span className={styles.priceUnitMobile}>/ sq.ft</span>
                    </div>
                    <div className={`${styles.mobileChevron} ${isExpanded ? styles.chevronRotated : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Desktop Card Header (Hidden on Mobile) */}
                <div className={styles.desktopCardHeader}>
                  <div className={styles.iconWrapper}>
                    {getPackageIcon(pkg.id)}
                  </div>
                  <div className={styles.cardTitles}>
                    <h3 className={styles.packageName}>{pkg.name}</h3>
                    <p className={styles.packageTagline}>{pkg.tagline}</p>
                  </div>
                </div>

                {/* Desktop Price Box (Hidden on Mobile) */}
                <div className={styles.desktopPriceBox}>
                  <div className={styles.priceRow}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.priceAmount}>{pkg.rate}</span>
                    <span className={styles.priceUnit}>/ {pkg.unit}</span>
                  </div>
                  <p className={styles.priceHighlight}>{pkg.highlight}</p>
                </div>

                {/* Details Section: Always visible on Desktop, Collapsible on Mobile */}
                <div className={`${styles.collapsibleBody} ${isExpanded ? styles.collapsibleOpen : ''}`}>
                  <p className={styles.mobileHighlight}>{pkg.highlight}</p>
                  <ul className={styles.highlightsList}>
                    {pkg.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className={styles.highlightItem}>
                        <Check size={16} className={styles.checkIcon} strokeWidth={2.6} />
                        <div>
                          <span className={styles.itemLabel}>{point.label}:</span>
                          <span className={styles.itemValue}>{point.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      className={`${styles.quoteBtn} ${getBtnStyle(pkg.id)}`}
                      onClick={() => handleSelectPackage(pkg.name)}
                    >
                      <span>Choose {pkg.name}</span>
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Toggle Button */}
        <div className={styles.toggleSection}>
          <button
            type="button"
            className={styles.compareToggleBtn}
            onClick={() => setShowFullComparison((prev) => !prev)}
            aria-expanded={showFullComparison}
          >
            <FileText size={17} />
            <span>{showFullComparison ? 'Hide 4-Package Comparison Matrix' : 'View Full 23-Point 4-Package Material Matrix'}</span>
            {showFullComparison ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Detailed 23-Point Comparison Table (Silver, Gold, Diamond, Platinum) */}
        <AnimatePresence>
          {showFullComparison && (
            <motion.div
              className={styles.tableContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className={styles.tableHeaderBar}>
                <div>
                  <h3 className={styles.tableTitle}>Complete Material &amp; Work Specification</h3>
                  <p className={styles.subtitle} style={{ fontSize: '13px', margin: 0 }}>
                    Official Triangle Builders Quotation Breakdown (Valid 30–60 Days)
                  </p>
                </div>
                <span className={styles.validityNote}>All 4 Packages Side-by-Side</span>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr>
                      <th className={styles.colSno}>S.No</th>
                      <th className={styles.colMaterial}>Material / Work Item</th>
                      <th className={styles.colSilver}>
                        Silver
                        <span className={styles.badgeSilver}>₹2,000 / sft</span>
                      </th>
                      <th className={styles.colGold}>
                        Gold
                        <span className={styles.badgeGold}>₹2,300 / sft</span>
                      </th>
                      <th className={styles.colDiamond}>
                        Diamond
                        <span className={styles.badgeDiamond}>₹2,500 / sft</span>
                      </th>
                      <th className={styles.colPlatinum}>
                        Platinum
                        <span className={styles.badgePlatinum}>₹2,800 / sft</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packagesComparison.map((row) => (
                      <tr key={row.sno}>
                        <td className={styles.colSno}>{row.sno}</td>
                        <td className={styles.colMaterial}>{row.material}</td>
                        <td className={styles.colSilver}>{row.silver}</td>
                        <td className={styles.colGold}>{row.gold}</td>
                        <td className={styles.colDiamond}>{row.diamond}</td>
                        <td className={styles.colPlatinum}>
                          <strong>{row.platinum}</strong>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: 'var(--creamDark)', fontWeight: 800 }}>
                      <td colSpan={2} style={{ textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Basic Rate per Sq.Ft
                      </td>
                      <td style={{ color: 'var(--text)', fontSize: '14px' }}>₹ 2,000 / S.Ft</td>
                      <td style={{ color: 'var(--deepGold)', fontSize: '14px' }}>₹ 2,300 / S.Ft</td>
                      <td style={{ color: 'var(--text)', fontSize: '15px' }}>₹ 2,500 / S.Ft</td>
                      <td style={{ color: 'var(--deepGold)', fontSize: '16px' }}>₹ 2,800 / S.Ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits & Scope Notes */}
        <div className={styles.bottomGrid}>
          <div className={styles.benefitsCard}>
            <div className={styles.boxHeader}>
              <ShieldCheck size={20} />
              <span>Benefits of Choosing Triangle Builders</span>
            </div>
            <ul className={styles.simpleList}>
              {packageBenefits.map((item, idx) => (
                <li key={idx}>
                  <Check size={16} strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.notesCard}>
            <div className={styles.boxHeader}>
              <Info size={20} />
              <span>General Terms &amp; Scope</span>
            </div>
            <ul className={styles.simpleList}>
              {packageNotes.map((note, idx) => (
                <li key={idx} className={styles.noteItem}>
                  <span>•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
