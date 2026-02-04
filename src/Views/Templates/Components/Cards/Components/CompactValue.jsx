
import styles from '../cards.module.css';

const CompactValue = ({ text}) => {
  return (
  <div className={styles.card_compact_value}>
    {text}
    {/* <span class="badge primary">+24%</span> */}
  </div>
  );
}

export default CompactValue;