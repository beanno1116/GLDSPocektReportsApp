
import styles from '../cards.module.css';

const CardAccessCodeLabel = ({ code }) => {
  return (
    <div className={styles.card_access_code_value}>
       {code}
    </div>
  );
}

export default CardAccessCodeLabel;