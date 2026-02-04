
import styles from './cards.module.css';

const MetricCard = ({ title,value,delta,icon }) => {
  return (
    <div className={styles.metric_card}>
        <div className={styles.metric_icon}>{icon}</div>
        <div className={styles.metric_label}>{title}</div>
        <div className={styles.metric_value}>{value}</div>
        <div className={`${styles.metric_change} ${styles.positive}`}>{delta}</div>
        {/* <div className={styles.metric_change}>↑ 248 this month</div> */}
    </div>
  );
}

export default MetricCard;