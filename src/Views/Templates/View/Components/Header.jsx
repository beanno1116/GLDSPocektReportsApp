
import styles from '../view.module.css';

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_title}>
        <span>{title}</span>
        <span className={styles.header_indicator}></span>
      </div>
      <div className={styles.header_date}>Dec 27</div>
    </div>
  );
}

export default Header;