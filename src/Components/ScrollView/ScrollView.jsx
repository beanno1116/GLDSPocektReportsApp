
import styles from './scrollView.module.css';

const ScrollView = ({ direction="y-axis", children }) => {
  return (
    <div className={styles.scroll_container}>
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default ScrollView;