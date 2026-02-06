
import styles from './cards.module.css';

const CardDetails = ({text,subText}) => {
  return (
    <div className={styles.category_info}>
      <div className={styles.category_name}>{text}</div>
      {subText !== "" && <div className={styles.category_subtitle}>{subText}</div>}
    </div>
  )
}

const CardMetric = ({value,delta}) => {
  return (
    <div className={styles.category_metric}>
      <div className={styles.category_value}>${value}</div>
      <div className={`${styles.category_change} ${delta < 0 ? styles.down : styles.up}`}>{delta < 0 ? `↓ ${delta}` : `↑ ${delta}`}</div>
    </div>
  )
}

const CardIcon = ({icon}) => {
  return (
    <div className={styles.category_icon}>
      {icon}
    </div>
  )
}

const CardBadgeCount = ({selected,total}) => {
  return (
    <div className={styles.selection_badge}>
      {selected} / {total}
    </div>
  )
}

const LabelCard = ({ children,active=false,onClick,...props }) => {
  return (
    <div className={`${styles.category_item} ${active ? styles.active : ""}`} onClick={onClick}>
       {children}
    </div>
  );
}

LabelCard.Details = CardDetails;
LabelCard.Metric = CardMetric;
LabelCard.Icon = CardIcon;
LabelCard.CountBadge = CardBadgeCount;
export default LabelCard;