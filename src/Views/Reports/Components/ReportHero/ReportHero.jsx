
import ScrollSelector from '../../../../Components/ScrollSelector/ScrollSelector';
import styles from './reportHero.module.css';

const ReportHero = ({ badge,title,period,description,date="December 37th 2025" }) => {
  return (
    <div className={styles.report_hero}>
      <div className={styles.report_meta}>
        {/* <ScrollSelector> */}
          <ScrollSelector.BadgeItem active={true} text={"Sales"} link={"#details"} /> 
          <ScrollSelector.BadgeItem text={"Trends"} link={"#trends"} /> 
          <ScrollSelector.BadgeItem text={"Tenders"} link={"#tender"} /> 
          <ScrollSelector.BadgeItem text={"Depts"} link={"#department"} /> 
        {/* </ScrollSelector> */}
          {/* <div className={styles.meta_badge}>{badge}</div>
          <div className={`${styles.meta_badge} ${styles.period}`}>{period}</div> */}
      </div>
      <div className={styles.report_title}>{title}</div>
      <div className={styles.report_subtitle}>
          {description}
      </div>
      <div className={styles.report_date}>Generated on {date}</div>
  </div>
  );
}

export default ReportHero;