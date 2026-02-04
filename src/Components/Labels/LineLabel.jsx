
import FlexColumn from '../FlexComponents/FlexColumn';
import styles from './label.module.css';

const LineLabel = ({ text,subtext,value,type="positive" }) => {
  return (
    <div className={`${styles.line_item} ${styles.total} ${type === "negative" ? styles.negative : ""}`}>
      {/* <div className={styles.line_label}>
      </div> */}
      <FlexColumn>
          <span><strong>{text}</strong></span>
        <div className={styles.line_value}>{subtext}</div>
      </FlexColumn>
        <h3 className={styles.line_value}>{value}</h3>
    </div>
  );
}

export default LineLabel;