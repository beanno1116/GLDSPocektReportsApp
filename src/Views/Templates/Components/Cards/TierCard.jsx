
import styles from './cards.module.css';

const TierCard = ({ title,expected,ending,...props }) => {

  const renderValue = (value) => {
    if (value.includes("-")){
      return <div className={`${styles.tier_stat_value} ${styles.negative}`}>{value}</div>
    }
    return <div className={`${styles.tier_stat_value}`}>{value}</div>
  }

  const renderStatus = () => {
    if (expected === ending) {
      return <div className={`${styles.tier_count} ${styles.positive}`}>Balanced</div>
    }
    return <div className={styles.tier_count}>Discrepency</div>
  }

  return (
    <div className={`${styles.tier_card} ${styles.platinum}`}>
      <div className={styles.tier_header}>
        <div className={styles.tier_name}>{title}</div>
        {renderStatus()}
      </div>
      <div className={styles.tier_details}>
        <div className={styles.tier_stat}>
          <div className={styles.tier_stat_label}>Expected</div>
          {renderValue(expected)}
          {/* <div className={styles.tier_stat_value}>{expected}</div> */}
        </div>
        <div className={styles.tier_stat}>
          <div className={styles.tier_stat_label}>Ending</div>
          {renderValue(ending)}
          {/* <div className={styles.tier_stat_value}>{ending}</div> */}
        </div>
      </div>
  </div>
  );
}

export default TierCard;