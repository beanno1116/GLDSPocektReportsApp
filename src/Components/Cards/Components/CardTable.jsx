
import styles from '../cards.module.css';

const CardTable = ({ children }) => {
  return (
    <>
      <div className={styles.card_toolbar}>
        <span>XSS</span>
      </div>
      <div className={styles.card_table_content}>
        {children}
      </div>
    </>
  );
}

export default CardTable;