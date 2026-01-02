
import styles from './loader.module.css';

const RefreshIndicator = ({ when=false,text="Refreshing data..." }) => {
  return (
    <div className={`${styles.refresh_indicator} ${when ? styles.active : ""}`} id="refreshIndicator">
      <div className={styles.refresh_spinner}></div>
      <div className={styles.refresh_text}>{text}</div>
    </div>
  );
}

export default RefreshIndicator;