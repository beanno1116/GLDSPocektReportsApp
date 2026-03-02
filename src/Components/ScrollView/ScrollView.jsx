
import styles from './scrollView.module.css';

const ScrollView = ({ type="relative",flex="",direction="y-axis",bottom="107px",m="",p="", children }) => {

  if (type === "absolute"){
    return (
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
      </div>
    )
  }

  return (
    <div className={`${styles.scroll_container} ${flex === "" ? "" : styles.flex_1}`} style={{margin:m}}>
      <div className={`${styles.scroll_view} ${direction === "x-axis" ? styles.horizontal_scroll : ""}`}>
        {children}
        <div style={{height:bottom,width:"100%"}}></div>
      </div>
    </div>
  );
}

export default ScrollView;