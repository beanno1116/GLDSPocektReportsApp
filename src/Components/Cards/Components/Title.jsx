
import styles from '../cards.module.css';

const Title = ({ children }) => {
  return (
    <label className={styles.title}>{children}</label>
  );
}

export default Title;