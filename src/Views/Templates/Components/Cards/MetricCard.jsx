
import styles from './cards.module.css';


const Header = ({title,icon}) => {
  return (
    <div className={styles.card_metric_header}>
      <div className={styles.metric_label}>{title}</div>
      <div className={styles.metric_icon}>{icon}</div>
    </div>
  )
}

const Value = ({value}) => <div className={styles.metric_value}>{value}</div>

const Footer = ({delta,period}) => {
  return (
    <div className={styles.card_metric_footer}>
      <div className={`${styles.metric_change} ${styles.positive}`}>{delta}</div>
      <div className={styles.card_metric_period}>{period}</div>
    </div>
  )
}

const Title = ({text}) => <div className={styles.metric_title}>{text}</div>


const MetricCard = ({ m="0",p="1rem",accent="",children }) => {
  return (
    <div className={`${styles.metric_card} ${accent !== "" ? styles[accent] : ""}`} style={{margin:m,padding:p}}>
      {children}
    </div>
  );
}

MetricCard.Header = Header;
MetricCard.Title = Title;
MetricCard.Value = Value;
MetricCard.Footer = Footer;


export default MetricCard;