
import AdminUserIcon from '../../../../../assets/icons/AdminUserIcon';
import styles from '../cards.module.css';

const CardListItem = ({ icon,user,onClick }) => {
  return (
    <div className={`${styles.card} ${styles.card_list_item}`}>
       <div className={styles.card_list_item_icon}>{icon}</div>
       <div className={styles.card_list_item_content}>
        <div className={styles.card_list_item_title}>{user.username}</div>
        <div className={styles.card_list_item_subtitle}>{user.email}</div>
       </div>
    </div>
  );
}

export default CardListItem;