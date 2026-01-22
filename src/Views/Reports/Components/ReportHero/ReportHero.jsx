
import styles from './reportHero.module.css';

const ReportHero = ({ badge,title,period,description,date="December 37th 2025" }) => {
  return (
    <div className={styles.report_hero}>
      <div className={styles.report_meta}>
          <div className={styles.meta_badge}>{badge}</div>
          <div className={`${styles.meta_badge} ${styles.period}`}>{period}</div>
      </div>
      <div className={styles.report_title}>{title}</div>
      <div className={styles.report_subtitle}>
          {description}
          {/* Comprehensive analysis of your loyalty program's performance at a store level and engagement metrics */}
      </div>
      <div className={styles.report_date}>Generated on {date}</div>
  </div>
  );
}

export default ReportHero;