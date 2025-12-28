
import styles from './cards.module.css';

const LoadingCard = ({ ...props }) => {
  return (
    <div className={styles.card_grid}>
      <div className={`${styles.card} ${styles.card_metric} ${styles.loading}`}>
        <div className={styles.card_metric_header}>
          <span className={styles.card_metric_label}>Loading Data</span>
          <div className={styles.card_metric_icon}>⏳</div>
        </div>
        <div className={styles.card_metric_value}>---</div>
      </div>
    </div>
  );
}

export default LoadingCard;