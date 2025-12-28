
import styles from './cards.module.css';

const ActionCard = ({ status,title,subtitle,icon,onClick,cardId }) => {
  return (
    <div className={`${styles.card} ${styles.card_action}`} onClick={(e) => onClick(e,cardId)}>
       {/* <div className={styles.card_action_arrow}></div> */}
       <div className={styles.card_action_text}>
        <div className={styles.card_action_title}>{title}</div>
        <div className={styles.card_action_subtitle}>{subtitle}</div>
       </div>
       <div className={`${styles.card_action_icon} ${status ? styles.valid : ""}`}>{icon}</div>
    </div>
  );
}

export default ActionCard;