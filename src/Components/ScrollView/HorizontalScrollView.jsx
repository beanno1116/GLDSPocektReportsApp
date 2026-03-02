
import styles from './scrollView.module.css';

const HorizontalScrollView = ({ height="auto",children }) => {
  return (

      <div className={`${styles.horizontal_scroll}`} style={{height:height}}>
        {children}
      </div>
  );
}

export default HorizontalScrollView;