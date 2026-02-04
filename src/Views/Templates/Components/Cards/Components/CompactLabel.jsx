
import styles from '../cards.module.css';

const CompactLabel = ({ text }) => {
  return (
  <div className={styles.card_compact_label}>{text}</div>
  );
}

export default CompactLabel;