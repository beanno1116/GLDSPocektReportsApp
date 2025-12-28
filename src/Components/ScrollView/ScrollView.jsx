
import styles from './scrollView.module.css';

const ScrollView = ({ flex="",direction="y-axis", children }) => {
  return (
    <div className={`${styles.scroll_container} ${flex === "" ? "" : styles.flex_1}`}>
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default ScrollView;