
import FlexColumn from '../FlexComponents/FlexColumn';
import styles from './label.module.css';

const LineLabel = ({ label,value,type="positive" }) => {
  return (
    <div className={`${styles.line_item} ${styles.total} ${type === "negative" ? styles.negative : ""}`}>
      {/* <div className={styles.line_label}>
      </div> */}
      <FlexColumn>
          <span><strong>{label}</strong></span>
        <div className={styles.line_value}>{value}</div>
      </FlexColumn>
        <h3 className={styles.line_value}>$4K</h3>
    </div>
  );
}

export default LineLabel;