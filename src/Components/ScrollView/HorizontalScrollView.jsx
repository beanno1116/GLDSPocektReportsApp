
import styles from './scrollView.module.css';

const HorizontalScrollView = ({ children }) => {
  return (

      <div className={`${styles.horizontal_scroll}`}>
        {children}
      </div>
  );
}

export default HorizontalScrollView;