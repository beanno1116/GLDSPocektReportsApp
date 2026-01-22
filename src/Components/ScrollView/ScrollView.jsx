
import styles from './scrollView.module.css';

const ScrollView = ({ type="relative",flex="",direction="y-axis", children }) => {

  if (type === "absolute"){
    return (
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
      </div>
    )
  }

  return (
    <div className={`${styles.scroll_container} ${flex === "" ? "" : styles.flex_1}`}>
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default ScrollView;