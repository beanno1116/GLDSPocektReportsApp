
import styles from './scrollView.module.css';

const ScrollView = ({ children }) => {
  return (
    <div className={styles.scroll_container}>
      <div className={styles.scroll_view}>
        {children}
      </div>
    </div>
  );
}

export default ScrollView;