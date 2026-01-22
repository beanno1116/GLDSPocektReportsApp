
import Card from './Card';
import styles from './cards.module.css';

const TrendCard = ({ full=false,m="0 0 1.5rem 0",children }) => {
  return (
    <div className={`${styles.trend_card} ${full ? styles.card_full : ""}` } style={{margin:m}}>
      {children}
    </div>
  );
}

export default TrendCard;