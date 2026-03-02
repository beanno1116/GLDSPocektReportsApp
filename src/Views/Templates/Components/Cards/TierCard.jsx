
import styles from './cards.module.css';


const CompareDetails = ({ leftValue,rightValue }) => {

  const renderValue = (value) => {
    if (value.includes("-")){
      return <div className={`${styles.tier_stat_value} ${styles.negative}`}>{value}</div>
    }
    return <div className={`${styles.tier_stat_value}`}>{value}</div>
  }

  return (
    <div className={styles.tier_details}>
      <div className={styles.tier_stat}>
        <div className={styles.tier_stat_label}>Expected</div>
        {renderValue(leftValue)}
        {/* <div className={styles.tier_stat_value}>{expected}</div> */}
      </div>
      <div className={styles.tier_stat}>
        <div className={styles.tier_stat_label}>Ending</div>
        {renderValue(rightValue)}
        {/* <div className={styles.tier_stat_value}>{ending}</div> */}
      </div>
    </div>
  )
}

const TierCard = ({ title,leftValue,rightValue,children,m="0",p="0" }) => {

  

  const renderStatus = () => {
    if (leftValue === rightValue) {
      return <div className={`${styles.tier_count} ${styles.positive}`}>Balanced</div>
    }
    return <div className={styles.tier_count}>Discrepency</div>
  }

  return (
    <div className={`${styles.tier_card} ${styles.platinum}`} style={{margin:m,padding:p}}>
      <div className={styles.tier_header}>
        <div className={styles.tier_name}>{title}</div>
        {renderStatus()}
      </div>
      {children}
  </div>
  );
}

TierCard.CompareDetails = CompareDetails;

export default TierCard;