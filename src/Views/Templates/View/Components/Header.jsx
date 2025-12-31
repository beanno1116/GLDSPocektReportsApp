
import styles from '../view.module.css';

const Header = ({ title,showDate=false }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_title}>
        <span>{title}</span>
        <span className={styles.header_indicator}></span>
      </div>
      {showDate && (
        <div className={styles.header_date}>
          Dec 27
        </div>
      )}
    </div>
  );
}

export default Header;